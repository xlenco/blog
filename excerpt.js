const fs = require('fs');
const path = require('path');
const OpenAI = require("openai");

const client = new OpenAI({
    apiKey: "sk-HCBoboDSz85MoOhWjztWX5fQ7AF1BlB2Ihqs5vg67VmVE2xw",    
    baseURL: "https://api.moonshot.cn/v1",
});

const postsDir = path.join(__dirname, 'source/_posts');
const batchSize = 1; // 每次处理的文件数量，减少并发请求
const initialRetryDelay = 10000; // 初始重试间隔（毫秒），增加等待时间
const maxRetries = 10; // 最大重试次数，增加重试次数
const timeout = 300000; // 5分钟超时时间（毫秒）

async function generateSummary(fileContent, retryCount = 0) {
    if (retryCount >= maxRetries) {
        throw new Error("达到最大重试次数，无法生成摘要");
    }

    try {
        const completion = await client.chat.completions.create({
            model: "moonshot-v1-8k",         
            messages: [
                { 
                    role: "system", 
                    content: "你是一个摘要生成工具，你需要解释我发送给你的内容，不要换行，尽量简洁些，不要超过200字，只需要介绍文章的内容，不需要提出建议和缺少的东西。请用中文回答，输出的内容开头为这篇文章介绍了"
                },
                { 
                    role: "user", 
                    content: `请生成以下文本的摘要：${fileContent}`
                }
            ],
            temperature: 0.3
        }, { timeout });

        return completion.choices[0].message.content;
    } catch (error) {
        if (error.status === 429) {
            console.warn(`速率限制错误，重试次数: ${retryCount + 1}`);
            const retryAfter = error.headers['msh-cooldown-seconds'] ? error.headers['msh-cooldown-seconds'] * 1000 : initialRetryDelay;
            await new Promise(resolve => setTimeout(resolve, retryAfter)); // 等待retryAfter毫秒后重试
            return generateSummary(fileContent, retryCount + 1);
        } else if (error.status === 504) {
            console.warn(`请求超时错误，重试次数: ${retryCount + 1}`);
            await new Promise(resolve => setTimeout(resolve, initialRetryDelay)); // 等待initialRetryDelay毫秒后重试
            return generateSummary(fileContent, retryCount + 1);
        } else {
            throw error;
        }
    }
}

async function processFiles() {
    try {
        const files = fs.readdirSync(postsDir).filter(file => path.extname(file) === '.md');

        for (let i = 0; i < files.length; i += batchSize) {
            const batchFiles = files.slice(i, i + batchSize);
            await Promise.all(batchFiles.map(async file => {
                const filePath = path.join(postsDir, file);
                const fileContent = fs.readFileSync(filePath, 'utf8');

                // 提取 front-matter 和正文内容
                const frontMatterRegex = /^---\n([\s\S]*?)\n---\n/;
                const match = fileContent.match(frontMatterRegex);
                let frontMatter = match ? match[1] : '';
                let content = match ? fileContent.replace(frontMatterRegex, '') : fileContent;

                if (!match) {
                    // 如果没有 front-matter，添加默认的 front-matter
                    frontMatter = `title: ${path.basename(file, '.md')}\ndate: ${new Date().toISOString()}`;
                    content = fileContent;
                } else if (frontMatter.includes('description:')) {
                    // 如果 front-matter 中已经包含 description，跳过该文件
                    console.log(`文件 ${filePath} 已经包含 description，跳过处理`);
                    return;
                }

                // 生成摘要
                const summary = await generateSummary(content);

                // 更新 front-matter
                frontMatter += `\ndescription: "${summary}"\n`;

                // 写回文件
                const updatedFileContent = `---\n${frontMatter}---\n${content}`;
                fs.writeFileSync(filePath, updatedFileContent, 'utf8');

                console.log(`已更新文件: ${filePath}`);
            }));

            // 等待一段时间再处理下一批文件
            await new Promise(resolve => setTimeout(resolve, initialRetryDelay));
        }
    } catch (error) {
        console.error("发生错误:", error);
    }
}

processFiles();

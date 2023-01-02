//安装进程
// 在sw中可以使用this或是self表示自身
self.addEventListener('install', async () => {
    console.log('[SW] 注册成功!');
    console.log('[SW] 跳过等待!');
    // 跳过等待
    // skipWaiting 停止当前的service work 运行最新的serviceworker
    // waitUntil skipWaiting返回的是promise 等primise执行完后 在进行下一个生命周期函数
    await self.skipWaiting();
});

self.addEventListener('activate', async () => {
    // console.log('[SW] 跳过等待!')
    // await self.skipWaiting();
    console.log('[SW] 激活成功!')
    // 立即管理页面
    await self.clients.claim();
    console.log('[SW] 立即管理请求!')
});


// 捕获请求
self.addEventListener('fetch', async (event) => {
    const replaceRequestevent = replaceRequest(event.request)

    // const request = handleRequest(event.request);
    const request = handleRequest(replaceRequestevent);
    // 如果有返回，就返回请求
    // 如果没有返回就什么也不做
    if (request) {
        event.respondWith(request);
    };
});


function replaceRequest(req) {
    const urlStr = req.url;
    // 劫持请求
    if (configs['redirect']) {
        for (let redirect of configs['redirect']) {
            if (redirect['rule'].test(urlStr)) {
                const replaceurl = urlStr.replace(redirect['rule'], redirect['repalce'])
                console.debug(`[SW] 请求 ${urlStr} 匹配到劫持规则！ URL被替换成 ${replaceurl}`)
                return new Request(replaceurl)
            }
        };
    };
    // 如果不符合就透传数据
    return req
};


// 返回响应
async function progress(res) {
    return new Response(await res.arrayBuffer(), {
        status: res.status,
        headers: res.headers
    })
}


// 处理请求
function handleRequest(req) {
    // 请求url的数组
    const urls = [];
    const urlStr = req.url;
    // let urlObj = new URL(urlStr)

    // 匹配请求
    if (configs['cdn']) {
        for (let cdn of configs['cdn']) {
            // 正则匹配url
            if (cdn['rule'].test(urlStr)) {
                let rule_search = cdn['search'] || cdn['rule']; // 当search字段不存在时设置默认值
                if (rule_search == '_') {
                    // 当为语法糖时重新赋值为rule
                    rule_search = cdn['rule'];
                };
                // 遍历替换
                for (let search_replace of cdn['replace']) {
                    let push_url_str
                    if (search_replace == '_') {
                        // 当为语法糖时重新赋值
                        push_url_str = urlStr;
                    } else {
                        push_url_str = urlStr.replace(rule_search, search_replace)
                    };
                    urls.push(push_url_str);
                };
            };
        };
    } else {
        console.warn('[SW] 警告: 配置未包含cdn配置项!');
    };

    // 如果上方 cdn 遍历 匹配到 cdn 则直接统一发送请求(不会往下执行了)
    if (urls.length) return fetchAny(urls)

    console.debug(`[SW] 请求 ${urlStr} 没有匹配到任何规则，跳过此次请求。`);

    // 让sw不拦截请求, 有没有无所谓。
    return null;
};


// 发送所有请求
function fetchAny(urls) {
    // 中断一个或多个请求
    // 其实是获取当前方法发起的fetch请求
    // 然后在下文打断
    const controller = new AbortController()
    const signal = controller.signal

    // 遍历将所有的请求地址转换为promise
    const PromiseAll = urls.map((url) => {
        // Promise的构造函数接收两个参数：resolve和reject（可以省略）。
        // 其中resolve是用来标记代码执行成功的，用法为resolve(args)，
        // 传进去的参数我们后面再说。相反，reject就是用来标记代码执行错误，用法为reject(args)。
        return new Promise((resolve, reject) => {
            fetch(url, { signal })
                // 返回响应
                .then(progress)
                // 检查请求是否成功
                .then((res) => {
                    // 克隆请求
                    const r = res.clone()
                    if (r.status !== 200) reject(null)
                    controller.abort() // 中断
                    // 返回请求
                    resolve(r)
                })
                .catch(() => reject(null));
        })
    })

    // 判断浏览器是否支持 Promise.any
    // 如果不支持就执行上面的方法
    // if (!Promise.any) createPromiseAny()

    // 谁先返回"成功状态"则返回谁的内容，如果都返回"失败状态"则返回null
    return Promise.any(PromiseAll)
        .then((res) => res)
        .catch(() => null);
};

function fetchOne(url){
    return fetch(url)
        .then(progress)
        .then((res) => {
            // 克隆请求
            const r = res.clone()
            // 检查请求是否成功
            if (r.status !== 200) return null
            // 返回请求
            return r
        })
}

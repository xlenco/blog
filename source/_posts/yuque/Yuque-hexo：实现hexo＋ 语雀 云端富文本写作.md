---
title: Yuque-hexo：实现hexo＋ 语雀 云端富文本写作
categories:
  - [教程]
  - [转载]

tags:
  - Hexo

cover: https://xlenco.onmicrosoft.cn/img/8840187_u6Y8xVR1j.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1661609019485
updated: 2022-10-24 10:29
date: 2022-9-9 22:01
---

## 前言

本文转载自冰老师的[教程：hexo× 语雀 实现云端富文本写作](https://zfe.space/post/554e.html)，对其有所修改和补充。

## 什么是语雀？

> 「语雀」是一个「专业的云端知识库」，孵化自 [蚂蚁金服](https://www.antfin.com/?deer_tracert_token=cc478126-c93a-459b-a448-dd41de67f2d4) ，是 [体验科技](https://www.yuque.com/yubo/explore/tcaywl?deer_tracert_token=cc478126-c93a-459b-a448-dd41de67f2d4) 理念下的一款创新产品，已是 10 万阿里员工进行文档编写、知识沉淀的标配。
> 语雀诞生伊始，只是希望能给工程师提供一个好用的工具用来写技术文档，达成「用 Markdown 写文档」这个小目标。但在产品研发的过程中，我们发现其实身边的每个人、每个团队、每个组织都有很多知识，但一直以来缺少一个好用的工具让这些知识不只是留在每个人的大脑或电脑里，还可以被记录、分享和交流。
> 所以，带着这颗初心，我们觉得语雀不应止步于服务工程师，应该致力于为每个想表达所思所想的人提供一款顺手的工具，让知识能得以记录和传播，让人们可以在「语雀」中平等快乐地创作和交流知识，让再小的个体也可以拥有自己的知识库。

## 使用 hexo× 语雀的初衷？

通过本教程，你可以将你的文章储存在云端，实现云端写作（不限于 MAC 系统、Windows 系统），摆脱本地机器的限制。除此之外，优秀简约的富文本编辑器能极大提升你的写作效率，使你能更专注于文本的写作。通过结合 github action（github 自动部署）、serverless 云函数（腾讯云 API，用于部署事件的触发）、语雀（文档的发布）、Hexo（博客系统）自动实现文章发布到博客展现的流程。

## 使用前的准备？

为了更好、更方便的完成 hexo× 语雀的部署。在开始流程搭建的操作前，你需要完成以下步骤。

### 账号的申请与授权

- 语雀账号[申请](https://www.yuque.com/login)
- Hexo 源码在 Github 上，否则无法进行自动部署
- Vercel 账号一枚，并成功绑定域名
- 获取 github 私钥，前往 [github 的 token 设置](https://github.com/settings/tokens)（  [https://github.com/settings/tokens](https://github.com/settings/tokens)），点击生成密钥按钮，填写密钥名称，勾选 repo 选项。将生成的密钥保存在桌面新建的 txt 文件里备用。

### 仓库的准备

如果你已经配置了 github action 你可以忽略这一步。
为了实现 hexo 的自动部署，需要将本地的源码文件交与 github 托管，你可以创建私有仓库（建议）也可以创建共有仓库。

## 步骤一：hexo 博客文章的迁移

### 仓库的创建

登陆[语雀](https://www.yuque.com/)，点击知识库 👉 新建知识库。将知识库的可见范围改为 “互联网可见”。

![image.png](https://cdn.nlark.com/yuque/0/2020/png/8391485/1608131882653-69d7b88a-caa9-45ff-a7ca-419647791d22.png#align=left&display=inline&height=789&margin=%5Bobject%20Object%5D&name=image.png&originHeight=789&originWidth=1279&size=102336&status=done&style=none&width=1279#crop=0&crop=0&crop=1&crop=1&id=kIrdR&originHeight=789&originWidth=1279&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

### 文章的导入

点击知识库的管理按钮，选择新建下的导入，将博客中\_post 文章进行批量导入。

![image.png](https://cdn.nlark.com/yuque/0/2020/png/8391485/1608132157680-32f96698-74a3-45b3-81e6-215ba0115fab.png#align=left&display=inline&height=789&margin=%5Bobject%20Object%5D&name=image.png&originHeight=789&originWidth=1279&size=155092&status=done&style=none&width=1279#crop=0&crop=0&crop=1&crop=1&id=qvSXv&originHeight=789&originWidth=1279&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

### 模板的创建

为了方便以后文档的撰写，可以新建模板。注意图片链接需要加上’’防止被渲染成链接。

![image.png](https://cdn.nlark.com/yuque/0/2020/png/8391485/1608132265373-09c816b7-bbf8-4a6f-9ea0-012060269c8b.png#align=left&display=inline&height=789&margin=%5Bobject%20Object%5D&name=image.png&originHeight=789&originWidth=1279&size=127438&status=done&style=none&width=1279#crop=0&crop=0&crop=1&crop=1&id=u5cu0&originHeight=789&originWidth=1279&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

如果你使用了 abbrlink，请手动填写 abbrlink。

```markdown
---
title:
author:
tags:
categories:
cover:
top_img:
abbrlink:
date:
---
```

建议在语雀中新建个模板，发以上内容复制并保存，以后写文章时可以直接调用，能够方便不少。

## 步骤二：安装语雀插件进行本地调试

为了确保在云端能够正常生成博客，需要首先在本地进行调试。

### 语雀插件的安装

首先在根目录打开终端安装 yuque-hexo。

```powershell
npm i -g yuque-hexo
```

### 修改 package.json

在第一个对象代码块后增加”yuqueConfig” 代码块。

```json
{
  "name": "hexo-site",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "build": "hexo generate",
    "clean": "hexo clean",
    "deploy": "hexo deploy",
    "server": "hexo server"
},
  "yuqueConfig": {
    "postPath": "source/_posts",
    "cachePath": "yuque.json",
    "mdNameFormat": "slug",
    "adapter": "markdown",
    "concurrency": 5,
    "baseUrl": "https://www.yuque.com/api/v2",
    "login": "bingkanuo",
    "repo": "sffipz",
    "token": "***********************",
    "onlyPublished": true,
    "onlyPublic": true
  },
```

其中需要修改”login”、”repo”、”token” 字段。

- 点击进入博客的知识库，在浏览器地址栏中将用户名和仓库名复制分别粘贴为”login”、”repo” 的字段。

![image.png](https://cdn.nlark.com/yuque/0/2020/png/8391485/1608133592273-04a6a15f-6c75-44d0-ab1c-7ca737c42d07.png#align=left&display=inline&height=251&margin=%5Bobject%20Object%5D&name=image.png&originHeight=251&originWidth=598&size=23393&status=done&style=none&width=598#crop=0&crop=0&crop=1&crop=1&id=M8WUe&originHeight=251&originWidth=598&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

- token 是在右上角头像 -> 账户设置 -> Token 添加的，权限的话只给读取就可以。复制粘贴获取的”token” 字段。

![image.png](https://cdn.nlark.com/yuque/0/2020/png/8391485/1608133711645-569d4bb4-3de1-450b-80b6-5cf1ca7060b0.png#align=left&display=inline&height=789&margin=%5Bobject%20Object%5D&name=image.png&originHeight=789&originWidth=1279&size=176577&status=done&style=none&width=1279#crop=0&crop=0&crop=1&crop=1&id=NGw6W&originHeight=789&originWidth=1279&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

修改  “scripts” 增加”sync”: “yuque-hexo sync” 和  “clean:yuque”: “yuque-hexo clean”。

```json
{
  "name": "hexo-site",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "build": "hexo generate",
    "clean": "hexo clean",
    "deploy": "hexo deploy",
    "server": "hexo server",
    "sync": "yuque-hexo sync",
    "clean:yuque": "yuque-hexo clean"
  },
  "yuqueConfig": {
    "postPath": "source/_posts",
    "cachePath": "yuque.json",
    "mdNameFormat": "slug",
    "adapter": "markdown",
    "concurrency": 5,
    "baseUrl": "https://www.yuque.com/api/v2",
    "login": "bingkanuo",
    "repo": "sffipz",
    "token": "***********************",
    "onlyPublished": true,
    "onlyPublic": true
  },
  "hexo": {
    "version": "5.2.0"
  },
```

### 进行本地调试

添加完成后保存，在执行命令前，请先备份自己的\_post 文件夹，因为语雀的下载操作会覆盖原有的\_post 文件夹。
在终端中输入‘yuque-hexo sync’就会把语雀的文章给下载下来。
然后通过‘hexo g&hexo s’进行调试。
ps：输入‘yuque-hexo clean’就会清除\_post 下的所有文章。
如果存在外挂标签，请确保外挂标签格式的书写规范，否则容易报错。

---

## 步骤三：配置 github action

### 语雀防盗链解决方法

空 referrer 即可
在 head 引入以下内容

```
- <meta name="referrer" content="no-referrer">
```

{% hideToggle 老方法%}

#### 修改 hexo 主题文件中的 meta

以 butterfly 主题为例，
打开主题文件的 /themes/butterfly/layout/includes/head.pug。
在 meta (name=”theme-color” content=themeColor) 后方添加 meta (name=”referrer” content=”no-referrer”)。
该步骤是确保语雀中的图片可以正常加载。

```
meta(name="theme-color" content=themeColor)
meta(name="referrer" content="no-referrer")
```

{% endhideToggle %}

### 创建 github action 脚本

在博客根目录下新建.github 文件夹（点不要漏掉了），在该文件夹下新建 workflows 文件夹。

![image.png](https://cdn.nlark.com/yuque/0/2020/png/8391485/1608135890427-0dc37d9e-8eed-4581-8570-e806b5e4fa1a.png#align=left&display=inline&height=65&margin=%5Bobject%20Object%5D&name=image.png&originHeight=65&originWidth=349&size=4021&status=done&style=none&width=349#crop=0&crop=0&crop=1&crop=1&id=v0z8d&originHeight=65&originWidth=349&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

在 workflows 文件夹下新建 autodeploy.yml。并填入以下代码。
将**【更新 语雀拉取缓存及文章】** 与**【部署】**  user.name 和 user.email 后面的 “” 信息修改为自己的信息，注意对齐。

> 由于冰老师的 workflows 的判定方式为任何修改都可以触发，可有时会因为没有更改文章内容而触发 action 导致没有拉去到任何内容而报错，这里我重构了一下判断方式

![Screenshot_20220924_233608.jpg](https://cdn.nlark.com/yuque/0/2022/jpeg/22578074/1664033876947-c0a1c08c-9178-435a-821a-e2b76edaae93.jpeg#clientId=u23c2e94e-4b01-4&crop=0&crop=0&crop=1&crop=1&errorMessage=unknown%20error&from=ui&id=u862bb93a&name=Screenshot_20220924_233608.jpg&originHeight=1180&originWidth=1080&originalType=binary&ratio=1&rotation=0&showTitle=false&size=128329&status=error&style=none&taskId=u16adc1c3-0317-4231-86d4-671478425a9&title=)
使用新方法前提是已经部署好 Github action 自动部署

<a href="https://xlenco.eu.org/posts/77e3.html" target="cardlink">点击查看本站教程</a>

```
# 自动化名称
name: Deploy Yuque-Hexo Public To Pages

# 当有语雀推送时触发action
on:
  repository_dispatch:
  workflow_dispatch:
  push:
    branches: main
    paths:
      -'source/_posts/*'  # 只会在_posts更改时触发

# 设置环境
jobs:
  build:
    runs-on: ubuntu-latest
    env:
      TZ: Asia/Shanghai
      YUQUE_TOKEN: ${{ secrets.YUQUE_TOKEN }}

    steps:
      # check it to your workflow can access it
      # from: https://github.com/actions/checkout
      - name: Checkout Repository master branch
        uses: actions/checkout@master

      # from: https://github.com/actions/setup-node
      - name: Setup Node.js 16.x
        uses: actions/setup-node@master
        with:
          node-version: "16.x"

      - name: 安装Hexo
        run: |
          npm install hexo-cli -g
         # npm install gulp-cli -g
          npm install yuque-hexo -g
          yuque-hexo clean
          yuque-hexo sync


      - name: 设置Git信息
        run: |
          git config --global user.name 'xlenco'
          git config --global user.email '1043865083@qq.com'

      - name: 更新 语雀拉取缓存及文章 #更新yuque 拉取的文章到GitHub仓库
        run: |
          echo `date +"%Y-%m-%d %H:%M:%S"` begin > time.log
          git config --global user.email "1043865083@qq.com"
          git config --global user.name "xlenco"
          git add .
          git commit -m "Refresh yuque json" -a
      - name: 推送 语雀拉取缓存及文章 #推送修改后的yuque json
        uses: ad-m/github-push-action@master
        with:
          github_token: ${{ secrets.GITHUBTOKEN }}

      - name: 缓存 Hexo
        uses: actions/cache@v3
        id: cache
        with:
          path: node_modules
          key: ${{runner.OS}}-${{hashFiles('**/package-lock.json')}}
```

{% hideToggle 老方法%}

```yaml
name: 自动部署

# 当有改动推送和语雀发布时，启动Action
on: [push, repository_dispatch]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: 检查分支
        uses: actions/checkout@v2
        with:
          ref: master

      #2020年10月后github新建仓库默认分支改为main，注意更改
      #但私有仓库貌似还是master并没有变

      - name: 安装 Node
        uses: actions/setup-node@v1
        with:
          node-version: "12.x"

      - name: 安装 Hexo
        run: |
          export TZ='Asia/Shanghai'
          npm install hexo-cli -g
          #npm install gulp-cli -g
          #如果你有使用gulp的话，打开上面这一行
          npm install yuque-hexo -g
          yuque-hexo clean
          yuque-hexo sync

      - name: 更新 语雀拉取缓存及文章 #更新yuque 拉取的文章到GitHub仓库
        run: |
          echo `date +"%Y-%m-%d %H:%M:%S"` begin > time.log
          git config --global user.email "499984532@qq.com"
          git config --global user.name "Zfour"
          git add .
          git commit -m "Refresh yuque json" -a

      - name: 推送 语雀拉取缓存及文章 #推送修改后的yuque json
        uses: ad-m/github-push-action@master
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}

      - name: 缓存 Hexo
        uses: actions/cache@v1
        id: cache
        with:
          path: node_modules
          key: ${{runner.OS}}-${{hashFiles('**/package-lock.json')}}

      - name: 安装依赖
        if: steps.cache.outputs.cache-hit != 'true'
        run: |
          npm install --save

      - name: 生成静态文件
        run: |
          hexo clean
          hexo g
          #gulp
          #如果你有使用gulp的话，打开上面这一行

      - name: 部署
        run: |
          git config --global user.name "Zfour"
          git config --global user.email "499984532@qq.com"
          hexo deploy
```

{% endhideToggle %}

### 上传博客源码

打开终端输入以下命令，上传你的博客源码到私有源码仓库。

```powershell
git init
git add .
git commit -m "first commit"
git remote add origin https://github.com/你的用户名/你的私有博客源码仓库名.git
git push -u origin master
```

### 进行云端调试

上传后你会发现 github action 生效。等待几分钟后，如果打勾，就说明部署成功。如果未打勾请检查出错的步骤。

![IMG_20221024_103507.png](https://cdn.nlark.com/yuque/0/2022/png/22578074/1666578950937-094ff8e3-bc90-4020-8939-d128e5ec00d0.png#clientId=u8fd55d1e-1ea9-4&crop=0&crop=0&crop=1&crop=1&from=ui&id=u9cf82fde&name=IMG_20221024_103507.png&originHeight=373&originWidth=1247&originalType=binary&ratio=1&rotation=0&showTitle=false&size=73552&status=done&style=none&taskId=u87fe57a4-733e-4622-92ce-ccfbd7c70d9&title=)

---

> time.log 文件最近似乎不会自动生成，所有如果 action 不成功，请手动在仓库里新建 time.log

## 步骤四：配置云函数

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fwalinejs%2Fwaline%2Ftree%2Fmain%2Fexample)

为了方便大家调用，冰老师用 python 写了一个 api。
更换为你的 app 应用链接。
你需要传递的参数有 token，user，source。

```
https://yuque-vercel-webhook-api.vercel.app/api?
token='{填写你的github私钥}'&
user='{填写你的github用户名}'&
source='{填写你的github仓库地址}'

示例：
https://yuque-vercel-webhook-api.vercel.app/api?token='8888888888'&user='Zfour'&source='my-blog-source-file'
将这个URL路径作为触发链接，在语雀中进行配置。
```

修改触发链接里的参数项，访问这个链接，如果出现‘This’s OK!’说明配置成功。
复制 URL 路径作为触发链接，在语雀中进行配置。如果你不想部署可以用博主部署好的
https://yuque.xlenco.eu.org

> 按照上方配置一下就可以用了

## 步骤五：配置语雀的 webhook

### 设定触发规则

在知识库中选择设置。
![Screenshot_20220924_232506.jpg](https://cdn.nlark.com/yuque/0/2022/jpeg/22578074/1664033119560-4d875c3e-d13f-49cc-ad88-53e3cca4a081.jpeg#clientId=ubd0b29db-a8e1-4&crop=0&crop=0&crop=1&crop=1&errorMessage=unknown%20error&from=ui&id=u2f7e5e8c&name=Screenshot_20220924_232506.jpg&originHeight=1099&originWidth=1080&originalType=binary&ratio=1&rotation=0&showTitle=false&size=108673&status=error&style=none&taskId=u03f02684-d952-42fe-b15d-c5f621a5cd6&title=)
设定触发规则。粘贴在云函数处获取的访问路径（URL 链接）。

设置完毕后，你可以尝试发布一篇文章进行测试。如果 github action 执行则说明配置成功。

---

## 后记

有问题请在下方评论。

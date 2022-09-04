---
categories:
  - 教程

cover: "https://ik.imagekit.io/nicexl/img/7bf185e5.png"
date: "2022-08-25 22:01:13"
tags:
  - Hexo

title: 利用Github Actions自动化部署你Hexo博客
abbrlink: "77e3"
---

### Github Actions 概念

GitHub Actions 是一个持续集成和持续交付 (CI/CD) 平台，可用于自动执行构建、测试和部署管道。 您可以创建工作流程来构建和测试存储库的每个拉取请求，或将合并的拉取请求部署到生产环境。

GitHub Actions 不仅仅是 DevOps，还允许您在存储库中发生其他事件时运行工作流程。 例如，您可以运行工作流程，以便在有人在您的存储库中创建新问题时自动添加相应的标签。

GitHub 提供 Linux、Windows 和 macOS 虚拟机来运行工作流程，或者您可以在自己的数据中心或云基础架构中托管自己的自托管运行器。

### 正文

Git 推送到 Github 库的常用连接方案是 HTTPS 和 SSH 这两种连接方式。

所以 Actions 自动化也大致分为两种。这里主要讲 HTTPS 连接部署方式

##### HTTPS 连接部署方式

部署简单适合小白。缺点:有时候可能遇到不知名 bug。

1. 获取 Github access tokens
   打开https://github.com/settings/tokens
   点击 Generate new token 新建个 token
   ![](https://ik.imagekit.io/xlenco/img/VeryCapture_20220826175258.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1661507667397#crop=0&crop=0&crop=1&crop=1&id=L2uNP&originHeight=350&originWidth=1351&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

![](https://ik.imagekit.io/xlenco/img/VeryCapture_20220826175258.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1661507667397#crop=0&crop=0&crop=1&crop=1&id=w5T9Z&originHeight=350&originWidth=1351&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

![](https://ik.imagekit.io/xlenco/img/20200923085908748_yyLI6zVK8.png?ik-sdk-version=javascript-1.4.3&updatedAt=1661508148020#crop=0&crop=0&crop=1&crop=1&id=G0fCF&originHeight=183&originWidth=762&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

### 创建存放 Hexo 源码的私有仓库

创建完成后，需要把博客的源码`push`到这里。首先获取远程仓库地址，同样`SSH`和`HTTPS`均可。`SSH`在绑定过`ssh key`的设备上无需再输入密码，`HTTPS`则需要输入密码，但是`SSH`偶尔会遇到端口占用的情况。

完成上述操作后新建`[Blogroot].github/workflows/autodeploy.yml`

```
(# 当有改动推送到master分支时，启动Action
name: 自动部署

on:
  push:
    branches:
      - main

  release:
    types:
      - published

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - name: 检查分支
      uses: actions/checkout@v2
      with:
        ref: main

    - name: 安装 Node
      uses: actions/setup-node@v1
      with:
        node-version: "16.x"

    - name: 安装 Hexo
      run: |
        export TZ='Asia/Shanghai'
        npm install hexo-cli -g

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
        hexo generate

    - name: 部署 #此处master:master 指从本地的master分支提交到远程仓库的master分支(不是博客的分支写master即可)，若远程仓库没有对应分支则新建一个。如有其他需要，可以根据自己的需求更改。
      run: |
        cd ./public
        git init
        git config --global user.name '${{ secrets.GITHUBUSERNAME }}'
        git config --global user.email '${{ secrets.GITHUBEMAIL }}'
        git add .
        git commit -m "${{ github.event.head_commit.message }} $(date +"%Z %Y-%m-%d %A %H:%M:%S") Updated By Github Actions"
        git push --force --quiet "https://${{ secrets.GITHUBUSERNAME }}:${{ secrets.GITHUBTOKEN }}@github.com/${{ secrets.GITHUBUSERNAME }}/${{ secrets.GITHUBUSERNAME }}.github.io.git" master:master
        git push --force --quiet "https://${{ secrets.TOKENUSER }}:${{ secrets.CODINGTOKEN }}@e.coding.net/${{ secrets.CODINGUSERNAME }}/${{  secrets.CODINGBLOGREPO }}.git" master:master
        git push --force --quiet "https://${{ secrets.GITEEUSERNAME }}:${{ secrets.GITEETOKEN }}@gitee.com/${{ secrets.GITEEUSERNAME }}/${{ secrets.GITEEUSERNAME }}.git" master:master
```

{% tip info %}上方配置包含 gitee 和 coding，请自行删减{% endtip %}

#### 添加环境变量

##### 变量声明

| 变量名         | 常量释义                              |
| -------------- | ------------------------------------- |
| [Blogroot]     | 本地存放博客源码的文件夹路径          |
| GITHUBUSERNAME | Github 用户名                         |
| GITHUBTOKEN    | Github 用户邮箱地址                   |
| TOKENUSER      | 你部署服务的 Secrets/例如 GITHUBTOKEN |
| GITHUBTOKEN    | Github 密钥                           |

在你仓库的`Settings->Secrets->actions`

![](https://ik.imagekit.io/xlenco/img/VeryCapture_20220826182938_Ygv6lo1Va.jpg#crop=0&crop=0&crop=1&crop=1&id=AgjkB&originHeight=651&originWidth=1178&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

### 查看部署情况

此时，打开 GIthub 存放源码的私有仓库，找到 action。

![](https://ik.imagekit.io/xlenco/img/VeryCapture_20220826190814_1aIDQgiua.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1661512231731#crop=0&crop=0&crop=1&crop=1&id=OHER2&originHeight=590&originWidth=1347&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

![](https://ik.imagekit.io/xlenco/img/VeryCapture_20220826190952_SANuIC_aD.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1661512231650#crop=0&crop=0&crop=1&crop=1&id=akJX2&originHeight=629&originWidth=1347&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

根据刚刚的 Commit 记录找到相应的任务,点击 Deploy 查看部署情况 , 若全部打钩，恭喜你，你现在可以享受自动部署的快感了。

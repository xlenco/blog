---
title: Hexo｜博客搭建指南
tags:
  - Hexo
categories:
  - 教程
cover: >-
  https://xlenco.onmicrosoft.cn/img/20200715201402.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1663987678157
date: '2022-8-28 16:12'
updated: '2022-8-28 20:12'
abbrlink: 5b4d
---

## 1. 引言

不知不觉，我的博客已经在风雨飘摇中运行了一段时间了，我觉得有必要详细记录一下博客搭建的过程，以防我不小心搞崩了博客…
![](https://cdn.nlark.com/yuque/0/2022/jpeg/22578074/1661668217875-2be43b6e-0d76-4a33-abb7-4e68d0475e19.jpeg)

## 2. 环境部署

### 2.1 安装 Node.js

1.进入官网选择对应的系统下载：
官网：[https://nodejs.org/en/download/](https://nodejs.org/en/download/)
![](https://cdn.nlark.com/yuque/0/2022/jpeg/22578074/1661668526838-eac22e5d-777a-4749-8a3d-7c07dc278ca7.jpeg?x-oss-process=image%2Fresize%2Cw_750%2Climit_0) 2.安装
选好路径，完成安装 3.检查
打开 cmd 或者 powershell,输入:

```
node -v
npm -v
```

显示版本号，即安装无误
{% note info simple %}npm 为 Node.js 的包管理工具{% endnote %}

### 2.2 安装 Git

1.进入官网下载
官网：[https://git-scm.com/downloads](https://git-scm.com/downloads)

2.安装
选好路径，完成安装

3.配置 Git 环境变量
右键我的电脑 --> 属性，点击高级系统设置，最终在环境变量里添加你的 Git 路径
Git 路径示例

```
C:\Program Files (x86)\Git\bin
```

{% note danger simple %}具体路径以你系统为准{% endnote %}
![](https://pic2.58cdn.com.cn/nowater/webim/big/n_v2a2f670332fd6415993d8368300843d75.webp)

4.检查
打开 git bash 或 cmd，输入：

```
git --version
```

显示版本号，即安装无误
![](https://cdn.nlark.com/yuque/0/2022/jpeg/22578074/1661671536489-a6c14ccb-2420-4009-92ce-e150b722547a.jpeg)

5.在 cmd 中使用 Git
cmd 中输入 sh 即可

6.更换 NPM 镜像源
由于官方默认的 NPM 镜像源在国内速度不是很好，建议换成淘宝的镜像

```
npm config set registry https://registry.npmmirror.com
```

### 2.3 注册 Github 账号

1.Github 官网[https://github.com,](https://github.com,)注册账号 2.新建项目
项目名字为你的昵称.github.io，例如：

```
// 我的昵称是xlenco
所以我的项目名称为xlenco.github.io
```

3.代码库设置
创建好之后，保存'<>code'内的 SSH，即：

```
git@github.com:XXXX/XXXX.github.io.git
```

点击你的仓库右侧的`Settings`
向下找到`Gihub pages`,点击`Launch automatic page generator`，Github 将会自动替你创建出一个 pages 的页面。 如果配置没有问题，大约几分钟之后，`yourname.github.io`这个网址就可以正常访问了

### 2.4 安装 Hexo

1.在合适的位置，如 E:/hexo，安装 hexo-cli,输入：

```
cd /e/hexo/
npm install hexo-cli -g
```

再安装 hexo

```
npm install hexo --save
```

安装完成后，检查

```
hexo -v
```

![](https://cdn.nlark.com/yuque/0/2022/jpeg/22578074/1661671983521-6f81cc7b-8410-4a2b-9399-f6a7e8fbdeb2.jpeg) 2.初始化一个文件夹：

```
hexo init blog // hexo会安装到blog这个文件夹
cd blog
npm install
```

3.生成 Hexo 页面：

```
hexo generate
```

4.启动预览服务：

```
hexo server
```

默认是 localhost:4000，打开浏览器输入即可

### 2.5 推送到 Github

1.配置个人信息

```
git config --global user.name "XXXX"
git config --global user.email "XXXXXXXXX@XXX.com"
```

2.生成密钥

```
ssh-keygen -t rsa -C "XXXXXXXXX@XXX.com"
```

3.查看 id_rsa.pub 文件，并整个复制

```
cat ~/.ssh/id_rsa.pub
```

4.然后再在`Github`中添加`ssh key`
![](https://cdn.nlark.com/yuque/0/2022/jpeg/22578074/1661672964325-47716767-f2fd-46e0-b283-d5631bf40eaf.jpeg?x-oss-process=image%2Fresize%2Cw_750%2Climit_0) 5.修改 hexo 根目录下的文件`_config.yml`中的 deploy，添加之前保存的 ssh：

```
deploy:
   - type: git
     repo: git@github.com:xlenco/xlenco.github.io.git
     branch: main
```

6.上传到 github：

```
hexo d -g
```

如果没有 hexo-deployer-git，安装

```
npm install hexo-deployer-git --save
```

## 3. Hexo 相关

1.新建文章
hexo new post `我的第一篇文章`
2.hexo 自动生成一个 md 文件，修改 md 内容
头部如：

```
---
title: postName # 文章页面上的显示名称
date: 2022-08-28 12:30:16 # 文章生成时间，一般不改，当然也可以任意修改
categories: 默认分类 #分类
tags: [tag1,tag2,tag3] # 文章标签，可空，多标签请用格式，注意冒号:后面有个空格
description: 摘要
---
```

3.在头部下面即可写文章内容
{% note info simple %}markdown，支持 html 和其自带的语法。Markdown 是一种可以使用普通文本编辑器编写的标记语言，通过简单的标记语法，它可以使普通文本内容具有一定的格式。{% endnote %}

### 3.2 新建页面

hexo new page "update"
会在 source 文件夹中生成 update 文件夹，其内的 index.md 为页面内容

### 3.3 常用基本命令

```
hexo new "文章"
hexo new post "文章"
hexo new page "页面"

hexo cl # 清除缓存
hexo clean # 清除缓存，每次重新部署时最好执行
hexo g # 生成静态页面
hexo generate # 生成静态页面
hexo s # 本地端口预览 默认4000运行
hexo server # 本地端口预览
hexo s -p 5000 # 端口5000
hexo d #部署
hexo deploy #部署
```

为了方便每次推送可用输入以下内容

```
hexo cl && hexo g && hexo d
```

## 4. Hexo 进阶

### 4.1 推荐编辑器

方便后续写文章和魔改内容
VSCode [https://code.visualstudio.com/](https://code.visualstudio.com/)
Typora [https://www.typora.io/](https://www.typora.io/)
Qexo [https://github.com/Qexo/Qexo](https://github.com/Qexo/Qexo)
Wexagonal [https://wexa.top/](https://wexa.top/)

### 4.2 更换主题

1.因为自带的主题并不好看，所以可以更换主题，常见主题的很多，例如 butterfly，next...

```
cd /e/hexo/blog
git clone -b master https://github.com/jerryc127/hexo-theme-butterfly.git themes/butterfly
```

2.修改 hexo 根目录下的\_config.yml 中的 theme: landscape 改成 theme： butterfly ,(注意冒号：后面有一个空格)

## 5. 主题魔改

### 5.1 胶囊 💊 样式顶部进度条

[为你的 Butterfly 添加顶部加载进度条 | Xlenco](https://xlenco.eu.org/posts/769f.html)

### 5.2 自定义右键菜单

[Butterfly 美化魔改：自定义右键菜单 | Xlenco](https://xlenco.eu.org/posts/8d1e.html)

---
title: Hexo｜博客搭建指南
date: '2022-8-28 16:12'
updated: '2022-8-28 20:12'
cover: 'https://xlenco.onmicrosoft.cn/img/20200715201402.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1663987678157'
tags:
  - Hexo
categories:
  - 教程
abbrlink: 5b4d
---
## 1. 引言

不知不觉，我的博客已经在风雨飘摇中运行了一段时间了，我觉得有必要详细记录一下博客搭建的过程，以防我不小心搞崩了博客…
![](https://cdn.nlark.com/yuque/0/2024/jpeg/22578074/1707979064140-b86823d1-2852-4aec-bf05-9b5fe36c7338.jpeg#averageHue=%237e7e7a&from=url&id=MTjQ4&originHeight=240&originWidth=240&originalType=binary&ratio=1.25&rotation=0&showTitle=false&status=done&style=none&title=)



## 2. 环境部署

### 2.1 安装Node.js

1.进入官网选择对应的系统下载：
官网：[https://nodejs.org/en/download/](https://nodejs.org/en/download/)

![](https://cdn.nlark.com/yuque/0/2024/jpeg/22578074/1708047462445-c074f47c-d958-41b9-a551-fbb93fd3ffdb.jpeg#averageHue=%23c8c8c7&clientId=u7d38b809-d249-4&id=qssUu&originHeight=653&originWidth=1348&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u89665cc5-0f09-417a-ab79-6ab6cbbcf3c&title=)
2.安装
选好路径，完成安装
3.检查
打开cmd或者powershell,输入:

```
node -v
npm -v
```

显示版本号，即安装无误
{% note info simple %}npm为Node.js的包管理工具{% endnote %}

### 2.2 安装Git

1.进入官网下载
官网：[https://git-scm.com/downloads](https://git-scm.com/downloads)

2.安装
选好路径，完成安装

3.配置Git环境变量
右键我的电脑 --> 属性，点击高级系统设置，最终在环境变量里添加你的Git路径
Git路径示例

```
C:\Program Files (x86)\Git\bin
```

{% note danger simple %}具体路径以你系统为准{% endnote %}
![](https://cdn.nlark.com/yuque/0/2024/png/22578074/1708047494406-8a2f93be-b230-4ccf-b248-e3f39af36a7a.png#averageHue=%23f8f6f6&clientId=u7d38b809-d249-4&id=O89h2&originHeight=1040&originWidth=1920&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u0f728e25-b399-4c34-a30d-14eb748e0ee&title=)

4.检查
打开git bash或cmd，输入：

```
git --version
```

显示版本号，即安装无误
![](https://www.yuque.com/api/filetransfer/images?url=https%3A%2F%2Fpic1.xlenco.top%2Fi%2F1661671536489-a6c14ccb-2420-4009-92ce-e150b722547a.jpeg&sign=a79fb1388ed4edf0fb797063b79871d7c7aee0e478fba2cc1c1dbab1e796abc6#from=url&id=TvylP&originHeight=37&originWidth=234&originalType=binary&ratio=1.25&rotation=0&showTitle=false&status=done&style=none&title=)

5.在cmd中使用Git
cmd中输入sh即可

6.更换NPM镜像源
由于官方默认的NPM镜像源在国内速度不是很好，建议换成淘宝的镜像

```
npm config set registry https://registry.npmmirror.com
```

### 2.3 注册Github账号

1.Github官网[https://github.com,](https://github.com,)注册账号
2.新建项目
项目名字为你的昵称.github.io，例如：

```
// 我的昵称是xlenco
所以我的项目名称为xlenco.github.io
```

3.代码库设置
创建好之后，保存'<>code'内的SSH，即：

```
git@github.com:XXXX/XXXX.github.io.git
```

点击你的仓库右侧的`Settings`
向下找到`Gihub pages`,点击`Launch automatic page generator`，Github将会自动替你创建出一个pages的页面。 如果配置没有问题，大约几分钟之后，`yourname.github.io`这个网址就可以正常访问了

### 2.4 安装Hexo

1.在合适的位置，如E:/hexo，安装hexo-cli,输入：

```
cd /e/hexo/
npm install hexo-cli -g
```

再安装hexo

```
npm install hexo --save
```

安装完成后，检查

```
hexo -v
```

![](https://cdn.nlark.com/yuque/0/2024/jpeg/22578074/1708047582726-136ed7d4-a172-464a-8862-d495d414c886.jpeg#averageHue=%23070707&clientId=u7d38b809-d249-4&id=T2sYl&originHeight=325&originWidth=390&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u7a756381-200f-4443-af05-cdfb464e25f&title=)
2.初始化一个文件夹：

```
hexo init blog // hexo会安装到blog这个文件夹
cd blog
npm install
```

3.生成Hexo页面：

```
hexo generate
```

4.启动预览服务：

```
hexo server
```

默认是localhost:4000，打开浏览器输入即可

### 2.5 推送到Github

1.配置个人信息

```
git config --global user.name "XXXX"
git config --global user.email "XXXXXXXXX@XXX.com"
```

2.生成密钥

```
ssh-keygen -t rsa -C "XXXXXXXXX@XXX.com"
```

3.查看id_rsa.pub文件，并整个复制

```
cat ~/.ssh/id_rsa.pub
```

4.然后再在`Github`中添加`ssh key`![](https://cdn.nlark.com/yuque/0/2024/jpeg/22578074/1708047589937-4a56438e-9941-42cf-8c99-8bbbaaab2f56.jpeg#averageHue=%23fdfcfc&clientId=u7d38b809-d249-4&id=Si5dn&originHeight=659&originWidth=1347&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ue8cfa6e7-0efc-4960-84d6-57c640e12bf&title=)
5.修改hexo根目录下的文件`_config.yml`中的deploy，添加之前保存的ssh：

```
deploy:
   - type: git
     repo: git@github.com:xlenco/xlenco.github.io.git
     branch: main
```

6.上传到github：

```
hexo d -g
```

如果没有hexo-deployer-git，安装

```
npm install hexo-deployer-git --save
```

## 3. Hexo相关

1.新建文章
hexo new post `我的第一篇文章`
2.hexo自动生成一个md文件，修改md内容
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
{% note info simple %}markdown，支持html和其自带的语法。Markdown是一种可以使用普通文本编辑器编写的标记语言，通过简单的标记语法，它可以使普通文本内容具有一定的格式。{% endnote %}

### 3.2 新建页面

hexo new page "update"
会在source文件夹中生成update文件夹，其内的index.md为页面内容

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

## 4. Hexo进阶

### 4.1 推荐编辑器

方便后续写文章和魔改内容
VSCode [https://code.visualstudio.com/](https://code.visualstudio.com/)
Typora [https://www.typora.io/](https://www.typora.io/)
Qexo [https://github.com/Qexo/Qexo](https://github.com/Qexo/Qexo)
Wexagonal  [https://wexa.top/](https://wexa.top/)

### 4.2 更换主题

1.因为自带的主题并不好看，所以可以更换主题，常见主题的很多，例如butterfly，next...

```
cd /e/hexo/blog
git clone -b master https://github.com/jerryc127/hexo-theme-butterfly.git themes/butterfly
```

2.修改hexo根目录下的_config.yml中的 theme: landscape改成theme： butterfly ,(注意冒号：后面有一个空格)

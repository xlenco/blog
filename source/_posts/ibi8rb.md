---

## title: Repilt | 白嫖指南 tags: 杂项

categories: 笔记
cover: [https://cn.bing.com/th?id=OHR.BarcelonaPop_ZH-CN3687855585_1920x1080.jpg&rf=LaDigue_1920x1080.jpg](https://cn.bing.com/th?id=OHR.BarcelonaPop_ZH-CN3687855585_1920x1080.jpg&rf=LaDigue_1920x1080.jpg)
abbrlink: 8b26
date: 2022-07-11 17:28:30

前一阵子捣鼓了 [Replit](https://replit.com/)

白嫖了不少项目，感觉真滴不错。

下面会写教程。

![](https://ik.imagekit.io/nicexl/text/26604.webp#alt=)

可以部署 Vue3 博客，[Busuanzi](http://busuanzi.ibruce.info/) 计数，[Hexo](https://hexo.io/) 博客，[Kodbox](https://kodcloud.com/) 可道云，[OneManager-php](https://github.com/qkqpttgf/OneManager-php)，[Panindex](https://libsgh.github.io/PanIndex)，[Alist](https://alist-doc.nn.ci/) , [onedrive-vercel-index](https://github.com/spencerwooo/onedrive-vercel-index) 等等。

#### 准备

注册登录 [Replit](https://replit.com/) 并创建教育 Team（私有仓库）。

![](https://ik.imagekit.io/nicexl/text/replit.com.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1657535838371#alt=)

#### 开始

##### 在 Repilt 中部署 Alist

[🗂️ Alist 演示站 (nn.ci)](https://alist.nn.ci/)

##### 个人版

[
![](https://repl.it/badge/github/xilej/alist-build-on-replit#alt=Run%20on%20Repl.it)
](https://repl.it/github/xlenco/alist-build-on-replit)

##### 教育版

1.在 Repilt 中新建 Bash 语言项目

![](https://ik.imagekit.io/nicexl/text/343779.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1657536161860#alt=)

2.将以下代码粘贴至 Replit Shell 后回车

```
git clone https://github.com/xlenco/alist-build-on-replit && mv -b alist-build-on-replit/* ./ && mv -b alist-build-on-replit/.[^.]* ./ && rm -rf *~ && rm -rf alist-build-on-replit
```

当加载完 Loading Nix environment... 后点击绿色 ▶ Run

##### 在 Repilt 中部署 OneMangaer

[Demo ](https://onemanager.qkqpttgf.repl.co/)

1. 在 Repilt 中新建 PHP Web Server 语言项目
2. 在 Replit Shell 内输入以下内容并回车

`git clone https://github.com/qkqpttgf/OneManager-php && mv -b OneManager-php/* ./ && mv -b OneManager-php/.[^.]* ./ && rm -rf *~ && rm -rf OneManager-php`

3.加载完后点击绿色 ▶ Run

##### 在 Repilt 中部署 onedrive-vercel-index

这个稍微有点复杂，不过下面会手把手的教学。

1. 下载下面项目源码,并在 Repilt 新建 node.js 项目

![](https://i.imgtg.com/2022/07/14/eEeAa.jpg#alt=)

[![](https://github-readme-stats.vercel.app/api/pin/?username=xlenco&repo=onedrive-vercel-index-replit&theme=vue#alt=Readme%20Card)](https://github.com/xlenco/onedrive-vercel-index-replit)

[
![](https://repl.it/badge/github/xlenco/onedrive-vercel-index-replit#alt=Run%20on%20Repl.it)
↑ 此项如果是个人版的 Repilt 用户可以直接点击，而使用教育版的只能老老实实下载后上次上去了。记得语言要选为 node.js

![](https://i.imgtg.com/2022/07/14/eErQS.jpg#alt=)

[分流下载密码：abcd](https://url66.ctfile.com/f/30717266-614561272-1d7d9a?p=abcd)

由于 github 在国内不是太稳定，这里博主特意在网盘里放了一份，方便大不开 github 的小白

2.点击 Repilt 的左侧 🔓，并添加以下变量

![](https://i.imgtg.com/2022/07/14/eEACN.jpg#alt=)

key：

`REDIS_URL`

value：

`redis://:@127.0.0.1:1533`

3.点击绿色 ▶ Run

耐心等待加载完毕

此时根目录会出现 onedrive 文件夹

在 onedrive 文件夹内新建`redis.conf`文件

内容为下面所示

```
bind 127.0.0.1 -::1
```

4.把 main.sh 改为下面内容

```
# git clone https://github.com/spencerwooo/onedrive-vercel-index.git onedrive
cd onedrive
# pnpm install
pnpm build
pnpm start &
redis-server redis.conf --port 1533
```

然后就没有然后了，可以宣告大功告成了

点击绿色 ▶ Run 就跑起来

常见问题

#####

- Alist 如何查看密码:  `./alist -password`
- 如果忘 Repilt 中上传文件时出现下面内容，点红色的 Replace

![](https://i.imgtg.com/2022/07/14/eEZiC.jpg#alt=)

其实就是询问你是否要覆盖.replit 文件。如果不小心点的是 Cancel

可以如下图操作显示出.replit 文件，然后用 github 库里的.replit 文件内容替换掉 Repilt 里的.replit 内容

![](https://i.imgtg.com/2022/07/14/eEtAp.jpg#alt=)

结尾

####

待更新...

](https://repl.it/github/xlenco/onedrive-vercel-index-replit)

---
title: Hexo命令大全
tags: Hexo
categories: 经验分享
cover: https://9js9136l.cdn.imgeng.in/i/2024/08/98b63cee49fe68d125afc2b2e15f4a8c.webp
description: 这篇文章将介绍Hexo常用的命令，以便日后查阅
date: 2024-08-10 09:57:04
---


在使用过一段时间Hexo后，博主对Hexo命令也算是有些了解，为了以便不时之需，这里整理一下常用的命令。





## 1. 初始化

`hexo init` 命令用于初始化本地文件夹为网站的根目录

```
$ hexo init [folder]
```

- `folder` 可选参数，用以指定初始化目录的路径，若无指定则默认为当前目录



## 2. 文章的书写

`hexo new [layout] <title>`

-  [layout]为可选项，默认为post，另有page，draft可选

`hexo generate` 或 `hexo g`

- `-d 或--deploy` 文件生成后部署网站
- `-w 或--watch` 监视文件变动
- `-b 或--bail` 生成过程中出现异常则抛出。
- `-f 或--force` 强制重新生成文件
- `-c 或--concurrency` 最大同时生成文件数量，默认无限制。

## 3. 发布草稿

`hexo publish [layout] <filename>`

## 4.启动服务器

`hexo server`或`hexo s` 启动服务器，ctrl+c 结束，默认地址为：`http://localhost:4000/`

暂时修改启动端口：

```css
hexo s -p 80 
```

##  5.部署网站

`hexo deploy` 或`hexo d`

- `-g 或--generate` 部署之前写成静态文件

## 6.渲染文件

`hexo render <file1> [file2]`

- `-o或--output` 设置输出路径

## 7. 清除缓存文件

`hexo clean`或`hexo cl`

## 8. 列出网站资料

`hexo list <type>`

## 9. 显示草稿

`hexo --deaft`

## 10. 自定义当前工作目录

`hexo --cwd /path/to/cwd`

## 11. 其它

#### （1）hexo --safe

`hexo --safe` 表示安全模式，用于禁用加载插件和脚本

```
$ hexo --safe
```

**安装新插件时遇到问题可尝试此操作**

#### （2）hexo --debug

`hexo --debug` 表示调试模式，用于将消息详细记录到终端和 `debug.log` 文件

```
$ hexo --debug
```

#### （3）hexo --silent

`hexo --silent` 表示静默模式，用于静默输出到终端

```
$ hexo --silent
```

## 参考

- https://hexo.io/docs/commands

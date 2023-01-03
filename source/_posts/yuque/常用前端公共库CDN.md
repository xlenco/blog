---
title: 常用前端公共库CDN
tags: CDN
categories: 笔记
cover: 'https://xlenco.onmicrosoft.cn/img/OIP-C.jpg'
date: '2022/8/29 21:13'
updated: '2022-12-14 18:18'
abbrlink: '8606'
---

## 前沿

静态资源 [CDN](https://so.csdn.net/so/search?q=CDN&spm=1001.2101.3001.7020) 公共库是指一些服务商将我们常用的 JavaScript 库存放到网上，方便开发者直接调用，并且还对其提供 CDN 加速，这样一来可以让用户加速访问这些资源，二来还可节约自己服务器的流量。

## **jsDelivr**

MaxCDN 是一家价格相对比较便宜的 CDN 公司，在全球分布着众多的节点。 jsDelivr 是基于 MaxCDN 的一个免费开源的 CDN 解决方案，用于帮助开发者和站长。jsDelivr 包含 JavaScript 库、jQuery 插件、CSS 框架、字体等等 Web 上常用的静态资源。
官网：[http://www.jsdelivr.com/](http://www.jsdelivr.com/)
Ps：每一款 CDN 的节点数量都是大家所关心的，jsDelivr 总共提供着 13 个节点。加载速度和 CDNJS 基本差不多，国内用户建议使用国内 CDN 服务最佳。大家可以自己测试看看

## CDNJS

CDNJS 提供非常完整的 JavaScript 库，无论是热门或是冷门的一应俱全。若你觉得它们缺少哪些好用的函式库，也可以自行提交到网站里，通过审核后就 CDNJS 就会为你分流 js 文件！唯一的缺点是国外的，国内访问速度不算快。
官网：[http://www.cdnjs.com/ ](http://www.cdnjs.com/)

## **BootCDN**

BootCDN 是 Bootstrap 中文网支持并维护的开源项目免费 CDN 服务，致力于为 Bootstrap、jQuery、Angular 一样优秀的开源项目提供稳定、快速的免费 CDN 服务。BootCDN 所收录的开源项目主要同步于 cdnjs 仓库。
官网：[http://www.bootcdn.cn/](http://www.bootcdn.cn/)

## Microsoft ASP.net CDN

ASP.NET 开发团队推出的一个新的微软 Ajax CDN（Content Delivery Network，内容分发网络）服务，该服务提供了对 AJAX 库（包括 jQuery 和 ASP.NET AJAX）的缓存支持。该服务是免费的，不需任何注册，可用于商业性或非商业性用途。
官网：[http://www.asp.net/ajaxlibrary/cdn.ashx](http://www.asp.net/ajaxlibrary/cdn.ashx)
Ps：微软出品，自然不会太差。虽然在国外，速度依然不会太慢（当然比不上国内的其他 cdn）。

### Staticfile CDN

像 Google Ajax Library，Microsoft ASP.net CDN，SAE，Baidu，Upyun 等 CDN 上都免费提供的 JS 库的存储，但使用起来却都有些局限，因为他们只提供了部分 JS 库。但七牛云存储提供一个尽可能全面收录优秀开源库的仓库，并免费提供 CDN 加速服务。
官网：[http://www.staticfile.org/](http://www.asp.net/ajaxlibrary/cdn.ashx)

## 字节跳动静态资源公共库

字节跳动静态资源公共库，本网站静态资源定期同步自 https://github.com/cdnjs/cdnjs 。
CDN 节点也非常多，值得推荐的国内站点，背靠字节跳动，质量也比较有保障。
网址：[http://cdn.bytedance.com/](http://www.asp.net/ajaxlibrary/cdn.ashx)

## Bootcdn

bootcdn，国内节点众多，BootCDN 是猫云联合 Bootstrap 中文网 共同支持并维护的前端开源项目免费 CDN 服务，致力于为 Bootstrap、jQuery、React、Vue.js 一样优秀的前端开源项目提供稳定、快速的免费 CDN 加速服务。BootCDN 所收录的开源项目主要同步于 cdnjs 开源项目仓库。
网址：[https://www.bootcdn.cn/](https://www.bootcdn.cn/)

## 原 360 前端静态资源库

原 360 前端静态资源库是由奇舞团支持并维护的开源项目免费 CDN 服务，支持 HTTPS 和 HTTP/2，囊括上千个前端资源库和 Google 字体库。该站静态资源库数据均同步于 [cdnjs](https://github.com/cdnjs/packages) 开源项目仓库。
网址：[https://cdn.baomitu.com/](https://cdn.baomitu.com/)

## Unpkg

unpkg 是一个内容源自 npm 的全球快速 CDN。
它部署在 cloudflare 上，在大陆地区访问到的是香港节点。 它支持 h/2 和很多新特性，如果不考虑网络延迟的原因，性能优化较为出色。在国内一些互联网公司也有镜像，例如知乎和饿了么。
网址：[https://unpkg.com/](https://unpkg.com/)

## 国内 Unpkg 镜像

目前找了对外的国内 Unpkg 有三个个：

- 饿了么：[https://npm.elemecdn.com/](https://npm.elemecdn.com/)
- 知乎：[https://unpkg.zhimg.com/](https://unpkg.zhimg.com/)
- [https://cdn.cbd.int/#/](https://cdn.cbd.int/#/)

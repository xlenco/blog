---
title: Butterfly 主题 的 PWA 实现方案
date: 2022-12-20 20:50
updated: 2022-12-20 20:50
tags:
  - [Hexo, Butterfly, Web]
categories: 教程
cover: https://i.imgtg.com/2022/12/20/HtHoa.webp
---

## 简介

PWA 是 Google 于 2016 年提出的概念，于 2017 年正式落地，于 2018 年迎来重大突破，全球顶级的浏览器厂商，Google、Microsoft、Apple 已经全数宣布支持 PWA 技术。
PWA 全称为 Progressive Web App，中文译为渐进式 Web APP，其目的是通过各种 Web 技术实现与原生 App 相近的用户体验。
纵观现有 Web 应用与原生应用的对比差距，如离线缓存、沉浸式体验等等，可以通过已经实现的 Web 技术去弥补这些差距，最终达到与原生应用相近的用户体验效果。

## PWA 的功能

- 手机应用配置(Web App Manifest)
  可以通过 manifest.json 文件配置，使得可以直接添加到手机的桌面上。
- 离线加载与缓存(Service Worker+Cache API )
  可以通过 Service Worker + HTTPS +Cache Api + indexedDB 等一系列 Web 技术实现离线加载和缓存。
- 消息推动与通知(Push&Notification )
  实现实时的消息推送与通知
- 数据及时更新(Background Sync )
  后台同步，数据及时更新

## 正文

下面介绍几种实现 PWA 功能的方法，可根据你的需求进行选取

### hexo-offline-popup

{% hideToggle hexo-offline-popup %}
hexo-offline-popup 是一个 hexo 插件， 它可加速你的 Hexo 网站的加载速度，以及网站内容更新弹窗提示。
该插件基于停止维护已久的 hexo-service-worker 插件，并在它的基础上加以改进。

#### 安装

```
npm i hexo-offline-popup --save
```

安装后, 运行 hexo clean && hexo generate 激活插件

#### 配置

如果网站提供的所有内容来自原始服务器，你不需要添加任何配置。只需安装和运行 hexo clean && hexo generate。
在博客根目录的 \_config.yml 中添加以下配置

```
# offline config passed to sw-precache.
service_worker:
  maximumFileSizeToCacheInBytes: 5242880
  staticFileGlobs:
  - public/**/*.{js,html,css,png,jpg,gif,svg,eot,ttf,woff,woff2}
  stripPrefix: public
  verbose: true
```

如果你有 CDN 资源，例：

```
- https://cdn.some.com/some/path/some-script.js
- http://cdn.some-else.org/some/path/deeply/some-style.css
```

可以在\_config.yml 中配置

```
service_worker:
  runtimeCaching:
    - urlPattern: /*
      handler: cacheFirst
      options:
        origin: cdn.some.com
    - urlPattern: /*
      handler: cacheFirst
      options:
        origin: cdn.some-else.org
```

#### 常见问题

- 该插件仅部署后生效，本地运行不生效
- 安装该插件后第一次打开网站不弹窗，后续更新将会弹窗

{% endhideToggle %}
待更新 ing…

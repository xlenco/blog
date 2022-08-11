---
categories:
  - Wed
cover: 'https://nsso.eu.org/img/ad8152a2-23dd-444b-a8b6-1a3d78941721.jpeg'
date: '2022-08-06 15:07:01'
tags:
  - 教程
  - 笔记
title: 教程 | 使用 Uptime Kuma 监控网站
updated: '2022-08-06 17:17:49'
abbrlink: 3509
---
## 前言

提到监控，大家想到的大概是 [UptimeRobot](https://uptimerobot.com/) ，个人免费 50 个站点，而且监控页面也很炫酷

但是有个缺点就是貌似定制域名的功能要付费？最近几天，在朋友那里发现了一款替代品，这页面感觉比 [UptimeRobot](https://uptimerobot.com/) 还炫酷

{% link uptime-kuma, https://github.com/louislam/uptime-kuma,  https://i.postimg.cc/4xR3kGvj/eed6aaae58e38c7bdb12f68efa8ba532.png  %}

成品：[Xlencoの监控云台](https://uptime.xilej.repl.co/status/xlenco)

预览：![](https://nsso.eu.org/img/ff6946fc-cb28-43cc-b357-0f2b3a84d3d0.jpeg)

### 后台也十分好看～

![](https://nsso.eu.org/img/dcf48529-6a1c-46dc-b2f0-12afc5f3008b.jpeg)

并且支持Telegram, Discord, Gotify, Slack, Pushover, Email (SMTP),等90+项通知服务

并且支持黑夜模式

#### 实现步骤

* [项目地址](https://github.com/louislam/uptime-kuma)

> Replit 推荐部署仓库：https://github.com/valetzx/uptimekumaonreplit

直接跟教程搭建即可

要想开启通知，在yourwed.com/settings/notifications页面

根据你的喜好配置通知服务

#### 参考

* [笔记 | 使用 Uptime Kuma 监控网站并推送微信-zkeqのCoding日志](https://icodeq.com/2022/3b048b84e37d/)

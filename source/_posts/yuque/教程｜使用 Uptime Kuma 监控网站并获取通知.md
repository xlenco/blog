---
abbrlink: db5
categories:
  - 笔记

cover: https://ik.imagekit.io/xlenco/img/ad8152a2-23dd-444b-a8b6-1a3d78941721.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1661598662138
date: "2022-08-06 15:07:01"
tags:
  - Wed

title: 教程 | 使用 Uptime Kuma 监控网站
updated: 2022-08-06 17:17:49
---

## 前言

提到监控，大家想到的大概是 [UptimeRobot](https://uptimerobot.com/) ，个人免费 50 个站点，而且监控页面也很炫酷

但是有个缺点就是貌似定制域名的功能要付费？最近几天，在朋友那里发现了一款替代品，这页面感觉比 [UptimeRobot](https://uptimerobot.com/) 还炫酷

{% link uptime-kuma, louislam,https://github.com/louislam/uptime-kuma %}

成品：[Xlenco の监控云台](https://uptime.xilej.repl.co/status/xlenco)

预览：![](https://nsso.eu.org/img/ff6946fc-cb28-43cc-b357-0f2b3a84d3d0.jpeg#crop=0&crop=0&crop=1&crop=1&id=j31uC&originHeight=1087&originWidth=1080&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

### 后台也十分好看～

![](https://nsso.eu.org/img/dcf48529-6a1c-46dc-b2f0-12afc5f3008b.jpeg#crop=0&crop=0&crop=1&crop=1&id=ptU5G&originHeight=679&originWidth=1080&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

并且支持 Telegram, Discord, Gotify, Slack, Pushover, Email (SMTP),等 90+项通知服务

并且支持黑夜模式

#### 实现步骤

- [项目地址](https://github.com/louislam/uptime-kuma)

> Replit 推荐部署仓库：[https://github.com/valetzx/uptimekumaonreplit](https://github.com/valetzx/uptimekumaonreplit)

直接跟教程搭建即可

要想开启通知，在 yourwed.com/settings/notifications 页面

根据你的喜好配置通知服务

#### 参考

- [笔记 | 使用 Uptime Kuma 监控网站并推送微信-zkeq の Coding 日志](https://icodeq.com/2022/3b048b84e37d/)

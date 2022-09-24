---
title: Vercel子域名遭受DNS污染和SNI阻断的的解决方法
categories: 杂项
cover: https://xlenco.onmicrosoft.cn/img//vercel.png?ik-sdk-version=javascript-1.4.3&updatedAt=1664029400182
date: 2022-9-24 21:17
updated: 2022-9-24 21:17
---

vercel.app 于 2022 年 8 月再度遭受到了 DNS 污染和 SNI 阻断，中国大陆地区已无法访问。又一个国外良心服务倒下了。
![Screenshot_20220924_194645.jpg](https://cdn.nlark.com/yuque/0/2022/jpeg/22578074/1664025022550-0b2a3cef-b38d-4015-83ec-da708586ff90.jpeg#crop=0&crop=0&crop=1&crop=1&from=url&id=jwe1g&margin=%5Bobject%20Object%5D&name=Screenshot_20220924_194645.jpg&originHeight=3276&originWidth=1080&originalType=binary&ratio=1&rotation=0&showTitle=false&size=657244&status=done&style=none&title=)

博主也在用 vercel，听到这个消息内心也是十分的悲痛的。不过好在有解决方法。

> 解决方案：绑定自定义域名，并配置 CNAME 记录。

## 开始（超简单）

### 1.

在
[Domains – Dashboard – Vercel](https://vercel.com/dashboard/domains)
添加你的域名即可

### 2.

在你的域名推广商内添加 CNAME 为`cname.vercel-dns.com`或`cname-china.vercel-dns.com`（中国大陆用户推荐后者）

## 后记

目前 vercel.app 截止到 2022-9-24，在大陆依然不可用（少数地区除外）。

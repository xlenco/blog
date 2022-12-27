---
title: Butterfly主题添加51la统计和灵雀应用监控
date: 2022-09-03 08:08:07
updated:
categories: 转载
cover: https://xlenco.onmicrosoft.cn/Wallpaper/th.webp
tags:
  - Hexo
  - Butterfly

copyright_author: cxl2020MC
copyright_author_href: https://www.cxl2020mc.top/
---

# 前言

因为最近百度统计时常抽风，所以博主切换到了 51la 统计

# 51la 统计

## 快速开始

首先注册[51la 统计](https://invite.51.la/1OurQ71B5?target=V6)

> (这是一个邀请链接，我会获得 10 元，新用户会获得 8 元。(不使用邀请链接均无奖励)

并添加网站，获取网站安装代码(开启了 Pjax 的可以打开单页应用上报功能)

![](https://cxl2020mc-1304820025.file.myqcloud.com/file/202209020832226.png)

会得到如下代码

```html
<script
  charset="UTF-8"
  id="LA_COLLECT"
  src="//sdk.51.la/js-sdk-pro.min.js"
></script>
<script>
  LA.init({ id: "xxxx", ck: "xxxx", hashMode: true });
</script>
```

### 安装代码

{% tabs test1, 2 %}

<!-- tab 同步安装 -->

加入 butterfly 主题配置文件

```diff
inject:
  head:
    ......
+   - <script charset="UTF-8" id="LA_COLLECT" src="//sdk.51.la/js-sdk-pro.min.js"></script>
+   - <script>LA.init({id: "xxxx",ck: "xxxx",hashMode:true})</script>
```

<!-- endtab -->

<!-- tab 异步安装 -->

在博客根目录内的`source`文件夹内建立`js`文件夹((其实可以随便放)已经建立的不用重复建立)

在刚刚建立的`js`文件夹内新建一个`51la.js`内部写上

```js
//51.1a
LA.init({ id: "Jnkp8oCL537VDXz1", ck: "Jnkp8oCL537DXz1", hashMode: true });
//需要把上述内容换成你的id和ck
```

然后在主题配置文件内加上

```diff
inject:
  head:
    ......
+   - <script defer charset="UTF-8" id="LA_COLLECT" src="//sdk.51.la/js-sdk-pro.min.js"></script>
+   - <script defer src="/js/51la.js"></script>
```

利用 defer 标签实现按顺序异步加载

> 不要变动顺序，会导致不生效
> 注意: 等会异步安装灵雀应用监控的时候添加的 js 脚本一定要放在 51la.js 前面

<!-- endtab -->

{% endtabs %}

# 灵雀应用监控

## 快速开始

使用刚刚注册的 51la 账号登录[灵雀应用监控](https://perf.51.la/)

并且创建应用，获取安装代码

> 开启了 pjax 的可以打开单页应用上报

![](https://cxl2020mc-1304820025.file.myqcloud.com/file/202209020851621.png)

然后会得到以下内容

```html
<script
  src="https://sdk.51.la/perf/js-sdk-perf.min.js"
  crossorigin="anonymous"
></script>
<script>
  new LingQue.Monitor().init({ id: "xxxxxx", sendSpaPv: true });
</script>
```

### 安装代码

{% tabs test1, 2 %}

<!-- tab 同步安装 -->

加入 butterfly 主题配置文件

```diff
inject:
  head:
    ......
+   - <script src="https://sdk.51.la/perf/js-sdk-perf.min.js" crossorigin="anonymous"></script>
+   - <script>new LingQue.Monitor().init({id:"xxxxxxxxx",sendSpaPv:true});</script>
```

<!-- endtab -->

<!-- tab 异步安装 -->

在刚刚为异步 51la 新建的`51la.js`内部加上(注意是加上)

```js
//灵雀应用监控
new LingQue.Monitor().init({ id: "JnkoLfriTFL8Kgt", sendSpaPv: true });
//这里同样换成你的id
```

然后在主题配置文件内加上

```diff
inject:
  head:
    ......
    - <script defer charset="UTF-8" id="LA_COLLECT" src="//sdk.51.la/js-sdk-pro.min.js"></script>
+   - <script defer src="https://sdk.51.la/perf/js-sdk-perf.min.js" crossorigin="anonymous"></script>
    - <script defer src="/js/51la.js"></script>
```

利用 defer 标签实现按顺序异步加载
{% note danger no-icon %}不要变动顺序，会导致不生效{% endnote %}

<!-- endtab -->

{% endtabs %}

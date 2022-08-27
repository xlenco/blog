---
title: butterfly替换cdn
urlname: ntcxgo
date: '2022-08-26 23:46:07 +0800'
tags: []
categories: []
---

---

title: butterfly替换jsdelivr cdn链接教程
categories: 笔记
cover: [https://ik.imagekit.io/nicexl/text/a6fec42e882111ebb6edd017c2d2eca2_5BRrJR1IC.jpg](https://ik.imagekit.io/nicexl/text/a6fec42e882111ebb6edd017c2d2eca2_5BRrJR1IC.jpg)
tags: Butterfly
abbrlink: '5415'
date: 2022-05-28 20:21:46
---

最近 jsdelivr 凉了，国内不少博客都出现了无法访问或访问慢的问题。下面介绍一些 jsdelivr 的替换链接。

#### 替换方式

```
themes/butterfly/_config.yml
```

新版 butterfly cdn 配置页面，在\_config.yml 底部

![](https://ik.imagekit.io/nicexl/text/57822202270702.jpg#crop=0&crop=0&crop=1&crop=1&id=Eaamc&originHeight=634&originWidth=1018&originalType=binary∶=1&rotation=0&showTitle=false&status=done&style=none&title=)

目前能用的 jsdelivr 链接

```
gcore.jsdelivr.net
fastly.jsdelivr.net
```

带 npm 的链接自己用下面链接替换即可

#### npm

```
https://npm.sourcegcdn.com
https://cdn.bilicdn.tk/npm
https://cdn.staticfile.org/
https://npm.elemecdn.com
https://unpkg.com/
演示:https://unpkg.com/@waline/client@v2/dist/waline.js
记住/后不带npm/
```

我这里只列出我在用的 cdn，我没有用到的 cdn 可以在评论中留言，有时间我会补充。

#### jquery

```
https://npm.elemecdn.com/jquery@3.2.1/dist/jquery.min.js
```

#### pjax

```
https://npm.elemecdn.com/pjax/pjax.min.js
```

#### waline

```
https://unpkg.com/@waline/client@v2/dist/waline.js
https://unpkg.com/@waline/client@v2/dist/waline.css
```

#### fontawesome

```
https://use.fontawesome.com/releases/v6.0.0/css/all.css
```

#### fancybox

```
https://npm.elemecdn.com/@fancyapps/ui/dist/fancybox.css
```

#### medium_zoom

```
https://lf6-cdn-tos.bytecdntp.com/cdn/expire-1-M/medium-zoom/1.0.6/medium-zoom.min.js
```

#### translate

```
https://npm.elemecdn.com/js-heo@1.0.6/translate/tw_cn.js
```

---
title: 解决 PDF.js 出现 file origin does not match viewer's 的解决方法
date: 2022-12-9 10:18
updated: 2022-12-9 10:18
categories: 教程
tags: JavaScript
cover: https://xlenco.onmicrosoft.cn/img/PDF-js.webp
---

由于 pdf.js 不支持跨域请求，所以会报错：file origin does not match viewer’s，下面附两种解决方案

### 方案一

新建一个 html 页面，在页面中使用 iframe 标签，通过 iframe 标签嵌套 viewer.html，如果是只加载本地文件，在 viewer.js 修改默认的 pdf 文件路径(DEFAULT_URL 字段)即可。

```
<iframe src="web/viewer.html" width="100%" height="800px" id="Iframe"></iframe>
```

修改 viewer.js 的默认的 pdf 的文件路径

```
var DEFAULT_URL = 'test.pdf';
```

### 方案二

需要在 viewer.js 中注释的代码如下：

```
// if (origin !== viewerOrigin && protocol !== 'blob:') {
    //   throw new Error('file origin does not match viewer\'s');
 // }
```

---
title: 哔哔
date: 2022-8-7 14:36:12
type: 'bb'
aside: false
---
<div id="tip" style="text-align:center;">ipseak加载中</div>
<div id="ispeak"></div>
<link
  rel="stylesheet"
  href="https://cdn.staticfile.org/highlight.js/10.6.0/styles/atom-one-dark.min.css"
/>
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/ispeak@4.2.0/style.css"
/>

<style>
  #article-container .D-avatar {
    margin: 0 10px 0 0;
  }
  .D-footer {
    display: none;
  }
</style>
<script src="https://cdn.jsdelivr.net/npm/ispeak@4.2.0/ispeak.umd.js"></script>
<script src="https://cdn.bootcdn.net/ajax/libs/timeago.js/4.0.2/timeago.min.js"></script>
<script>
  var head = document.getElementsByTagName('head')[0]
  var meta = document.createElement('meta')
  meta.name = 'referrer'
  meta.content = 'no-referrer'
  head.appendChild(meta)
  if (ispeak) {
    ispeak
      .init({
        el: '#ispeak',
        api: 'https://kkapi.xlenco.eu.org/',
        author: '62ef45e75252f30e3bfae55e',
        pageSize: 10,
        loading_img: 'https://ik.imagekit.io/nicexl/9280b383cb4.gif',
      })
      .then(function () {
        console.log('ispeak 加载完成')
        document.getElementById('tip').style.display = 'none'
      })
  } else {
    document.getElementById('tip').innerHTML = 'ipseak依赖加载失败！'
  }
</script>

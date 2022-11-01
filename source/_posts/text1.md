---
date: 2022-11-01 14:08:22
title: text
---
<script src='https://gcore.jsdelivr.net/npm/butterfly-friend/butterfly-friend.umd.js'></script>
<link rel="stylesheet" href='https://gcore.jsdelivr.net/npm/butterfly-friend/style.css'>
<script>
document.querySelector('.flink').insertAdjacentHTML('afterbegin',"<div id='friend1' class='js-pjax'></div>")
xkFriend.init({
  el: '#friend1', // 挂载容器
  api: [
    'https://blogroll.ccknbc.cc/blogroll.json'
  ], // 你的json链接列表，可以是多个。
  loading_img: 'https://gcore.jsdelivr.net/gh/ccknbc-backup/photos/blog/2021-03-08~15-13-15.gif', // 加载中的图片
  fail_img: 'https://gcore.jsdelivr.net/gh/ccknbc-backup/photos/blog/2021-03-08~15-13-15.gif' // 加载失败的图片
})
</script>
</div>

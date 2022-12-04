---
title: 为你的Butterfly添加顶部加载进度条
tags:
  - Hexo
  - Butterfly

categories:
  - 教程

cover: https://xlenco.onmicrosoft.cn/img/j3m8y5.webp
date: 2022-10-7 18:25
updated: 2022-10-7 18:32
---

## Dome

<img src="https://cdn.nlark.com/yuque/0/2022/jpeg/22578074/1665138543325-6b92788b-09d7-47b7-9611-c033ece0c6d8.jpeg" width="50%" height="50%" alt="top.jpeg" align=center />

## 引入 css

```css
.pace {
  pointer-events: none;
  user-select: none;
  z-index: 2;
  position: fixed;
  margin: auto;
  top: 4px;
  left: 0;
  right: 0;
  height: 8px;
  border-radius: 8px;
  width: 6rem;
  background: #eaecf2;
  overflow: hidden;
}

.pace-inactive .pace-progress {
  opacity: 0;
  transition: 0.3s ease-in;
}

.pace.pace-inactive {
  opacity: 0;
  transition: 0.3s;
  top: -8px;
}

.pace .pace-progress {
  box-sizing: border-box;
  transform: translate3d(0, 0, 0);
  position: fixed;
  z-index: 2;
  display: block;
  position: absolute;
  top: 0;
  right: 100%;
  height: 100%;
  width: 100%;
  background: #49b1f5;
  background: linear-gradient(
    to right,
    rgb(18, 194, 233),
    rgb(196, 113, 237),
    rgb(246, 79, 89)
  );
  animation: gradient 2s ease infinite;
  background-size: 200%;
}
```

## 引入 JS

```javascript
<script src="//cdn.bootcss.com/pace/1.0.2/pace.min.js"></script>
```

然后三连即可

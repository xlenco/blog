---
title: 为你的Butterfly添加顶部加载进度条
tags:
  - Hexo
  - Butterfly
categories:
  - 教程
cover: >-
  https://preview.cloud.189.cn/image/imageAction?param=FCE9AA8C078A279A6BBF965DDAAF03F995218E8214C378E3E5C2A0ED42914CA4E939A74028F1250FAC32DCF70D3FC9FB01BA0B95C272EA539208272C662D6DCC5B2F056BAECB8EEB1E53523FED7A8A0C0CFD674CD770AFE7B468768C957DA34004EA1FC90143B6FE037CE07D8293D57F597CCA1B
date: '2022-10-7 18:25'
updated: '2022-10-7 18:32'
abbrlink: 769f
---

## Dome

<img src="https://cdn.nlark.com/yuque/0/2022/jpeg/22578074/1665138543325-6b92788b-09d7-47b7-9611-c033ece0c6d8.jpeg" width="50%" height="50%" alt="top.jpeg" align=center />
进度条为胶囊💊样式
{% hideToggle 4.5.0 版本 %}
4.5.0 版本主题已内置 pace.js 无需再次引入，在 `hexo-theme-butterfly`文件中配置以下内容即可
```
preloader:
  enable: true
  # source
  # 1. fullpage-loading
  # 2. pace (progress bar)
  source: 2
  # pace theme (see https://codebyzach.github.io/pace/)
  pace_css_url: https://fastly.jsdelivr.net/gh/xlenco/JS-X@main/pace.js/pace.css
```
如果你同时在使用 Heo同款loading动画，请查看
 [Heo同款loading动
](https://anzhiy.cn/posts/52d8.html){% endhideToggle %}
{% hideToggle 4.5.0 版本以下 %}

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
{% endhideToggle %}

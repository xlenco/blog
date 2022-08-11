---
title: 教程：hexo-githubcalendar 插件 1.0-为你的hexo添加首页github贡献图
tags: 教程
categories: npm
cover: >-
  https://eus-www.sway-cdn.com/s/UID4jlCINFPBsQFM/images/hDIFrQwzl2nViw?quality=750&allowAnimation=true
abbrlink: 221d
date: 2022-06-30 07:15:39
---

![1](https://ik.imagekit.io/nicexl/text/dgfhrjn_MFJ_84700.png?ik-sdk-version=javascript-1.4.3&updatedAt=1656554940160)

### NPM 插件安装的部署方法：

#### 1.安装

```
npm i hexo-githubcalendar --save

# 或者

cnpm i hexo-githubcalendar --save
```

#### 2.添加_config 配置项 (不是主题的)：

```
githubcalendar:
  enable: true
  enable_page: /
  user: zfour
  layout:
    type: id
    name: recent-posts
    index: 0
  githubcalendar_html: '<div class="recent-post-item" style="width:100%;height:auto;padding:10px;"><div id="github_loading" style="width:10%;height:100%;margin:0 auto;display: block"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"  viewBox="0 0 50 50" style="enable-background:new 0 0 50 50" xml:space="preserve"><path fill="#d0d0d0" d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z" transform="rotate(275.098 25 25)"><animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.6s" repeatCount="indefinite"></animateTransform></path></svg></div><div id="github_container"></div></div>'
  pc_minheight: 280px
  mobile_minheight: 0px
  color: "['#ebedf0', '#fdcdec', '#fc9bd9', '#fa6ac5', '#f838b2', '#f5089f', '#c4067e', '#92055e', '#540336', '#48022f', '#30021f']"
  api: https://python-github-calendar-api.vercel.app/api
  # api: https://python-gitee-calendar-api.vercel.app/api
  calendar_js: https://cdn.jsdelivr.net/gh/Zfour/hexo-github-calendar@1.21/hexo_githubcalendar.js
  plus_style: ""
```

更多主题配置请前往：[https://github.com/Zfour/hexo-github-calendar/issues](https://github.com/Zfour/hexo-github-calendar/issues)

##### enable

参数：true/false

含义：是否开启插件

##### 

##### enable_page

参数： /
含义： 路由地址，如 / 代表主页。/me/ 代表自我介绍页等等

##### 

##### user

参数： zfour
含义： 你的 github 或者 gitee 用户名

##### layout

参数：type; （class&id）

参数：name;

参数：index；（数字）

含义：如果说 gihubcalendar 是一幅画，那么这个 layout 就是指定了哪面墙来挂画

而在 HTML 的是世界里有两种墙分别 type 为 id 和 class。

其中在定义 class 的时候会出现多个 class 的情况，这时就需要使用 index，确定是哪一个。

最后墙的名字即是 name;

````
<div name="我是墙" id="recent-posts">
  <!-- id=>type  recent-posts=>name    -->
  <div name="我是画框">
    <div name="我是纸">
      <!--这里通过js挂载githubcalendar，也就是画画-->
    </div>
  </div>
</div>
````

##### githubcalendar_html

**参数：** html 模板字段
**含义：** 包含 loading，和挂载容器

```
<div class="recent-post-item" style="width:100%;height:auto;padding:10px;">
  <!--这个是画框，顾名思义就是借用文章样式给加个框-->

  <!--这个是loading的样式，可自行调整-->
  <div
    id="github_loading"
    style="width:10%;height:100%;margin:0 auto;display: block"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 50 50"
      style="enable-background:new 0 0 50 50"
      xml:space="preserve"
    >
      <path
        fill="#d0d0d0"
        d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z"
        transform="rotate(275.098 25 25)"
      >
        <animateTransform
          attributeType="xml"
          attributeName="transform"
          type="rotate"
          from="0 25 25"
          to="360 25 25"
          dur="0.6s"
          repeatCount="indefinite"
        ></animateTransform>
      </path>
    </svg>
  </div>

  <!--这个是github_containner容器，也就是纸-->
  <div id="github_container"></div>
</div>
```

##### pc_minheight

**参数：** 280px
**含义：** 电脑端插件的最小高度，减少加载带来的视觉偏移

##### mobile_minheight

**参数：** 0px
**含义：** 手机端插件的最小高度，减少加载带来的视觉偏移

### color

**参数：** “[‘#ebedf0’, ‘#fdcdec’, ‘#fc9bd9’, ‘#fa6ac5’, ‘#f838b2’, ‘#f5089f’, ‘#c4067e’, ‘#92055e’, ‘#540336’, ‘#48022f’, ‘#30021f’]”
**含义：** calendar 的主题色

```
# 以下色调选择喜欢的一行保留即可。其余注释。—————akilar的糖果色
color: "['#e4dfd7', '#f9f4dc', '#f7e8aa', '#f7e8aa', '#f8df72', '#fcd217', '#fcc515', '#f28e16', '#fb8b05', '#d85916', '#f43e06']" #橘黄色调
# color: "['#ebedf0', '#fdcdec', '#fc9bd9', '#fa6ac5', '#f838b2', '#f5089f', '#c4067e', '#92055e', '#540336', '#48022f', '#30021f']" #浅紫色调
# color: "['#ebedf0', '#f0fff4', '#dcffe4', '#bef5cb', '#85e89d', '#34d058', '#28a745', '#22863a', '#176f2c', '#165c26', '#144620']" #翠绿色调
# color: "['#ebedf0', '#f1f8ff', '#dbedff', '#c8e1ff', '#79b8ff', '#2188ff', '#0366d6', '#005cc5', '#044289', '#032f62', '#05264c']" #天青色调
```

##### api

**参数：** [https://python-github-calendar-api.vercel.app/api](https://python-github-calendar-api.vercel.app/api)
或 [https://python-gitee-calendar-api.vercel.app/api](https://python-gitee-calendar-api.vercel.app/api)
**含义：** 这里提供的是公用的 api，仅供日常使用，请不要滥用。如果想搭建自用 api，具体的部署方案可看考 [python_github_calendar_api](https://github.com/Zfour/python_github_calendar_api) 及 [python_gitee_calendar_api](https://github.com/Zfour/python_gitee_calendar_api) 的文档说明，这里不多加赘述。

##### calendar_js

**参数：** [https://cdn.jsdelivr.net/gh/Zfour/hexo-github-calendar@1.21/hexo_githubcalendar.js](https://cdn.jsdelivr.net/gh/Zfour/hexo-github-calendar@1.21/hexo_githubcalendar.js)
**含义：** jsd 加速的 js，将 github calendar 挂载入容器中
**目前已知 bug：** 在 1.21 适配 retina 屏幕后虽解决了模糊问题，但部分用户的 tooltip 会出现数据错误。降级到 @1.16 使用即可解决。

##### plus_style

**参数：** “”
**含义：** 提供可自定义的 style

如果你是 butterfly 主题，你需要修改用户名即可，如果你想在友链或者个人介绍挂载，你可以在 md 中增加墙 —— 也就是具有某一的 id 的 div。因为是在 md 中所以通过去掉 class 隐藏画框的样式，即可。同时需要调整 `enable_page` 来限定展示的页面。

如果你是其他主题用户，你可以尝试使用墙 > 画框 > 画的方式挂载，也可以通过修改主题模板来挂载。如
[给萌典主题加上 git-calendar](https://imciraos.com/posts/353f0aee/) 的方法。

##### hexo 三连

执行 hexo 三连

```
hexo clean && hexo g && hexo s
```

即发现部署完成了


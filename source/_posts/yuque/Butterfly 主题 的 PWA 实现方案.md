---
title: Butterfly 主题 的 PWA 实现方案
date: '2022-12-20 20:50'
updated: '2022-12-20 20:50'
tags:
  - Hexo
  - Butterfly
  - Web
categories: 教程
cover: 'https://i.imgtg.com/2022/12/20/HtcjX.webp'
abbrlink: '89e6'
---

## 简介

PWA 是 Google 于 2016 年提出的概念，于 2017 年正式落地，于 2018 年迎来重大突破，全球顶级的浏览器厂商，Google、Microsoft、Apple 已经全数宣布支持 PWA 技术。
PWA 全称为 Progressive Web App，中文译为渐进式 Web APP，其目的是通过各种 Web 技术实现与原生 App 相近的用户体验。
纵观现有 Web 应用与原生应用的对比差距，如离线缓存、沉浸式体验等等，可以通过已经实现的 Web 技术去弥补这些差距，最终达到与原生应用相近的用户体验效果。

## PWA 的功能

- 手机应用配置(Web App Manifest)
  可以通过 manifest.json 文件配置，使得可以直接添加到手机的桌面上。
- 离线加载与缓存(Service Worker+Cache API )
  可以通过 Service Worker + HTTPS +Cache Api + indexedDB 等一系列 Web 技术实现离线加载和缓存。
- 消息推动与通知(Push&Notification )
  实现实时的消息推送与通知
- 数据及时更新(Background Sync )
  后台同步，数据及时更新

## 正文

下面介绍几种实现 PWA 功能的方法，可根据你的需求进行选取

### hexo-offline-popup

{% hideToggle 点击查看 %}
hexo-offline-popup 是一个 hexo 插件， 它可加速你的 Hexo 网站的加载速度，以及网站内容更新弹窗提示。
该插件基于停止维护已久的 hexo-service-worker 插件，并在它的基础上加以改进。

#### 安装

```
npm i hexo-offline-popup --save
```

安装后, 运行 hexo clean && hexo generate 激活插件

#### 配置

如果网站提供的所有内容来自原始服务器，你不需要添加任何配置。只需安装和运行 hexo clean && hexo generate。
在博客根目录的 \_config.yml 中添加以下配置

```
# offline config passed to sw-precache.
service_worker:
  maximumFileSizeToCacheInBytes: 5242880
  staticFileGlobs:
  - public/**/*.{js,html,css,png,jpg,gif,svg,eot,ttf,woff,woff2}
  stripPrefix: public
  verbose: true
```

如果你有 CDN 资源，例：

```
- https://cdn.some.com/some/path/some-script.js
- http://cdn.some-else.org/some/path/deeply/some-style.css
```

可以在\_config.yml 中配置

```
service_worker:
  runtimeCaching:
    - urlPattern: /*
      handler: cacheFirst
      options:
        origin: cdn.some.com
    - urlPattern: /*
      handler: cacheFirst
      options:
        origin: cdn.some-else.org
```

#### 常见问题

- 该插件仅部署后生效，本地运行不生效
- 安装该插件后第一次打开网站不弹窗，后续更新将会弹窗

{% endhideToggle %}

### 利用 Workbox 实现 PWA

安装 Gulp

```
npm install gulp-cli -g npm install workbox-build gulp gulp-uglify readable-stream uglify-es --save-dev
```

在博客文件夹下新建一个 gulpfile.js 文件，内容如下

```
const gulp = require("gulp");
const workbox = require("workbox-build");
const uglifyes = require('uglify-es');
const composer = require('gulp-uglify/composer');
const uglify = composer(uglifyes, console);
const pipeline = require('readable-stream').pipeline;

gulp.task('generate-service-worker', () => {
    return workbox.injectManifest({
        swSrc: './sw-template.js',
        swDest: './public/sw.js',
        globDirectory: './public',
        globPatterns: [
            "**/*.{html,css,js,json,woff2}"
        ],
        modifyURLPrefix: {
            "": "./"
        }
    });
});

gulp.task("uglify", function () {
    return pipeline(
        gulp.src("./public/sw.js"),
        uglify(),
        gulp.dest("./public")
    );
});

gulp.task("build", gulp.series("generate-service-worker", "uglify"));

```

其中，globPatterns 就是生成的预缓存列表的文件匹配模式，在这里就是将所有的 html、css、js、json、woff2 文件预缓存，即博客首次加载时，自动将这些文件缓存。
然后，再新建一个 sw-template.js 文件：

```
const workboxVersion = '5.0.0';

importScripts(`https://storage.googleapis.com/workbox-cdn/releases/${workboxVersion}/workbox-sw.js`);

workbox.core.setCacheNameDetails({
    prefix: "reuixiy"
});

workbox.core.skipWaiting();

workbox.core.clientsClaim();

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

workbox.precaching.cleanupOutdatedCaches();

// Images
workbox.routing.registerRoute(
    /\.(?:png|jpg|jpeg|gif|bmp|webp|svg|ico)$/,
    new workbox.strategies.CacheFirst({
        cacheName: "images",
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                maxEntries: 1000,
                maxAgeSeconds: 60 * 60 * 24 * 30
            }),
            new workbox.cacheableResponse.CacheableResponsePlugin({
                statuses: [0, 200]
            })
        ]
    })
);

// Fonts
workbox.routing.registerRoute(
    /\.(?:eot|ttf|woff|woff2)$/,
    new workbox.strategies.CacheFirst({
        cacheName: "fonts",
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                maxEntries: 1000,
                maxAgeSeconds: 60 * 60 * 24 * 30
            }),
            new workbox.cacheableResponse.CacheableResponsePlugin({
                statuses: [0, 200]
            })
        ]
    })
);

// Google Fonts
workbox.routing.registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: "google-fonts-stylesheets"
    })
);
workbox.routing.registerRoute(
    /^https:\/\/fonts\.gstatic\.com/,
    new workbox.strategies.CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                maxEntries: 1000,
                maxAgeSeconds: 60 * 60 * 24 * 30
            }),
            new workbox.cacheableResponse.CacheableResponsePlugin({
                statuses: [0, 200]
            })
        ]
    })
);

// Static Libraries
workbox.routing.registerRoute(
    /^https:\/\/cdn\.jsdelivr\.net/,
    new workbox.strategies.CacheFirst({
        cacheName: "static-libs",
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                maxEntries: 1000,
                maxAgeSeconds: 60 * 60 * 24 * 30
            }),
            new workbox.cacheableResponse.CacheableResponsePlugin({
                statuses: [0, 200]
            })
        ]
    })
);

// External Images
workbox.routing.registerRoute(
    /^https:\/\/raw\.githubusercontent\.com\/reuixiy\/hugo-theme-meme\/master\/static\/icons\/.*/,
    new workbox.strategies.CacheFirst({
        cacheName: "external-images",
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                maxEntries: 1000,
                maxAgeSeconds: 60 * 60 * 24 * 30
            }),
            new workbox.cacheableResponse.CacheableResponsePlugin({
                statuses: [0, 200]
            })
        ]
    })
);

workbox.googleAnalytics.initialize();

```

其中，请将 prefix 修改为你博客的名字（英文），在\_config.butterfly.yml 中配置以下内容：

```
inject:
  head:
    - '<style type="text/css">.app-refresh{position:fixed;top:-2.2rem;left:0;right:0;z-index:99999;padding:0 1rem;font-size:15px;height:2.2rem;transition:all .3s ease}.app-refresh-wrap{display:flex;color:#fff;height:100%;align-items:center;justify-content:center}.app-refresh-wrap a{color:#fff;text-decoration:underline;cursor:pointer}</style>'
  bottom:
    - '<div class="app-refresh" id="app-refresh"> <div class="app-refresh-wrap"> <label>✨ 网站已更新最新版本 👉</label> <a href="javascript:void(0)" onclick="location.reload()">点击刷新</a> </div></div><script>function showNotification(){if(GLOBAL_CONFIG.Snackbar){var t="light"===document.documentElement.getAttribute("data-theme")?GLOBAL_CONFIG.Snackbar.bgLight:GLOBAL_CONFIG.Snackbar.bgDark,e=GLOBAL_CONFIG.Snackbar.position;Snackbar.show({text:"已更新最新版本",backgroundColor:t,duration:5e5,pos:e,actionText:"点击刷新",actionTextColor:"#fff",onActionClick:function(t){location.reload()}})}else{var o=`top: 0; background: ${"light"===document.documentElement.getAttribute("data-theme")?"#49b1f5":"#1f1f1f"};`;document.getElementById("app-refresh").style.cssText=o}}"serviceWorker"in navigator&&(navigator.serviceWorker.controller&&navigator.serviceWorker.addEventListener("controllerchange",function(){showNotification()}),window.addEventListener("load",function(){navigator.serviceWorker.register("/sw.js")}));</script>'
```

同样，如果你使用的不是 Butterfly 主题，可以在所示代码的基础上修改以适配你的主题。以下是展开后的代码，便于修改调试。
请将以下代码插入到头部` </head>` 之前：

```
<style type="text/css">
  .app-refresh {
    position: fixed;
    top: -2.2rem;
    left: 0;
    right: 0;
    z-index: 99999;
    padding: 0 1rem;
    font-size: 15px;
    height: 2.2rem;
    transition: all 0.3s ease;
  }
  .app-refresh-wrap {
    display: flex;
    color: #fff;
    height: 100%;
    align-items: center;
    justify-content: center;
  }

  .app-refresh-wrap span {
    color: #fff;
    text-decoration: underline;
    cursor: pointer;
  }
</style>
```

请将以下代码插入到`</body>`之前

```
<div class="app-refresh" id="app-refresh">
  <div class="app-refresh-wrap">
    <label>✨ 网站已更新最新版本 👉</label>
    <a href="javascript:void(0)" onclick="location.reload()">点击刷新</a>
  </div>
</div>
<script>
  if ('serviceWorker' in navigator) {
    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.addEventListener('controllerchange', function () {
        showNotification()
      })
    }

    window.addEventListener('load', function () {
      navigator.serviceWorker.register('/sw.js')
    })
  }

  function showNotification() {
    if (GLOBAL_CONFIG.Snackbar) {
      var snackbarBg =
        document.documentElement.getAttribute('data-theme') === 'light'
          ? GLOBAL_CONFIG.Snackbar.bgLight
          : GLOBAL_CONFIG.Snackbar.bgDark
      var snackbarPos = GLOBAL_CONFIG.Snackbar.position
      Snackbar.show({
        text: '已更新最新版本',
        backgroundColor: snackbarBg,
        duration: 500000,
        pos: snackbarPos,
        actionText: '点击刷新',
        actionTextColor: '#fff',
        onActionClick: function (e) {
          location.reload()
        },
      })
    } else {
      var showBg =
        document.documentElement.getAttribute('data-theme') === 'light'
          ? '#49b1f5'
          : '#1f1f1f'
      var cssText = `top: 0; background: ${showBg};`
      document.getElementById('app-refresh').style.cssText = cssText
    }
  }
</script>
```

最后你可以修改一下你的某篇文章，然后再次生成 sw.js，最后浏览器刷新一下测试一下{% endhideToggle %}

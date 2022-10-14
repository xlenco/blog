---
date: 2022-04-16 14:12:45
title: 关于窝
updated: 2022-10-03 18:05:23
aside: false
---


<!DOCTYPE html>
<html lang="zh-CN" data-theme="light">

<head>
    <link rel="stylesheet" href="https://fastly.jsdelivr.net/gh/xlenco/JS-X@main/about/index.css">
    <script>


xlenco
/
azy-about
Public
forked from website-pages/xlenco
Code
Pull requests
Actions
Projects
Wiki
Security
Insights
Settings
azy-about/text.html
@xlenco
xlenco Update text.html
 1 contributor
1425 lines (1358 sloc)  109 KB
<!DOCTYPE html>
<html lang="zh-CN" data-theme="light">

<head>
    <link rel="stylesheet" href="css/index.css"> -->
 
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Titillium+Web&amp;display=swap" media="print" onload="this.media=&quot;all&quot;">
    <script>
        const GLOBAL_CONFIG = {
            root: '/',
            algolia: undefined,
            localSearch: {
                "path": "/search.xml",
                "preload": true,
                "languages": {
                    "hits_empty": "找不到您查询的内容：${query}"
                }
            },
            translate: {
                "defaultEncoding": 2,
                "translateDelay": 0,
                "msgToTraditionalChinese": "繁",
                "msgToSimplifiedChinese": "简"
            },
            noticeOutdate: {
                "limitDay": 365,
                "position": "top",
                "messagePrev": "It has been",
                "messageNext": "days since the last update, the content of the article may be outdated."
            },
            highlight: {
                "plugin": "highlighjs",
                "highlightCopy": true,
                "highlightLang": true,
                "highlightHeightLimit": 230
            },
            copy: {
                success: '复制成功',
                error: '复制错误',
                noSupport: '浏览器不支持'
            },
            relativeDate: {
                homepage: false,
                post: false
            },
            runtime: '天',
            date_suffix: {
                just: '刚刚',
                min: '分钟前',
                hour: '小时前',
                day: '天前',
                month: '个月前'
            },
            copyright: undefined,
            lightbox: 'fancybox',
            Snackbar: {
                "chs_to_cht": "你已切换为繁体",
                "cht_to_chs": "你已切换为简体",
                "day_to_night": "你已切换为深色模式",
                "night_to_day": "你已切换为浅色模式",
                "bgLight": "#425aef",
                "bgDark": "#1f1f1f",
                "position": "top-center"
            },
            source: {
                justifiedGallery: {
                    js: 'https://npm.elemecdn.com/flickr-justified-gallery@latest/dist/fjGallery.min.js',
                    css: 'https://npm.elemecdn.com/flickr-justified-gallery@latest/dist/fjGallery.css'
                }
            },
            isPhotoFigcaption: false,
            islazyload: true,
            isAnchor: false
        }

        <style>
            #nav {
                opacity: 1
            }

            .justified-gallery img {
                opacity: 1
            }

            #post-meta time,
            #recent-posts time {
                display: inline !important
            }
        </style>
    </noscript>
    <script>
        (win => {
            win.saveToLocal = {
                set: function setWithExpiry(key, value, ttl) {
                    if (ttl === 0) return
                    const now = new Date()
                    const expiryDay = ttl * 86400000
                    const item = {
                        value: value,
                        expiry: now.getTime() + expiryDay,
                    }
                    localStorage.setItem(key, JSON.stringify(item))
                },

                get: function getWithExpiry(key) {
                    const itemStr = localStorage.getItem(key)

                    if (!itemStr) {
                        return undefined
                    }
                    const item = JSON.parse(itemStr)
                    const now = new Date()

                    if (now.getTime() > item.expiry) {
                        localStorage.removeItem(key)
                        return undefined
                    }
                    return item.value
                }
            }

            win.getScript = url => new Promise((resolve, reject) => {
                const script = document.createElement('script')
                script.src = url
                script.async = true
                script.onerror = reject
                script.onload = script.onreadystatechange = function() {
                    const loadState = this.readyState
                    if (loadState && loadState !== 'loaded' && loadState !== 'complete') return
                    script.onload = script.onreadystatechange = null
                    resolve()
                }
                document.head.appendChild(script)
            })

            win.activateDarkMode = function() {
                document.documentElement.setAttribute('data-theme', 'dark')
                if (document.querySelector('meta[name="theme-color"]') !== null) {
                    document.querySelector('meta[name="theme-color"]').setAttribute('content', '#0d0d0d')
                }
            }
            win.activateLightMode = function() {
                document.documentElement.setAttribute('data-theme', 'light')
                if (document.querySelector('meta[name="theme-color"]') !== null) {
                    document.querySelector('meta[name="theme-color"]').setAttribute('content', '#ffffff')
                }
            }
            const t = saveToLocal.get('theme')

            if (t === 'dark') activateDarkMode()
            else if (t === 'light') activateLightMode()

            const asideStatus = saveToLocal.get('aside-status')
            if (asideStatus !== undefined) {
                if (asideStatus === 'hide') {
                    document.documentElement.classList.add('hide-aside')
                } else {
                    document.documentElement.classList.remove('hide-aside')
                }
            }

            const detectApple = () => {
                if (/iPad|iPhone|iPod|Macintosh/.test(navigator.userAgent)) {
                    document.documentElement.classList.add('apple')
                }
            }
            detectApple()
        })(window)
    </script>
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-touch-fullscreen" content="yes">
    <meta name="apple-mobile-web-app-title" content="安知鱼">
    <meta name="application-name" content="安知鱼">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="default">
    <link rel="bookmark" href="https://npm.elemecdn.com/anzhiyu-blog@2.0.8/img/siteicon/apple-touch-icon.png">
    <link rel="apple-touch-icon-precomposed" sizes="180x180" href="img/apple-touch-icon.png">
    <link rel="apple-touch-icon" sizes="192x192" href="img/apple-touch-icon.png">
    <link rel="apple-touch-icon" sizes="512x512" href="img/apple-touch-icon.png">
    <link rel="apple-touch-startup-image" media="screen and (device-width:320px) and (device-height:568px) and (-webkit-device-pixel-ratio:2) and (orientation:landscape)" href="/img/siteicon/splashIcons/icon_1136x640.png">
    <link rel="apple-touch-startup-image" media="screen and (device-width:320px) and (device-height:568px) and (-webkit-device-pixel-ratio:2) and (orientation:portrait)" href="/img/siteicon/splashIcons/icon_640x1136.png">
    <link rel="apple-touch-startup-image" media="screen and (device-width:414px) and (device-height:896px) and (-webkit-device-pixel-ratio:3) and (orientation:landscape)" href="/img/siteicon/splashIcons/icon_2688x1242.png">
    <link rel="apple-touch-startup-image" media="screen and (device-width:414px) and (device-height:896px) and (-webkit-device-pixel-ratio:2) and (orientation:landscape)" href="/img/siteicon/splashIcons/icon_1792x828.png">
    <link rel="apple-touch-startup-image" media="screen and (device-width:375px) and (device-height:812px) and (-webkit-device-pixel-ratio:3) and (orientation:portrait)" href="/img/siteicon/splashIcons/icon_1125x2436.png">
    <link rel="apple-touch-startup-image" media="screen and (device-width:414px) and (device-height:896px) and (-webkit-device-pixel-ratio:2) and (orientation:portrait)" href="/img/siteicon/splashIcons/icon_828x1792.png">
    <link rel="apple-touch-startup-image" media="screen and (device-width:375px) and (device-height:812px) and (-webkit-device-pixel-ratio:3) and (orientation:landscape)" href="/img/siteicon/splashIcons/icon_2436x1125.png">
    <link rel="apple-touch-startup-image" media="screen and (device-width:414px) and (device-height:736px) and (-webkit-device-pixel-ratio:3) and (orientation:portrait)" href="/img/siteicon/splashIcons/icon_1242x2208.png">
    <link rel="apple-touch-startup-image" media="screen and (device-width:414px) and (device-height:736px) and (-webkit-device-pixel-ratio:3) and (orientation:landscape)" href="/img/siteicon/splashIcons/icon_2208x1242.png">
    <link rel="apple-touch-startup-image" media="screen and (device-width:375px) and (device-height:667px) and (-webkit-device-pixel-ratio:2) and (orientation:landscape)" href="/img/siteicon/splashIcons/icon_1334x750.png">
    <link rel="apple-touch-startup-image" media="screen and (device-width:375px) and (device-height:667px) and (-webkit-device-pixel-ratio:2) and (orientation:portrait)" href="/img/siteicon/splashIcons/icon_750x1334.png">
    <link rel="apple-touch-startup-image" media="screen and (device-width:1024px) and (device-height:1366px) and (-webkit-device-pixel-ratio:2) and (orientation:landscape)" href="/img/siteicon/splashIcons/icon_2732x2048.png">
    <link rel="apple-touch-startup-image" media="screen and (device-width:1024px) and (device-height:1366px) and (-webkit-device-pixel-ratio:2) and (orientation:portrait)" href="/img/siteicon/splashIcons/icon_2048x2732.png">
    <link rel="apple-touch-startup-image" media="screen and (device-width:834px) and (device-height:1194px) and (-webkit-device-pixel-ratio:2) and (orientation:landscape)" href="/img/siteicon/splashIcons/icon_2388x1668.png">
    <link rel="apple-touch-startup-image" media="screen and (device-width:834px) and (device-height:1194px) and (-webkit-device-pixel-ratio:2) and (orientation:portrait)" href="/img/siteicon/splashIcons/icon_1668x2388.png">
    <link rel="apple-touch-startup-image" media="screen and (device-width:834px) and (device-height:1112px) and (-webkit-device-pixel-ratio:2) and (orientation:landscape)" href="/img/siteicon/splashIcons/icon_2224x1668.png">
    <link rel="apple-touch-startup-image" media="screen and (device-width:414px) and (device-height:896px) and (-webkit-device-pixel-ratio:3) and (orientation:portrait)" href="/img/siteicon/splashIcons/icon_1242x2688.png">
    <link rel="apple-touch-startup-image" media="screen and (device-width:834px) and (device-height:1112px) and (-webkit-device-pixel-ratio:2) and (orientation:portrait)" href="/img/siteicon/splashIcons/icon_1668x2224.png">
    <link rel="apple-touch-startup-image" media="screen and (device-width:768px) and (device-height:1024px) and (-webkit-device-pixel-ratio:2) and (orientation:portrait)" href="/img/siteicon/splashIcons/icon_1536x2048.png">
    <link rel="apple-touch-startup-image" media="screen and (device-width:768px) and (device-height:1024px) and (-webkit-device-pixel-ratio:2) and (orientation:landscape)" href="/img/siteicon/splashIcons/icon_2048x1536.png">
    <style id="barragesColor"></style>
    <style>
        #recent-posts {
            margin-top: -1rem;
            align-content: flex-start;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between
        }

        #recent-posts&gt;

        .recent-post-item {
            margin-top: 1rem;
            display: inline-block;
            height: auto;
            width: 49%
        }

        #recent-posts&gt;

        .recent-post-item .post_cover {
            width: 100%;
            height: 200px
        }

        #recent-posts&gt;

        .recent-post-item .post_cover img.post_bg {
            width: 100%;
            height: 100%
        }

        #recent-posts&gt;
        .recent-post-item&gt;
        .recent-post-info&gt;

        .content {
            display: none
        }

        #recent-posts&gt;

        .recent-post-item {
            -webkit-flex-direction: column;
            -ms-flex-direction: column;
            flex-direction: column
        }

        #recent-posts&gt;

        .recent-post-item .left_radius {
            border-radius: 8px 8px 0 0
        }

        #recent-posts&gt;

        .recent-post-item .right_radius {
            border-radius: 8px 8px 0 0
        }

        .recent-post-item {
            height: auto !important
        }

        .recent-post-info {
            padding: 0 40px;
            margin-top: 1em;
            width: 100% !important
        }

        #recent-posts&gt;
        .recent-post-item&gt;
        .recent-post-info&gt;

        .article-title {
            -webkit-line-clamp: 1;
            margin-top: .3rem;
            margin-bottom: .3rem;
            color: var(--text-highlight-color);
            font-size: 1.2em;
            line-height: 1.4
        }

        #recent-posts&gt;
        .recent-post-item&gt;
        .recent-post-info&gt;

        .article-meta-wrap {
            margin-bottom: 1rem
        }

        @media screen and (max-width:768px) {
            #recent-posts&gt;

            .recent-post-item {
                width: 100%
            }
        }

        #recent-posts&gt;
        .recent-post-item&gt;
        .recent-post-info&gt;
        .article-meta-wrap&gt;

        .tags:before {
            content: &quot;
            \A&quot;
            ;
            white-space: pre
        }

        #recent-posts&gt;
        .recent-post-item&gt;
        .recent-post-info&gt;
        .article-meta-wrap&gt;
        .tags&gt;

        .article-meta__separator {
            display: none
        }
    </style>
   <!--   <link rel="stylesheet" href="css/clock.min.css"> --> 
   <!--   <link rel="stylesheet" href="css/runtime.css" media="print" onload="this.media=&quot;all&quot;"> -->
   <!--   <link rel="stylesheet" href="css/swiper.min.css" media="print" onload="this.media=&quot;all&quot;"> -->
   <!--  <link rel="stylesheet" href="css/swiperstyle.css" media="print" onload="this.media=&quot;all&quot;"> -->
   <!--  <link rel="stylesheet" href="css/categoryGroup.css" media="print" onload="this.media=&quot;all&quot;"> -->
   <!--  <link rel="stylesheet" href="css/animate.min.css" media="print" onload="this.media=&quot;screen&quot;"> -->
   <!--  <link rel="stylesheet" href="css/gitcalendar.css" media="print" onload="this.media=&quot;all&quot;"> -->
   <!--   <link rel="stylesheet" href="css/font-awesome-animation.min.css" media="defer" onload="this.media=&quot;all&quot;"> -->
   <!--   <link rel="stylesheet" href="css/tag_plugins.css" media="defer" onload="this.media=&quot;all&quot;"> -->
   <!--  <script src="js/carousel-touch.js"></script> -->
   <!--  <meta name="generator" content="Hexo 6.2.0"><!-- <link rel="alternate" href="/atom.xml" title="安知鱼" type="application/atom+xml"> -->
</head>

<body>
    <div id="loading-box" onclick="document.getElementById(&quot;loading-box&quot;).classList.add(&quot;loaded&quot;)">
        <div class="loading-bg">
            <div class="loading-img"></div>
            <div class="loading-image-dot"></div>
        </div>
    </div>
    <div class="special-page-background" id="web_bg"></div>
    <div id="sidebar">
        <div id="menu-mask"></div>
        <div id="sidebar-menus">
            <div class="avatar-img is-center"><img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-lazy-src="https://image.anzhiy.cn/adminuploads/1/2022/09/15/63232b7d91d22.jpg" onerror="onerror=null,src=&quot;/img/friend_404.gif&quot;" alt="avatar"></div>
            <div class="sidebar-site-data site-data is-center"><a href="/archives/">
                    <div class="headline">文章</div>
                    <div class="length-num">34</div>
                </a><a href="/tags/">
                    <div class="headline">标签</div>
                    <div class="length-num">13</div>
                </a><a href="/categories/">
                    <div class="headline">分类</div>
                    <div class="length-num">3</div>
                </a></div>
            <hr>
            <div class="menus_items">
                <div class="menus_item"><a class="site-page faa-parent animated-hover" href="javascript:void(0);"><span>文章</span><i class="fas fa-chevron-down expand"></i></a>
                    <ul class="menus_item_child" style="left:-127px">
                        <li><a class="site-page child faa-parent animated-hover" href="/archives/"><i class="fa-fw fas fa-archive faa-tada"></i> <span>隧道</span></a></li>
                        <li><a class="site-page child faa-parent animated-hover" href="/categories/"><i class="fa-fw fas fa-shapes faa-tada"></i> <span>分类</span></a></li>
                        <li><a class="site-page child faa-parent animated-hover" href="/tags/"><i class="fa-fw fas fa-tags faa-tada"></i> <span>标签</span></a></li>
                        <li><a class="site-page child faa-parent animated-hover" href="/essay/"><i class="fa-fw fas fa-lightbulb-on faa-tada"></i> <span>随想</span></a></li>
                    </ul>
                </div>
                <div class="menus_item"><a class="site-page faa-parent animated-hover" href="javascript:void(0);"><span>友链</span><i class="fas fa-chevron-down expand"></i></a>
                    <ul class="menus_item_child" style="left:-79px">
                        <li><a class="site-page child faa-parent animated-hover" href="/link/"><i class="fa-fw fas fa-link faa-tada"></i> <span>友人帐</span></a></li>
                        <li><a class="site-page child faa-parent animated-hover" href="/fcircle/"><i class="fa-fw fab fa-artstation faa-tada"></i> <span>朋友圈</span></a></li>
                        <li><a class="site-page child faa-parent animated-hover" href="/comments/"><i class="fa-fw fas fa-envelope faa-tada"></i> <span>留言板</span></a></li>
                    </ul>
                </div>
                <div class="menus_item"><a class="site-page faa-parent animated-hover" href="javascript:void(0);"><span>我的</span><i class="fas fa-chevron-down expand"></i></a>
                    <ul class="menus_item_child" style="left:-31px">
                        <li><a class="site-page child faa-parent animated-hover" href="/music/"><i class="fa-fw fas fa-music faa-tada"></i> <span>音乐馆</span></a></li>
                        <li><a class="site-page child faa-parent animated-hover" href="/bangumis/"><svg class="icon faa-tada" aria-hidden="true">
                                    <use xlink:href="https://anzhiy.cn/about/#icon-bilibili1"></use>
                                </svg> <span>追番页</span></a></li>
                    </ul>
                </div>
                <div class="menus_item"><a class="site-page faa-parent animated-hover" href="javascript:void(0);"><span>关于</span><i class="fas fa-chevron-down expand"></i></a>
                    <ul class="menus_item_child" style="left:-79px">
                        <li><a class="site-page child faa-parent animated-hover" href="/about/"><svg class="icon faa-tada" aria-hidden="true">
                                    <use xlink:href="https://anzhiy.cn/about/#icon-zhifeiji"></use>
                                </svg> <span>关于本人</span></a></li>
                        <li><a class="site-page child faa-parent animated-hover" href="/speak/"><i class="fa-fw fas fa-comment-dots faa-tada"></i> <span>闲言碎语</span></a></li>
                        <li><a class="site-page child faa-parent animated-hover" href="javascript:toRandomPost()"><i class="fa-fw fas fa-shoe-prints faa-tada"></i> <span>随便逛逛</span></a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="page" id="body-wrap">
        <header class="not-top-img" id="page-header">
            <nav id="nav"><span id="blog_name">
                    <div class="back-home-button" tabindex="-1"><i class="back-home-button-icon fas fa-grip-vertical"></i>
                        <div class="back-menu-list-groups">
                            <div class="back-menu-list-group">
                                <div class="back-menu-list-title">网页</div>
                                <div class="back-menu-list"><a class="back-menu-item" href="/" title="前往博客主页" target="_blank" one-link-mark="yes"><img class="back-menu-item-icon" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-lazy-src="https://image.anzhiy.cn/adminuploads/1/2022/09/05/6315ec9737ac4.png"><span class="back-menu-item-text">博客</span></a><a class="back-menu-item" href="https://www.cloud.anzhiy.cn/" rel="external nofollow" title="前往云盘主页" target="_blank" one-link-mark="yes"><img class="back-menu-item-icon" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-lazy-src="https://image.anzhiy.cn/adminuploads/1/2022/09/15/63232b7d91d22.jpg"><span class="back-menu-item-text">云盘主页</span></a><a class="back-menu-item" href="https://cloud.anzhiy.cn/" rel="external nofollow" title="前往安知鱼云盘" target="_blank" one-link-mark="yes"><img class="back-menu-item-icon" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-lazy-src="https://image.anzhiy.cn/adminuploads/1/2022/04/27/6268e7d9de532.png"><span class="back-menu-item-text">安知鱼云盘</span></a></div>
                            </div>
                            <div class="back-menu-list-group">
                                <div class="back-menu-list-title">项目</div>
                                <div class="back-menu-list"><a class="back-menu-item" href="http://blgou.net/#/main/home" title="查看德信官网" target="_blank" rel="noopener nofollow" one-link-mark="yes"><img class="back-menu-item-icon" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-lazy-src="https://image.anzhiy.cn/adminuploads/1/2022/09/15/6322cd942dbd9.png"><span class="back-menu-item-text">德信官网</span></a></div>
                            </div>
                        </div>
                    </div><a id="site-name" href="/">安知鱼</a>
                </span>
                <div class="mask-name-container">
                    <center id="name-container"><a id="page-name" href="javascript:rmf.scrollToTop()">PAGE_NAME</a></center>
                </div>
                <div id="menus">
                    <div class="nav-button only-home" id="travellings_button" style="display:flex"><a class="site-page" onclick="totraveling()" title="随机前往一个开往项目网站" href="javascript:void(0);" rel="external nofollow" data-pjax-state="external"><i class="fa-solid fa-train-subway" style="font-size:1.2rem"></i></a></div>
                    <div class="nav-button" id="randomPost_button"><a class="site-page" onclick="toRandomPost()" title="随机前往一个文章" data-pjax-state="data-pjax-state" one-link-mark="yes"><i class="fa-solid fa-dice" style="font-size:1.2rem"></i></a></div>
                    <div class="nav-button" id="search-button"><a class="site-page social-icon search"><i class="fas fa-search fa-fw"></i> <span>搜索</span></a></div>
                    <div class="nav-button" id="darkmode_navswitch"><a class="darkmode_switchbutton" type="button" title="浅色和深色模式转换" onclick="rmf.switchDarkMode()"><i class="fas fa-adjust"></i></a></div>
                    <div class="nav-button" id="nav-totop"><a class="totopbtn"><i class="fas fa-arrow-up"></i><span id="percent" onclick="btf.scrollToDest(0,500)">0</span></a></div>
                    <div class="menus_items">
                        <div class="menus_item"><a class="site-page faa-parent animated-hover" href="javascript:void(0);"><span>文章</span><i class="fas fa-chevron-down expand"></i></a>
                            <ul class="menus_item_child" style="left:-127px">
                                <li><a class="site-page child faa-parent animated-hover" href="/archives/"><i class="fa-fw fas fa-archive faa-tada"></i> <span>隧道</span></a></li>
                                <li><a class="site-page child faa-parent animated-hover" href="/categories/"><i class="fa-fw fas fa-shapes faa-tada"></i> <span>分类</span></a></li>
                                <li><a class="site-page child faa-parent animated-hover" href="/tags/"><i class="fa-fw fas fa-tags faa-tada"></i> <span>标签</span></a></li>
                                <li><a class="site-page child faa-parent animated-hover" href="/essay/"><i class="fa-fw fas fa-lightbulb-on faa-tada"></i> <span>随想</span></a></li>
                            </ul>
                        </div>
                        <div class="menus_item"><a class="site-page faa-parent animated-hover" href="javascript:void(0);"><span>友链</span><i class="fas fa-chevron-down expand"></i></a>
                            <ul class="menus_item_child" style="left:-79px">
                                <li><a class="site-page child faa-parent animated-hover" href="/link/"><i class="fa-fw fas fa-link faa-tada"></i> <span>友人帐</span></a></li>
                                <li><a class="site-page child faa-parent animated-hover" href="/fcircle/"><i class="fa-fw fab fa-artstation faa-tada"></i> <span>朋友圈</span></a></li>
                                <li><a class="site-page child faa-parent animated-hover" href="/comments/"><i class="fa-fw fas fa-envelope faa-tada"></i> <span>留言板</span></a></li>
                            </ul>
                        </div>
                        <div class="menus_item"><a class="site-page faa-parent animated-hover" href="javascript:void(0);"><span>我的</span><i class="fas fa-chevron-down expand"></i></a>
                            <ul class="menus_item_child" style="left:-31px">
                                <li><a class="site-page child faa-parent animated-hover" href="/music/"><i class="fa-fw fas fa-music faa-tada"></i> <span>音乐馆</span></a></li>
                                <li><a class="site-page child faa-parent animated-hover" href="/bangumis/"><svg class="icon faa-tada" aria-hidden="true">
                                            <use xlink:href="https://anzhiy.cn/about/#icon-bilibili1"></use>
                                        </svg> <span>追番页</span></a></li>
                            </ul>
                        </div>
                        <div class="menus_item"><a class="site-page faa-parent animated-hover" href="javascript:void(0);"><span>关于</span><i class="fas fa-chevron-down expand"></i></a>
                            <ul class="menus_item_child" style="left:-79px">
                                <li><a class="site-page child faa-parent animated-hover" href="/about/"><svg class="icon faa-tada" aria-hidden="true">
                                            <use xlink:href="https://anzhiy.cn/about/#icon-zhifeiji"></use>
                                        </svg> <span>关于本人</span></a></li>
                                <li><a class="site-page child faa-parent animated-hover" href="/speak/"><i class="fa-fw fas fa-comment-dots faa-tada"></i> <span>闲言碎语</span></a></li>
                                <li><a class="site-page child faa-parent animated-hover" href="javascript:toRandomPost()"><i class="fa-fw fas fa-shoe-prints faa-tada"></i> <span>随便逛逛</span></a></li>
                            </ul>
                        </div>
                    </div>
                    <div id="toggle-menu"><a class="site-page"><i class="fas fa-bars fa-fw"></i></a></div>
                </div>
            </nav>
        </header>
        <div id="home_top"></div>
        <main class="layout hide-aside" id="content-inner">
            <div class="about-page" id="page">
                <h1 class="page-title">关于</h1>
                <div id="article-container">
                    <div id="about-page">
                        <div class="author-box">
                            <div class="author-img"><img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-lazy-src="https://image.anzhiy.cn/adminuploads/1/2022/09/15/63232b7d91d22.jpg" class="no-lightbox"></div>
                            <div class="image-dot"></div>
                        </div>
                        <p class="p center logo large">关于我</p>
                        <p class="p center small">生活明朗，万物可爱✨</p>
                        <div class="author-content">
                            <div class="author-content-item myInfoAndSayHello">
                                <div class="title1">你好，很高兴认识你👋</div>
                                <div class="title2">我叫 <span class="inline-word">陈志伟</span></div>
                                <div class="title1">是一名 前端工程师、学生、独立开发者、 <span class="inline-word">博主</span></div>
                            </div>
                            <div class="aboutsiteTips author-content-item">
                                <div class="author-content-item-tips">追求</div>
                                <h2>源于<br>热爱而去 <span class="inline-word">感受</span>
                                    <div class="mask"><span class="first-tips">学习</span> <span>生活</span> <span data-up="">程序</span> <span data-show="">体验</span></div>
                                </h2>
                            </div>
                        </div>
                        <div id="gitcalendar" style="margin-top:1rem"></div>
                        <div class="author-content">
                            <div class="author-content-item skills">
                                <div class="card-content">
                                    <div class="author-content-item-tips">技能</div><span class="author-content-item-title">开启创造力</span>
                                    <div class="skills-style-group">
                                        <div class="tags-group-all">
                                            <div class="tags-group-wrapper">
                                                <div class="tags-group-icon-pair">
                                                    <div class="tags-group-icon" style="background:#b8f0ae"><img class="no-lightbox" title="Vue" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-lazy-src="https://image.anzhiy.cn/adminuploads/1/2022/09/25/633001374747b.png"></div>
                                                    <div class="tags-group-icon" style="background:#222"><img class="no-lightbox" title="React" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-lazy-src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K"></div>
                                                </div>
                                                <div class="tags-group-icon-pair">
                                                    <div class="tags-group-icon" style="background:#57b6e6"><img class="no-lightbox" title="Docker" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-lazy-src="https://image.anzhiy.cn/adminuploads/1/2022/09/25/63300647df7fa.png"></div>
                                                    <div class="tags-group-icon" style="background:#4082c3"><img class="no-lightbox" title="Photoshop" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-lazy-src="https://image.anzhiy.cn/adminuploads/1/2022/09/25/63300647e1f10.png"></div>
                                                </div>
                                                <div class="tags-group-icon-pair">
                                                    <div class="tags-group-icon" style="background:#333"><img class="no-lightbox" title="Node" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-lazy-src="/img/svg/node-logo.svg"></div>
                                                    <div class="tags-group-icon" style="background:#2e3a41"><img class="no-lightbox" title="webpack" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-lazy-src="https://image.anzhiy.cn/adminuploads/1/2022/09/26/6330ff27e5c9b.png"></div>
                                                </div>
                                                <div class="tags-group-icon-pair">
                                                    <div class="tags-group-icon" style="background:#fff"><img class="no-lightbox" title="pinia" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-lazy-src="https://npm.elemecdn.com/anzhiyu-blog@2.0.8/img/svg/pinia-logo.svg"></div>
                                                    <div class="tags-group-icon" style="background:#fff"><img class="no-lightbox" title="Python" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-lazy-src="https://image.anzhiy.cn/adminuploads/1/2022/09/25/63300647dea51.png"></div>
                                                </div>
                                                <div class="tags-group-icon-pair">
                                                    <div class="tags-group-icon" style="background:#937df7"><img class="no-lightbox" title="Vite" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-lazy-src="https://npm.elemecdn.com/anzhiyu-blog@2.0.8/img/svg/vite-logo.svg"></div>
                                                    <div class="tags-group-icon" style="background:#4499e4"><img class="no-lightbox" title="flutter" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-lazy-src="https://image.anzhiy.cn/adminuploads/1/2022/09/25/633004063ff15.png"></div>
                                                </div>
                                                <div class="tags-group-icon-pair">
                                                    <div class="tags-group-icon" style="background:#fff"><img class="no-lightbox" title="Java" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-lazy-src="https://image.anzhiy.cn/adminuploads/1/2022/09/25/633005bf0fd1e.jpg"></div>
                                                    <div class="tags-group-icon" style="background:#2c51db"><img class="no-lightbox" title="CSS3" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-lazy-src="https://image.anzhiy.cn/adminuploads/1/2022/09/25/633006cc55e07.png"></div>
                                                </div>
                                                <div class="tags-group-icon-pair">
                                                    <div class="tags-group-icon" style="background:#f7cb4f"><img class="no-lightbox" title="JS" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-lazy-src="https://image.anzhiy.cn/adminuploads/1/2022/09/25/633006eee047b.png"></div>
                                                    <div class="tags-group-icon" style="background:#e9572b"><img class="no-lightbox" title="HTML" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-lazy-src="https://image.anzhiy.cn/adminuploads/1/2022/09/25/633006f9ab27d.png"></div>
                                                </div>
                                                <div class="tags-group-icon-pair">
                                                    <div class="tags-group-icon" style="background:#df5b40"><img class="no-lightbox" title="Git" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-lazy-src="https://image.anzhiy.cn/adminuploads/1/2022/09/25/633006e37c7fd.webp"></div>
                                                    <div class="tags-group-icon" style="background:#e65164"><img class="no-lightbox" title="Apifox" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-lazy-src="https://image.anzhiy.cn/adminuploads/1/2022/09/25/633007087a4dc.webp"></div>
                                                </div>
                                                <div class="tags-group-icon-pair">
                                                    <div class="tags-group-icon" style="background:#b8f0ae"><img class="no-lightbox" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-lazy-src="https://image.anzhiy.cn/adminuploads/1/2022/09/25/633001374747b.png" title="Vue"></div>
                                                    <div class="tags-group-icon" style="background:#222"><img class="no-lightbox" title="React" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-lazy-src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K"></div>
                                                </div>
                                                <div class="tags-group-icon-pair">
                                                    <div class="tags-group-icon" style="background:#57b6e6"><img class="no-lightbox" title="Docker" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-lazy-src="https://image.anzhiy.cn/adminuploads/1/2022/09/25/63300647df7fa.png"></div>
                                                    <div class="tags-group-icon" style="background:#4082c3"><img class="no-lightbox" title="Photoshop" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-lazy-src="https://image.anzhiy.cn/adminuploads/1/2022/09/25/63300647e1f10.png"></div>
                                                </div>
                                                <div class="tags-group-icon-pair">
                                                    <div class="tags-group-icon" style="background:#333"><img class="no-lightbox" title="Node" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-lazy-src="/img/svg/node-logo.svg"></div>
                                                    <div class="tags-group-icon" style="background:#2e3a41"><img class="no-lightbox" title="webpack" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-lazy-src="https://image.anzhiy.cn/adminuploads/1/2022/09/26/6330ff27e5c9b.png"></div>
                                                </div>
                                                <div class="tags-group-icon-pair">
                                                    <div class="tags-group-icon" style="background:#fff"><img class="no-lightbox" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-lazy-src="https://npm.elemecdn.com/anzhiyu-blog@2.0.8/img/svg/pinia-logo.svg" title="pinia"></div>
                                                    <div class="tags-group-icon" style="background:#fff"><img class="no-lightbox" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-lazy-src="https://image.anzhiy.cn/adminuploads/1/2022/09/25/63300647dea51.png" title="Python"></div>
                                                </div>
                                                <div class="tags-group-icon-pair">
                                                    <div class="tags-group-icon" style="background:#937df7"><img class="no-lightbox" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-lazy-src="https://npm.elemecdn.com/anzhiyu-blog@2.0.8/img/svg/vite-logo.svg" title="Vite"></div>
                                                    <div class="tags-group-icon" style="background:#4499e4"><img class="no-lightbox" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-lazy-src="https://image.anzhiy.cn/adminuploads/1/2022/09/25/633004063ff15.png" title="flutter"></div>
                                                </div>
                                                <div class="tags-group-icon-pair">
                                                    <div class="tags-group-icon" style="background:#fff"><img class="no-lightbox" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-lazy-src="https://image.anzhiy.cn/adminuploads/1/2022/09/25/633005bf0fd1e.jpg" title="Java"></div>
                                                    <div class="tags-group-icon" style="background:#2c51db"><img class="no-lightbox" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-lazy-src="https://image.anzhiy.cn/adminuploads/1/2022/09/25/633006cc55e07.png" title="CSS3"></div>
                                                </div>
                                                <div class="tags-group-icon-pair">
                                                    <div class="tags-group-icon" style="background:#f7cb4f"><img class="no-lightbox" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-lazy-src="https://image.anzhiy.cn/adminuploads/1/2022/09/25/633006eee047b.png" title="JS"></div>
                                                    <div class="tags-group-icon" style="background:#e9572b"><img class="no-lightbox" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-lazy-src="https://image.anzhiy.cn/adminuploads/1/2022/09/25/633006f9ab27d.png" title="HTML"></div>
                                                </div>
                                                <div class="tags-group-icon-pair">
                                                    <div class="tags-group-icon" style="background:#df5b40"><img class="no-lightbox" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-lazy-src="https://image.anzhiy.cn/adminuploads/1/2022/09/25/633006e37c7fd.webp" title="Git"></div>
                                                    <div class="tags-group-icon" style="background:#e65164"><img class="no-lightbox" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-lazy-src="https://image.anzhiy.cn/adminuploads/1/2022/09/25/633007087a4dc.webp" title="Apifox"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="skills-list">
                                            <div class="skill-info">
                                                <div class="skill-icon" style="background:#b8f0ae"><img class="no-lightbox" title="Vue" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-lazy-src="https://image.anzhiy.cn/adminuploads/1/2022/09/25/633001374747b.png"></div>
                                                <div class="skill-name"><span>Vue</span></div>
                                            </div>
                                            <div class="skill-info">
                                                <div class="skill-icon" style="background:#222"><img class="no-lightbox" title="React" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-lazy-src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K"></div>
                                                <div class="skill-name"><span>React</span></div>
                                            </div>
                                            <div class="skill-info">
                                                <div class="skill-icon" style="background:#57b6e6"><img class="no-lightbox" title="Docker" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-lazy-src="https://image.anzhiy.cn/adminuploads/1/2022/09/25/63300647df7fa.png"></div>
                                                <div class="skill-name"><span>Docker</span></div>
                                            </div>
                                            <div class="skill-info">
                                                <div class="skill-icon" style="background:#333"><img class="no-lightbox" title="Node" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-lazy-src="/img/svg/node-logo.svg"></div>
                                                <div class="skill-name"><span>Node</span></div>
                                            </div>
                                            <div class="skill-info">
                                                <div class="skill-icon" style="background:#2e3a41"><img class="no-lightbox" title="Node" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-lazy-src="https://image.anzhiy.cn/adminuploads/1/2022/09/26/6330ff27e5c9b.png"></div>
                                                <div class="skill-name"><span>webpack</span></div>
                                            </div>
                                            <div class="skill-info">
                                                <div class="skill-icon" style="background:#4082c3"><img class="no-lightbox" title="Photoshop" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-lazy-src="https://image.anzhiy.cn/adminuploads/1/2022/09/25/63300647e1f10.png"></div>
                                                <div class="skill-name"><span>Photoshop</span></div>
                                            </div>
                                            <div class="skill-info">
                                                <div class="skill-icon" style="background:#fff"><img class="no-lightbox" title="pinia" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-lazy-src="https://npm.elemecdn.com/anzhiyu-blog@2.0.8/img/svg/pinia-logo.svg"></div>
                                                <div class="skill-name"><span>pinia</span></div>
                                            </div>
                                            <div class="skill-info">
                                                <div class="skill-icon" style="background:#fff"><img class="no-lightbox" title="Python" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-lazy-src="https://image.anzhiy.cn/adminuploads/1/2022/09/25/63300647dea51.png"></div>
                                                <div class="skill-name"><span>Python</span></div>
                                            </div>
                                            <div class="skill-info">
                                                <div class="skill-icon" style="background:#937df7"><img class="no-lightbox" title="Vite" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-lazy-src="https://npm.elemecdn.com/anzhiyu-blog@2.0.8/img/svg/vite-logo.svg"></div>
                                                <div class="skill-name"><span>Vite</span></div>
                                            </div>
                                            <div class="skill-info">
                                                <div class="skill-icon" style="background:#4499e4"><img class="no-lightbox" title="flutter" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-lazy-src="https://image.anzhiy.cn/adminuploads/1/2022/09/25/633004063ff15.png"></div>
                                                <div class="skill-name"><span>flutter</span></div>
                                            </div>
                                            <div class="skill-info">
                                                <div class="skill-icon" style="background:#fff"><img class="no-lightbox" title="Java" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-lazy-src="https://image.anzhiy.cn/adminuploads/1/2022/09/25/633005bf0fd1e.jpg"></div>
                                                <div class="skill-name"><span>Java</span></div>
                                            </div>
                                            <div class="skill-info">
                                                <div class="skill-icon" style="background:#2c51db"><img class="no-lightbox" title="CSS3" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-lazy-src="https://image.anzhiy.cn/adminuploads/1/2022/09/25/633006cc55e07.png"></div>
                                                <div class="skill-name"><span>CSS3</span></div>
                                            </div>
                                            <div class="skill-info">
                                                <div class="skill-icon" style="background:#f7cb4f"><img class="no-lightbox" title="JS" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-lazy-src="https://image.anzhiy.cn/adminuploads/1/2022/09/25/633006eee047b.png"></div>
                                                <div class="skill-name"><span>JS</span></div>
                                            </div>
                                            <div class="skill-info">
                                                <div class="skill-icon" style="background:#e9572b"><img class="no-lightbox" title="HTML" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-lazy-src="https://image.anzhiy.cn/adminuploads/1/2022/09/25/633006f9ab27d.png"></div>
                                                <div class="skill-name"><span>HTML</span></div>
                                            </div>
                                            <div class="skill-info">
                                                <div class="skill-icon" style="background:#df5b40"><img class="no-lightbox" title="Git" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-lazy-src="https://image.anzhiy.cn/adminuploads/1/2022/09/25/633006e37c7fd.webp"></div>
                                                <div class="skill-name"><span>Git</span></div>
                                            </div>
                                            <div class="skill-info">
                                                <div class="skill-icon" style="background:#e65164"><img class="no-lightbox" title="Apifox" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-lazy-src="https://image.anzhiy.cn/adminuploads/1/2022/09/25/633007087a4dc.webp"></div>
                                                <div class="skill-name"><span>Apifox</span></div>
                                            </div>
                                            <div class="etc">...</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="author-content-item careers">
                                <div class="card-content">
                                    <div class="author-content-item-tips">生涯</div><span class="author-content-item-title">无限进步</span>
                                    <div class="careers-group">
                                        <div class="careers-item">
                                            <div class="circle" style="background:#357ef5"></div>
                                            <div class="name">EDU,软件工程专业</div>
                                        </div>
                                    </div><img class="author-content-img no-lightbox" alt="生涯" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-lazy-src="https://image.anzhiy.cn/adminuploads/1/2022/09/26/6330e9bcc39cc.png">
                                </div>
                            </div>
                        </div>
                        <div class="author-content">
                            <div class="about-statistic author-content-item">
                                <div class="card-content">
                                    <div class="author-content-item-tips">数据</div><span class="author-content-item-title">访问统计</span>
                                    <div id="statistic"></div>
                                    <div class="post-tips">统计信息来自 <a href="https://invite.51.la/1NzKqTeb?target=V6" target="_blank" rel="noopener nofollow">51la网站统计</a></div>
                                    <div class="banner-button-group"><a class="banner-button" onclick="pjax.loadUrl(&quot;/archives/&quot;)" data-pjax-state=""><i class="fas fa-circle-arrow-up-right"></i> <span class="banner-button-text">文章隧道</span></a></div>
                                </div>
                            </div>
                            <div class="author-content-item-group column mapAndInfo">
                                <div class="author-content-item map single"><span class="map-title">我现在住在 <b>中国，长沙市</b></span></div>
                                <div class="author-content-item selfInfo single">
                                    <div><span class="selfInfo-title">生于</span> <span class="selfInfo-content" style="color:#43a6c6">2002</span></div>
                                    <div><span class="selfInfo-title">湖南信息学院</span> <span class="selfInfo-content" style="color:#c69043">软件工程</span></div>
                                    <div><span class="selfInfo-title">现在职业</span> <span class="selfInfo-content" style="color:#b04fe6">大三学生👨‍🎓</span></div>
                                </div>
                            </div>
                        </div>
                        <div class="author-content">
                            <div class="author-content-item personalities">
                                <div class="author-content-item-tips">性格</div><span class="author-content-item-title">执政官</span>
                                <div class="title2" style="color:#ac899c">ESFJ-A</div>
                                <div class="post-tips">在 <a href="https://www.16personalities.com/" target="_blank" rel="noopener nofollow">16personalities</a> 了解更多关于 <a target="_blank" rel="noopener external nofollow" href="https://www.16personalities.com/ch/esfj-%E4%BA%BA%E6%A0%BC">执政官</a></div>
                                <div class="image"><img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-lazy-src="https://npm.elemecdn.com/anzhiyu-blog@2.0.8/img/svg/ESFJ-A.svg" class="no-lightbox"></div>
                            </div>
                            <div class="author-content-item myphoto"><img class="author-content-img no-lightbox" alt="自拍" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-lazy-src="https://image.anzhiy.cn/adminuploads/1/2022/09/24/632e9643611ec.jpg"></div>
                        </div>
                        <div class="author-content">
                            <div class="author-content-item maxim">
                                <div class="author-content-item-tips">座右铭</div><span class="maxim-title"><span style="opacity:.6;margin-bottom:8px">生活明朗，</span> <span>万物可爱。</span></span>
                            </div>
                            <div class="author-content-item buff">
                                <div class="card-content">
                                    <div class="author-content-item-tips">特长</div><span class="buff-title"><span style="opacity:.6;margin-bottom:8px">脑回路新奇的 <span class="inline-word">酸菜鱼</span></span> <span>二次元指数<span class="inline-word">MAX</span></span></span>
                                </div>
                                <div class="card-background-icon"><i class="fas fa-dice-d20"></i></div>
                            </div>
                        </div>
                        <div class="author-content">
                            <div class="author-content-item game-yuanshen">
                                <div class="card-content">
                                    <div class="author-content-item-tips">爱好游戏</div><span class="author-content-item-title">原神</span>
                                    <div class="content-bottom">
                                        <div class="icon-group">
                                            <div class="loading-bar" role="presentation" aria-hidden="true"><img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-lazy-src="https://yuanshen.site/imgs/loading-bar.png" alt="Loading..." longdesc="https://ys.mihoyo.com/main/" class="no-lightbox"></div>
                                        </div>
                                        <div class="tips game-yuanshen-uid">UID: 125766904</div>
                                    </div>
                                </div>
                            </div>
                            <div class="author-content-item game-wolf">
                                <div class="card-content">
                                    <div class="author-content-item-tips">爱好番剧</div><span class="author-content-item-title">紫罗兰的永恒花园</span>
                                    <div class="content-bottom">
                                        <div class="banner-button-group"><a class="banner-button" onclick="window.open(&quot;https://www.bilibili.com/bangumi/play/ep173286?from=search&amp;seid=10927182858100936967&amp;from_spmid=666.25.episode.0&quot;)"><i class="fas fa-circle-arrow-up-right"></i> <span class="banner-button-text">立即追番</span></a></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="author-content">
                            <div class="author-content-item like-technology">
                                <div class="card-content">
                                    <div class="author-content-item-tips">关注偏好</div><span class="author-content-item-title">数码科技</span>
                                    <div class="content-bottom">
                                        <div class="tips">手机、电脑软硬件</div>
                                    </div>
                                </div>
                            </div>
                            <div class="author-content-item like-music">
                                <div class="card-content">
                                    <div class="author-content-item-tips">音乐偏好</div><span class="author-content-item-title">许嵩、民谣、</span> <span class="author-content-item-title">华语流行</span>
                                    <div class="content-bottom">
                                        <div class="tips">跟 安知鱼 一起欣赏更多音乐</div>
                                    </div>
                                    <div class="banner-button-group"><a class="banner-button" onclick="pjax.loadUrl(&quot;/music/&quot;)"><i class="fas fa-circle-arrow-up-right"></i> <span class="banner-button-text">更多推荐</span></a></div>
                                </div>
                            </div>
                        </div>
                        <div class="author-content">
                            <div class="create-site-post author-content-item single">
                                <div class="author-content-item-tips">心路历程</div>欢迎来到我的博客 😝，这里是我记笔记的地方 🙌，目前就读于长沙`湖南信息学院`的`软件工程`专业，虽然有时候常常会忘记更新笔记，咕咕 ✋~ 但是记笔记真的是一个很棒的习惯 💪，能把学下来的知识进行积累，沉淀，有一句话说的好，能教给别人的知识，才是真正学会了的知识 ⚡ 每周我都会尽量进行更新 ☁️，如果没更的话，可能是我忘了，也可能是我在钻研某个东西的时候太入迷了<psw>肯定又熬夜了</psw><del>同学们不要学我，老是熬夜会长痘</del> 给大家推荐一部番：<div class="site-card-group"><a class="site-card" target="_blank" rel="noopener" href="https://www.bilibili.com/bangumi/play/ss21542/?from=search&amp;seid=10927182858100936967" data-title="紫罗兰的永恒花园">
                                        <div class="wrapper cover"><img class="cover fadeIn" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-lazy-src="https://npm.elemecdn.com/anzhiyu-blog@1.1.6/img/post/common/violet.jpg"></div>
                                        <div class="info"><img class="flink-avatar" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-lazy-src="https://static.hdslb.com/images/favicon.ico"><span class="site-title">紫罗兰的永恒花园</span></div>
                                    </a></div>因为这部番，2018 年的一个夏天我看完以后心情久久不能释怀，为薇尔莉特与爱感到一种说不上来的味道，多年以后在看这部番，才明白原来这就是爱，喜欢这部番不仅仅是因为它制作的用心，不论是人物细节还是场景细节，不管是 op 还是 ed 都非常好听，最后的结局或许才是让我不能忘怀的原因，薇尔莉特，希望收到来自家人，朋友，恋人的那封 "信" ~<div class="checkbox blue checked"><input type="checkbox" checked="">
                                    <p>致力于成为一个前端小姥🐷 <img class="inline-img" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-lazy-src="https://cdn.jsdelivr.net/gh/volantis-x/cdn-emoji/aru-l/0000.gif/"></p>
                                </div>
                                <div class="checkbox blue checked"><input type="checkbox" checked="">
                                    <p>又菜又爱玩🎮 <kbd>ctrl</kbd> + <kbd>C</kbd>、<kbd>ctrl</kbd> + <kbd>V</kbd>高级CV工程师🏆</p>
                                </div>
                                <div class="checkbox times red checked"><input type="checkbox" checked="">
                                    <p>擅长PS、Pr、Ae、Au、Ai、Dw、An、Id等软件的安装与卸载🎃</p>
                                </div>
                                <div class="checkbox times red checked"><input type="checkbox" checked="">
                                    <p>精通Html、CSS、JavaScript、Vue、React、PHP、Java、Python、C、C++、C#、Go、TypeScript等单词的拼写🎲</p>
                                </div>
                                <div class="checkbox times red checked"><input type="checkbox" checked="">
                                    <p>熟悉Windows、Linux、Mac、Android、IOS等系统的开关机👻</p>
                                </div><span class="p h3">todoList</span>
                                <div class="checkbox checked"><input type="checkbox" checked="">
                                    <p>原生微信小程序</p>
                                </div>
                                <div class="checkbox checked"><input type="checkbox" checked="">
                                    <p>vue3、vite、 pinia</p>
                                </div>
                                <div class="checkbox checked"><input type="checkbox" checked="">
                                    <p>重装文档重写</p>
                                </div>
                                <div class="checkbox"><input type="checkbox">
                                    <p>Electron</p>
                                </div>
                                <div class="checkbox"><input type="checkbox">
                                    <p>操作系统</p>
                                </div>
                                <div class="checkbox canvas"><input type="checkbox">
                                    <p>svg绘制</p>
                                </div>
                                <div class="checkbox"><input type="checkbox">
                                    <p>threeJS</p>
                                </div>
                                <div class="checkbox Nuxt"><input type="checkbox">
                                    <p>Next</p>
                                </div>
                                <div class="checkbox"><input type="checkbox">
                                    <p>Flutter</p>
                                </div>
                                <div class="checkbox"><input type="checkbox">
                                    <p>智慧城市大前端</p>
                                </div>
                                <div class="checkbox"><input type="checkbox">
                                    <p>react18系统学习</p>
                                </div>
                                <div class="checkbox"><input type="checkbox">
                                    <p>工业企业生产管理</p>
                                </div>
                                <div class="checkbox"><input type="checkbox">
                                    <p>语言的魅力</p>
                                </div>

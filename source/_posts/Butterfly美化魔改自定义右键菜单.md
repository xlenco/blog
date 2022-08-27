---
title: Butterfly美化魔改：自定义右键菜单
tags: Butterfly
categories: 教程
cover: 'https://ik.imagekit.io/nicexl/text/4b4aa91c9481a9e3__AyhR7Wxs.jpg'
swiper_index: 2
abbrlink: 8d1e
date: 2022-06-06 16:54:30
---

最近发现[DoraKika](https://dorakika.cn/)写的右键菜单，风格简洁，十分的好看。并且支持[fontawesome](https://fontawesome.com/)

可以在rightmenu.pug中自行添加

![效果预览](https://ik.imagekit.io/nicexl/text/4b4aa91c9481a9e3__AyhR7Wxs.jpg)

下面带来教程

#### 创建rightmenu.pug文件

```
/themes/butterfly/layout/includes
```

在/includes/dorakika里创建rightmenu.pug文件

dorakika不是自带的文件夹，而是博主创建的方便管理的，推荐也创建个。

#### rightmenu.pug

```
#rightMenu
	.rightMenu-group.rightMenu-small
		a.rightMenu-item(href="javascript:window.history.back();")
			i.fa-solid.fa-arrow-left
		a.rightMenu-item(href="javascript:window.location.reload();")
			i.fa-solid.fa-arrow-rotate-right
		a.rightMenu-item(href="javascript:window.history.forward();")
			i.fa-solid.fa-arrow-right
		a.rightMenu-item#menu-radompage(href='https://nicexl.vercel.app/')
			i.fa-solid.fa-house
	.rightMenu-group.rightMenu-line.hide#menu-text
		a.rightMenu-item(href="javascript:kk.copySelect();")
			i.fa-solid.fa-copy
			span='复制'
	.rightMenu-group.rightMenu-line
		a.rightMenu-item(href="javascript:kk.switchDarkMode();")
			i.fa-solid.fa-circle-half-stroke
			span='昼夜切换'
		a.rightMenu-item(href="javascript:kk.switchReadMode();")
			i.fa-solid.fa-book
			span='阅读模式'
```

#### 修改layout.pug文件

添加如下内容

```
!=partial('includes/dorakika/rightmenu',{}, {cache:true})
```

#### 创建rightmenu.css文件

在如下目录创建

```
/themes/butterfly/source/css
```

```
/* rightMenu右键菜单 */
#rightMenu{
	display: none;
	position: fixed;
  padding: 0 0.25rem;
	width: 9rem;
	height: fit-content;
	top: 10%;
	left: 10%;
	background-color: var(--heo-card-bg);
  color: var(--heo-fontcolor);
	border-radius: 12px;
	z-index: 102;
  border: var(--style-border);
  transition: 0.3s;
}
#rightMenu:hover{
  border: var(--style-border-hover);
  box-shadow: var(--heo-shadow-theme);
}
#rightMenu .rightMenu-group{
	padding: 0.35rem 0.3rem;
}
#rightMenu .rightMenu-group:not(:nth-last-child(1)){
	border-bottom: 1px dashed var(--heo-theme-op);
}
#rightMenu .rightMenu-group.rightMenu-small{
	display: flex;
	justify-content: space-between;
}
#rightMenu .rightMenu-group .rightMenu-item{
	border-radius: 8px;
	transition: 0.3s;
  cursor: pointer;
}

#rightMenu .rightMenu-line .rightMenu-item{
  margin: 0.25rem 0;
  padding: 0.25rem 0;
}
#rightMenu .rightMenu-group.rightMenu-line .rightMenu-item{
	display: flex;
}
#rightMenu .rightMenu-group .rightMenu-item:hover{
	background-color: var(--heo-theme);
  color: var(--heo-white);
  box-shadow: var(--heo-shadow-theme);
}
#rightMenu .rightMenu-group .rightMenu-item i{
	display: inline-block;
	text-align: center;
	line-height: 1.5rem;
	width: 1.5rem;
	padding: 0 0.25rem;
}
#rightMenu .rightMenu-line .rightMenu-item i{
  margin: 0 0.25rem;
}
#rightMenu .rightMenu-group .rightMenu-item span{
	line-height: 1.5rem;
}
#rightmenu-mask{
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: var(--heo-maskbg);
  top: 0;
  left: 0;
  display: none;
  z-index: 101;
  margin: 0!important;
}
```

#### 创建rightmenu.js文件

在如下目录里创建

```
/themes/butterfly/source/js
```

```
let kk = {};
kk.showRightMenu = function(isTrue, x=0, y=0){
    let $rightMenu = $('#rightMenu');
    $rightMenu.css('top',x+'px').css('left',y+'px');

    if(isTrue){
        $rightMenu.show();
    }else{
        $rightMenu.hide();
    }
}
kk.switchDarkMode = function(){
    const nowMode = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
    if (nowMode === 'light') {
        activateDarkMode()
        saveToLocal.set('theme', 'dark', 2)
        GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.day_to_night)
    } else {
        activateLightMode()
        saveToLocal.set('theme', 'light', 2)
        GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.night_to_day)
    }
    // handle some cases
    typeof utterancesTheme === 'function' && utterancesTheme()
    typeof FB === 'object' && window.loadFBComment()
    window.DISQUS && document.getElementById('disqus_thread').children.length && setTimeout(() => window.disqusReset(), 200)
};
kk.switchReadMode = function(){
    const $body = document.body
    $body.classList.add('read-mode')
    const newEle = document.createElement('button')
    newEle.type = 'button'
    newEle.className = 'fas fa-sign-out-alt exit-readmode'
    $body.appendChild(newEle)

    function clickFn () {
        $body.classList.remove('read-mode')
        newEle.remove()
        newEle.removeEventListener('click', clickFn)
    }

    newEle.addEventListener('click', clickFn)
}
kk.switchTheme=function(load=false){
    //空字符串表示butterfly原版主题（即不加载css）
    //FallGuys.css是我自己的魔改主题，需替换
    let themes = ['FallGuys.css',''];
    let vTheme = parseInt(localStorage.getItem('visitor-theme'));
    if(!vTheme){
        vTheme = load?0:1;
    }else{
        vTheme += load?0:1;
        vTheme%=themes.length;
    }
    localStorage.setItem('visitor-theme',vTheme)
    let themesrc = ''
    if(themes[vTheme]){
        themesrc += window.location.origin+'/css/dorakika/'+themes[vTheme];
    }
    //css引入时link标签添加属性tag="theme"
    let themeLink = $(document).find('[tag="theme"]')[0];
    if(themeLink)themeLink.href = themesrc;
};

//复制选中文字
kk.copySelect = function(){
    document.execCommand('Copy',false,null);
    //这里可以写点东西提示一下 已复制
}

//回到顶部
kk.scrollToTop = function(){
    btf.scrollToDest(0, 500);
}

// 右键菜单事件
if(! (navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))){
    window.oncontextmenu = function(event){
        $('.rightMenu-group.hide').hide();
        if(document.getSelection().toString()){
            $('#menu-text').show();
        }

        console.log(event.target);
        let pageX = event.clientX + 10;
        let pageY = event.clientY;
        let rmWidth = $('#rightMenu').width();
        let rmHeight = $('#rightMenu').height();
        if(pageX + rmWidth > window.innerWidth){
            pageX -= rmWidth+10;
        }
        if(pageY + rmHeight > window.innerHeight){
            pageY -= pageY + rmHeight - window.innerHeight;
        }



        kk.showRightMenu(true, pageY, pageX);
        return false;
    };

    window.addEventListener('click',function(){kk.showRightMenu(false);});
//     window.addEventListener('load',function(){kk.switchTheme(true);});
}
```

#### 在head和bottom分别引入js和css

在head引入如下内容

```
- <link rel="stylesheet" href="/css/rightmenu.css">
```

在bottom引入如下内容

```
- <script src="/js/rightmenu.js"></script>
- <script src="https://npm.elemecdn.com/jquery@3.2.1/dist/jquery.min.js"></script>
```

然后就大功告成了！(◍˃̶ᗜ˂̶◍)✩


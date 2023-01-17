// 页脚随机友链
"use strict"; 
var shine = { 
    saveData: (e,t)=>{ 
        localStorage.setItem(e, JSON.stringify({ 
            time: Date.now(), 
            data: t 
        })) 
    }, 
    loadData: (e,t)=>{ 
        let n = JSON.parse(localStorage.getItem(e)); 
        if (n) { 
            let e = Date.now() - n.time; 
            if (e < 60 * t * 1e3 && e > -1) 
                return n.data 
        } 
        return 0 
    }, 
    randomLink: ()=>{ 
        let e = shine.loadData("links", 30); 
        if (e) { 
            let t = document.querySelectorAll("#friend-links-in-footer .footer-item"); 
            if (!t.length) 
                return; 
            for (let n = 0; n < 5; n++) { 
                let o = parseInt(Math.random() * e.length); 
                t[n].innerText = e[o].name, 
                t[n].href = e[o].link, 
                e.splice(o, 1) 
            } 
        } else{ 
            fetch("https://githubusercontent.onmicrosoft.cn/xlenco/friends/output/v2/data.json").then((e=>e.json())).then((e=>{ 
                shine.saveData("links", e.link_list), 
                shine.randomLink() 
            } 
            )) 
        } 
    } 
} 

shine.randomLink(); 
// nav.pug.导航栏获取标题
"" === GLOBAL_CONFIG_SITE.title.replace("Xlenco", "") ? document.getElementById("page-name-text").style.display = "none" : document.querySelector("#page-name-text>span").innerHTML = document.title.split(" | Xlenco")[0];
// 新年侧边栏
let newYearTimer = null;
var newYear = () => {
    clearTimeout(newYearTimer);
    if (!document.querySelector('#newYear')) return;
    // 新年时间戳 and 星期对象
    let newYear = new Date('2023-01-22 00:00:00').getTime() / 1000,
        week = { 0: '周日', 1: '周一', 2: '周二', 3: '周三', 4: '周四', 5: '周五', 6: '周六' }

    time();

    // 补零函数
    function nol(h) { return h > 9 ? h : '0' + h; };

    function time() {
        // 现在 时间对象
        let now = new Date();

        // 右下角 今天
        document.querySelector('#newYear .today').innerHTML = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + ' ' + week[now.getDay()]

        // 现在与新年相差秒数
        let second = newYear - Math.round(now.getTime() / 1000);

        // 小于0则表示已经过年
        if (second < 0) {
            document.querySelector('#newYear .title').innerHTML = 'Happy New Year!';
            document.querySelector('#newYear .newYear-time').innerHTML = '<span class="happyNewYear">新年快乐</span>';
        } else {
            // 大于0则还未过年
            document.querySelector('#newYear .title').innerHTML = '距离2023年春节：'

            // 大于一天则直接渲染天数
            if (second > 86400) {
                document.querySelector('#newYear .newYear-time').innerHTML = `<span class="day">${Math.ceil(second / 86400)}<span class="unit">天</span></span>`
            } else {
                // 小于一天则使用时分秒计时。
                let h = nol(parseInt(second / 3600));
                second %= 3600;
                let m = nol(parseInt(second / 60));
                second %= 60;
                let s = nol(second);
                document.querySelector('#newYear .newYear-time').innerHTML = `<span class="time">${h}:${m}:${s}</span></span>`;
                // 计时
                newYearTimer = setTimeout(time, 1000);
            }
        }
    }

    // 元宝飘落
    jQuery(document).ready(function($) {
        $('#newYear').wpSuperSnow({
            flakes: ['https://xlenco.onmicrosoft.cn/img/yb1.webp', 'https://xlenco.onmicrosoft.cn/img/yb2.webp', 'https://xlenco.onmicrosoft.cn/img/yb3.webp'],
            totalFlakes: '100',
            zIndex: '999999',
            maxSize: '30',
            maxDuration: '20',
            useFlakeTrans: false
        });
    });
}
newYear();
// 浏览器动态标题
var OriginTitle = document.title;
var titleTime;
document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
        document.title = 'w(ﾟДﾟ)w 不要走鸭！再看看吧！！';
        clearTimeout(titleTime);
    }
    else {
        document.title = '♪(^∇^*) 又见面了！' + OriginTitle;
        titleTime = setTimeout(function () {
            document.title = OriginTitle;
        }, 2000);
    }
});

//开发者模式监测
window.onkeydown = function (e) {
  123 === e.keyCode && btf.snackbarShow("开发者模式已打开，请遵循GPL协议", !1, 3e3);
  console.warn("开发者模式已打开，请遵循GPL协议");
};

// 适应窗口大小
function winResize() {
  var offsetWid = document.documentElement.clientWidth;
  if (offsetWid <= 768) {
      winbox.resize(offsetWid * 0.95 + "px", "70%").move("center", "center");
  } else {
      winbox.resize(offsetWid * 0.6 + "px", "70%").move("center", "center");
  }
}

// 分享本页
function share() {
    let url = window.location.origin + window.location.pathname
    new ClipboardJS(".share", { text: function() { return '标题：' + document.title + '\n链接：' + url } });
    btf.snackbarShow("本页链接已复制到剪切板，快去分享吧~").innerText=document.title.split(" |Xlenco")[0];
}

//右键菜单 rightmenu
function insertAtCursor(myField, myValue) {

  //IE 浏览器
  if (document.selection) {
      myField.focus();
      sel = document.selection.createRange();
      sel.text = myValue;
      sel.select();
  }

  //FireFox、Chrome等
  else if (myField.selectionStart || myField.selectionStart == '0') {
      var startPos = myField.selectionStart;
      var endPos = myField.selectionEnd;

      // 保存滚动条
      var restoreTop = myField.scrollTop;
      myField.value = myField.value.substring(0, startPos) + myValue + myField.value.substring(endPos, myField.value.length);

      if (restoreTop > 0) {
          myField.scrollTop = restoreTop;
      }

      myField.focus();
      myField.selectionStart = startPos + myValue.length;
      myField.selectionEnd = startPos + myValue.length;
  } else {
      myField.value += myValue;
      myField.focus();
  }
}
let rmf = {};
const box = document.documentElement

rmf.showRightMenu = function (isTrue, x = 0, y = 0) {
  let $rightMenu = $('#rightMenu');
  $rightMenu.css('top', x + 'px').css('left', y + 'px');

  if (isTrue) {
      $rightMenu.show();
      stopMaskScroll();
      $('#rightmenu-mask').attr('style', 'display: flex');
  } else {
      $rightMenu.hide();
      $('#rightmenu-mask').attr('style', 'display: none');

  }
}
rmf.switchDarkMode = function () {
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
rmf.copyWordsLink = function () {
  let url = window.location.href
  let txa = document.createElement("textarea");
  txa.value = url;
  document.body.appendChild(txa)
  txa.select();
  document.execCommand("Copy");
  document.body.removeChild(txa);
  btf.snackbarShow(`复制成功！`);
}
rmf.switchReadMode = function () {
  const $body = document.body
  $body.classList.add('read-mode')
  const newEle = document.createElement('button')
  newEle.type = 'button'
  newEle.className = 'fas fa-sign-out-alt exit-readmode'
  $body.appendChild(newEle)

  function clickFn() {
      $body.classList.remove('read-mode')
      newEle.remove()
      newEle.removeEventListener('click', clickFn)
  }

  newEle.addEventListener('click', clickFn)
}
//复制选中文字
rmf.copySelect = function () {
  document.execCommand('Copy', false, null);
  //这里可以写点东西提示一下 已复制
  btf.snackbarShow(`✨我宣布你的剪切板已经被我填满了`);
}

//回到顶部
rmf.scrollToTop = function () {
  btf.scrollToDest(0, 500);
}
rmf.translate = function () {
  document.getElementById("translateLink").click();
}

// 右键菜单事件
document.onkeydown = function (event) {
  event = (event || window.event);
  if (event.keyCode == 17) {
      console.log("你知道的太多了");
      return;
  }
}

function stopMaskScroll() {
  if (document.getElementById('rightmenu-mask')) {
    let xscroll = document.getElementById('rightmenu-mask');
    xscroll.addEventListener(
      'mousewheel',
      function (e) {
        //阻止浏览器默认方法
        rm.hideRightMenu();
        // e.preventDefault();
      },
      false
    );
  }
  if (document.getElementById('rightMenu')) {
    let xscroll = document.getElementById('rightMenu');
    xscroll.addEventListener(
      'mousewheel',
      function (e) {
        //阻止浏览器默认方法
        rm.hideRightMenu();
        // e.preventDefault();
      },
      false
    );
  }
}

function popupMenu() {
  //window.oncontextmenu=function(){return false;}
  window.oncontextmenu = function (event) {
      console.log(event.keyCode)
      $('.rightMenu-group.hide').hide();
      //如果有文字选中，则显示 文字选中相关的菜单项
      if (document.getSelection().toString()) {
          $('#menu-text').show();
      }
      if (document.getElementById('post')) {
          $('#menu-post').show();
      } else {
          if (document.getElementById('page')) {
              $('#menu-post').show();
          }
      }
      var el = window.document.body;
      el = event.target;
      var a=/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/
      if (a.test(window.getSelection().toString())){
          $('#menu-too').show()
      }
      if (el.tagName == 'A') {
          $('#menu-to').show()
          rmf.open = function () {
              location.href = el.href
          }
          rmf.openWithNewTab = function () {
              window.open(el.href);
          }
          rmf.copyLink = function () {
              let url = el.href
              let txa = document.createElement("textarea");
              txa.value = url;
              document.body.appendChild(txa)
              txa.select();
              document.execCommand("Copy");
              document.body.removeChild(txa);
          }
      }
      if (el.tagName == 'IMG') {
          $('#menu-img').show()
          rmf.openWithNewTab = function () {
              window.open(el.src);
          }
          rmf.click = function () {
              el.click()
          }
          rmf.copyLink = function () {
              let url = el.src
              let txa = document.createElement("textarea");
              txa.value = url;
              document.body.appendChild(txa)
              txa.select();
              document.execCommand("Copy");
              document.body.removeChild(txa);
          }
      } else if (el.tagName == "TEXTAREA" || el.tagName == "INPUT") {
          $('#menu-paste').show();
          rmf.paste = function () {
              navigator.permissions
                  .query({
                      name: 'clipboard-read'
                  })
                  .then(result => {
                      if (result.state == 'granted' || result.state == 'prompt') {
                          //读取剪贴板
                          navigator.clipboard.readText().then(text => {
                              console.log(text)
                              insertAtCursor(el, text)
                          })
                      } else {
                          alert('请允许读取剪贴板！')
                      }
                  })
          }
      }
      let pageX = event.clientX + 10;
      let pageY = event.clientY;
      let rmWidth = $('#rightMenu').width();
      let rmHeight = $('#rightMenu').height();
      if (pageX + rmWidth > window.innerWidth) {
          pageX -= rmWidth + 10;
      }
      if (pageY + rmHeight > window.innerHeight) {
          pageY -= pageY + rmHeight - window.innerHeight;
      }



      rmf.showRightMenu(true, pageY, pageX);
      return false;
  };

  window.addEventListener('click', function () {
      rmf.showRightMenu(false);
  });

  $('#rightmenu-mask').on('click', rmf.hideRightMenu);
  $('#rightmenu-mask').contextmenu(function () {
    rmf.hideRightMenu();
    return false;
  });

  addLongtabListener(box, popupMenu)
}
if (!(navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
  popupMenu()
}


function addLongtabListener(target, callback) {
  let timer = 0 // 初始化timer

  target.ontouchstart = () => {
      timer = 0 // 重置timer
      timer = setTimeout(() => {
          callback();
          timer = 0
      }, 380) // 超时器能成功执行，说明是长按
  }

  target.ontouchmove = () => {
      clearTimeout(timer) // 如果来到这里，说明是滑动
      timer = 0
  }

  target.ontouchend = () => { // 到这里如果timer有值，说明此触摸时间不足380ms，是点击
      if (timer) {
          clearTimeout(timer)
      }
  }
}

// 即可短文瀑布流waterfall.js
function waterfall(a) {
  function b(a, b) {
    var c = window.getComputedStyle(b);
    return parseFloat(c["margin" + a]) || 0;
  }
  function c(a) {
    return a + "px";
  }
  function d(a) {
    return parseFloat(a.style.top);
  }
  function e(a) {
    return parseFloat(a.style.left);
  }
  function f(a) {
    return a.clientWidth;
  }
  function g(a) {
    return a.clientHeight;
  }
  function h(a) {
    return d(a) + g(a) + b("Bottom", a);
  }
  function i(a) {
    return e(a) + f(a) + b("Right", a);
  }
  function j(a) {
    a = a.sort(function (a, b) {
      return h(a) === h(b) ? e(b) - e(a) : h(b) - h(a);
    });
  }
  function k(b) {
    f(a) != t && (b.target.removeEventListener(b.type, arguments.callee), waterfall(a));
  }
  "string" == typeof a && (a = document.querySelector(a));
  var l = [].map.call(a.children, function (a) {
    return (a.style.position = "absolute"), a;
  });
  a.style.position = "relative";
  var m = [];
  l.length && ((l[0].style.top = "0px"), (l[0].style.left = c(b("Left", l[0]))), m.push(l[0]));
  for (var n = 1; n < l.length; n++) {
    var o = l[n - 1],
      p = l[n],
      q = i(o) + f(p) <= f(a);
    if (!q) break;
    (p.style.top = o.style.top), (p.style.left = c(i(o) + b("Left", p))), m.push(p);
  }
  for (; n < l.length; n++) {
    j(m);
    var p = l[n],
      r = m.pop();
    (p.style.top = c(h(r) + b("Top", p))), (p.style.left = c(e(r))), m.push(p);
  }
  j(m);
  var s = m[0];
  a.style.height = c(h(s) + b("Bottom", s));
  var t = f(a);
  window.addEventListener ? window.addEventListener("resize", k) : (document.body.onresize = k);
}
var percentFlag = false; // 节流阀
function essayScroll() {
  let a = document.documentElement.scrollTop || window.pageYOffset; // 卷去高度
  const waterfallResult = a % document.documentElement.clientHeight; // 卷去一个视口
  result <= 99 || (result = 99);

  if (
    !percentFlag &&
    waterfallResult + 100 >= document.documentElement.clientHeight &&
    document.querySelector("#waterfall")
  ) {
    // console.info(waterfallResult, document.documentElement.clientHeight);
    setTimeout(() => {
      waterfall("#waterfall");
    }, 500);
  } else {
    setTimeout(() => {
      document.querySelector("#waterfall") && waterfall("#waterfall");
    }, 500);
  }

  const r = window.scrollY + document.documentElement.clientHeight;

  let p = document.getElementById("post-comment") || document.getElementById("footer");

  (p.offsetTop + p.offsetHeight / 2 < r || 90 < result) && (percentFlag = true);
}
function replaceAll(e, n, t) {
  return e.split(n).join(t);
}
var anzhiyu = {
  diffDate: function (d, more = false) {
    const dateNow = new Date();
    const datePost = new Date(d);
    const dateDiff = dateNow.getTime() - datePost.getTime();
    const minute = 1000 * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const month = day * 30;

    let result;
    if (more) {
      const monthCount = dateDiff / month;
      const dayCount = dateDiff / day;
      const hourCount = dateDiff / hour;
      const minuteCount = dateDiff / minute;

      if (monthCount >= 1) {
        result = datePost.toLocaleDateString().replace(/\//g, "-");
      } else if (dayCount >= 1) {
        result = parseInt(dayCount) + " " + GLOBAL_CONFIG.date_suffix.day;
      } else if (hourCount >= 1) {
        result = parseInt(hourCount) + " " + GLOBAL_CONFIG.date_suffix.hour;
      } else if (minuteCount >= 1) {
        result = parseInt(minuteCount) + " " + GLOBAL_CONFIG.date_suffix.min;
      } else {
        result = GLOBAL_CONFIG.date_suffix.just;
      }
    } else {
      result = parseInt(dateDiff / day);
    }
    return result;
  },
  changeTimeInEssay: function () {
    document.querySelector("#bber") &&
      document.querySelectorAll("#bber time").forEach(function (e) {
        var t = e,
          datetime = t.getAttribute("datetime");
        (t.innerText = anzhiyu.diffDate(datetime, true)), (t.style.display = "inline");
      });
  },
  reflashEssayWaterFall: function () {
    document.querySelector("#waterfall") &&
      setTimeout(function () {
        waterfall("#waterfall");
        document.getElementById("waterfall").classList.add("show");
      }, 500);
  },
  commentText: function (e) {
    if (e == "undefined" || e == "null") e = "好棒！";
    var n = document.getElementsByClassName("el-textarea__inner")[0],
      t = document.createEvent("HTMLEvents");
    if (!n) return;
    t.initEvent("input", !0, !0);
    var o = replaceAll(e, "\n", "\n> ");
    (n.value = "> " + o + "\n\n"), n.dispatchEvent(t);
    var i = document.querySelector("#post-comment").offsetTop;
    window.scrollTo(0, i - 80),
      n.focus(),
      n.setSelectionRange(-1, -1),
      document.getElementById("comment-tips") && document.getElementById("comment-tips").classList.add("show");
  },
};

anzhiyu.changeTimeInEssay();
anzhiyu.reflashEssayWaterFall();

// 即刻短文轮播
var percentFlag = false; // 节流阀
function essayScroll() {
  let a = document.documentElement.scrollTop || window.pageYOffset; // 卷去高度
  const waterfallResult = a % document.documentElement.clientHeight; // 卷去一个视口
  result <= 99 || (result = 99);

  if (
    !percentFlag &&
    waterfallResult + 100 >= document.documentElement.clientHeight &&
    document.querySelector("#waterfall")
  ) {
    // console.info(waterfallResult, document.documentElement.clientHeight);
    setTimeout(() => {
      waterfall("#waterfall");
    }, 500);
  } else {
    setTimeout(() => {
      document.querySelector("#waterfall") && waterfall("#waterfall");
    }, 500);
  }

  const r = window.scrollY + document.documentElement.clientHeight;

  let p = document.getElementById("post-comment") || document.getElementById("footer");

  (p.offsetTop + p.offsetHeight / 2 < r || 90 < result) && (percentFlag = true);
}
function replaceAll(e, n, t) {
  return e.split(n).join(t);
}
var anzhiyu = {
  diffDate: function (d, more = false) {
    const dateNow = new Date();
    const datePost = new Date(d);
    const dateDiff = dateNow.getTime() - datePost.getTime();
    const minute = 1000 * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const month = day * 30;

    let result;
    if (more) {
      const monthCount = dateDiff / month;
      const dayCount = dateDiff / day;
      const hourCount = dateDiff / hour;
      const minuteCount = dateDiff / minute;

      if (monthCount >= 1) {
        result = datePost.toLocaleDateString().replace(/\//g, "-");
      } else if (dayCount >= 1) {
        result = parseInt(dayCount) + " " + GLOBAL_CONFIG.date_suffix.day;
      } else if (hourCount >= 1) {
        result = parseInt(hourCount) + " " + GLOBAL_CONFIG.date_suffix.hour;
      } else if (minuteCount >= 1) {
        result = parseInt(minuteCount) + " " + GLOBAL_CONFIG.date_suffix.min;
      } else {
        result = GLOBAL_CONFIG.date_suffix.just;
      }
    } else {
      result = parseInt(dateDiff / day);
    }
    return result;
  },
  changeTimeInEssay: function () {
    document.querySelector("#bber") &&
      document.querySelectorAll("#bber time").forEach(function (e) {
        var t = e,
          datetime = t.getAttribute("datetime");
        (t.innerText = anzhiyu.diffDate(datetime, true)), (t.style.display = "inline");
      });
  },
  reflashEssayWaterFall: function () {
    document.querySelector("#waterfall") &&
      setTimeout(function () {
        waterfall("#waterfall");
        document.getElementById("waterfall").classList.add("show");
      }, 500);
  },
  commentText: function (e) {
    if (e == "undefined" || e == "null") e = "好棒！";
    var n = document.getElementsByClassName("el-textarea__inner")[0],
      t = document.createEvent("HTMLEvents");
    if (!n) return;
    t.initEvent("input", !0, !0);
    var o = replaceAll(e, "\n", "\n> ");
    (n.value = "> " + o + "\n\n"), n.dispatchEvent(t);
    var i = document.querySelector("#post-comment").offsetTop;
    window.scrollTo(0, i - 80),
      n.focus(),
      n.setSelectionRange(-1, -1),
      document.getElementById("comment-tips") && document.getElementById("comment-tips").classList.add("show");
  },
  initIndexEssay: function () {
    setTimeout(() => {
      let essay_bar_swiper = new Swiper(".essay_bar_swiper_container", {
        passiveListeners: true,
        direction: "vertical",
        loop: true,
        autoplay: {
          disableOnInteraction: true,
          delay: 3000,
        },
        mousewheel: true,
      });

      let essay_bar_comtainer = document.getElementById("bbtalk");
      if (essay_bar_comtainer !== null) {
        essay_bar_comtainer.onmouseenter = function () {
          essay_bar_swiper.autoplay.stop();
        };
        essay_bar_comtainer.onmouseleave = function () {
          essay_bar_swiper.autoplay.start();
        };
      }
    }, 100);
  },
};

anzhiyu.initIndexEssay();
anzhiyu.changeTimeInEssay();
anzhiyu.reflashEssayWaterFall();


// universe.js
function dark() {window.requestAnimationFrame=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame;var n,e,i,h,t=.05,s=document.getElementById("universe"),o=!0,a="180,184,240",r="226,225,142",d="226,225,224",c=[];function f(){n=window.innerWidth,e=window.innerHeight,i=.216*n,s.setAttribute("width",n),s.setAttribute("height",e)}function u(){h.clearRect(0,0,n,e);for(var t=c.length,i=0;i<t;i++){var s=c[i];s.move(),s.fadeIn(),s.fadeOut(),s.draw()}}function y(){this.reset=function(){this.giant=m(3),this.comet=!this.giant&&!o&&m(10),this.x=l(0,n-10),this.y=l(0,e),this.r=l(1.1,2.6),this.dx=l(t,6*t)+(this.comet+1-1)*t*l(50,120)+2*t,this.dy=-l(t,6*t)-(this.comet+1-1)*t*l(50,120),this.fadingOut=null,this.fadingIn=!0,this.opacity=0,this.opacityTresh=l(.2,1-.4*(this.comet+1-1)),this.do=l(5e-4,.002)+.001*(this.comet+1-1)},this.fadeIn=function(){this.fadingIn&&(this.fadingIn=!(this.opacity>this.opacityTresh),this.opacity+=this.do)},this.fadeOut=function(){this.fadingOut&&(this.fadingOut=!(this.opacity<0),this.opacity-=this.do/2,(this.x>n||this.y<0)&&(this.fadingOut=!1,this.reset()))},this.draw=function(){if(h.beginPath(),this.giant)h.fillStyle="rgba("+a+","+this.opacity+")",h.arc(this.x,this.y,2,0,2*Math.PI,!1);else if(this.comet){h.fillStyle="rgba("+d+","+this.opacity+")",h.arc(this.x,this.y,1.5,0,2*Math.PI,!1);for(var t=0;t<30;t++)h.fillStyle="rgba("+d+","+(this.opacity-this.opacity/20*t)+")",h.rect(this.x-this.dx/4*t,this.y-this.dy/4*t-2,2,2),h.fill()}else h.fillStyle="rgba("+r+","+this.opacity+")",h.rect(this.x,this.y,this.r,this.r);h.closePath(),h.fill()},this.move=function(){this.x+=this.dx,this.y+=this.dy,!1===this.fadingOut&&this.reset(),(this.x>n-n/4||this.y<0)&&(this.fadingOut=!0)},setTimeout(function(){o=!1},50)}function m(t){return Math.floor(1e3*Math.random())+1<10*t}function l(t,i){return Math.random()*(i-t)+t}f(),window.addEventListener("resize",f,!1),function(){h=s.getContext("2d");for(var t=0;t<i;t++)c[t]=new y,c[t].reset();u()}(),function t(){document.getElementsByTagName('html')[0].getAttribute('data-theme')=='dark'&&u(),window.requestAnimationFrame(t)}()};
dark()

// 数字传输滚动效果
var CountUp = function (target, startVal, endVal, decimals, duration, options) {
  var self = this;
  self.version = function () {
    return "1.9.2";
  };
  self.options = {
    useEasing: true,
    useGrouping: true,
    separator: ",",
    decimal: ".",
    easingFn: easeOutExpo,
    formattingFn: formatNumber,
    prefix: "",
    suffix: "",
    numerals: [],
  };
  if (options && typeof options === "object") {
    for (var key in self.options) {
      if (options.hasOwnProperty(key) && options[key] !== null) {
        self.options[key] = options[key];
      }
    }
  }
  if (self.options.separator === "") {
    self.options.useGrouping = false;
  } else {
    self.options.separator = "" + self.options.separator;
  }
  var lastTime = 0;
  var vendors = ["webkit", "moz", "ms", "o"];
  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + "RequestAnimationFrame"];
    window.cancelAnimationFrame =
      window[vendors[x] + "CancelAnimationFrame"] || window[vendors[x] + "CancelRequestAnimationFrame"];
  }
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function (callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function () {
        callback(currTime + timeToCall);
      }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  }
  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function (id) {
      clearTimeout(id);
    };
  }
  function formatNumber(num) {
    num = num.toFixed(self.decimals);
    num += "";
    var x, x1, x2, x3, i, l;
    x = num.split(".");
    x1 = x[0];
    x2 = x.length > 1 ? self.options.decimal + x[1] : "";
    if (self.options.useGrouping) {
      x3 = "";
      for (i = 0, l = x1.length; i < l; ++i) {
        if (i !== 0 && i % 3 === 0) {
          x3 = self.options.separator + x3;
        }
        x3 = x1[l - i - 1] + x3;
      }
      x1 = x3;
    }
    if (self.options.numerals.length) {
      x1 = x1.replace(/[0-9]/g, function (w) {
        return self.options.numerals[+w];
      });
      x2 = x2.replace(/[0-9]/g, function (w) {
        return self.options.numerals[+w];
      });
    }
    return self.options.prefix + x1 + x2 + self.options.suffix;
  }
  function easeOutExpo(t, b, c, d) {
    return (c * (-Math.pow(2, (-10 * t) / d) + 1) * 1024) / 1023 + b;
  }
  function ensureNumber(n) {
    return typeof n === "number" && !isNaN(n);
  }
  self.initialize = function () {
    if (self.initialized) {
      return true;
    }
    self.error = "";
    self.d = typeof target === "string" ? document.getElementById(target) : target;
    if (!self.d) {
      self.error = "[CountUp] target is null or undefined";
      return false;
    }
    self.startVal = Number(startVal);
    self.endVal = Number(endVal);
    if (ensureNumber(self.startVal) && ensureNumber(self.endVal)) {
      self.decimals = Math.max(0, decimals || 0);
      self.dec = Math.pow(10, self.decimals);
      self.duration = Number(duration) * 1000 || 2000;
      self.countDown = self.startVal > self.endVal;
      self.frameVal = self.startVal;
      self.initialized = true;
      return true;
    } else {
      self.error = "[CountUp] startVal (" + startVal + ") or endVal (" + endVal + ") is not a number";
      return false;
    }
  };
  self.printValue = function (value) {
    var result = self.options.formattingFn(value);
    if (self.d.tagName === "INPUT") {
      this.d.value = result;
    } else {
      if (self.d.tagName === "text" || self.d.tagName === "tspan") {
        this.d.textContent = result;
      } else {
        this.d.innerHTML = result;
      }
    }
  };
  self.count = function (timestamp) {
    if (!self.startTime) {
      self.startTime = timestamp;
    }
    self.timestamp = timestamp;
    var progress = timestamp - self.startTime;
    self.remaining = self.duration - progress;
    if (self.options.useEasing) {
      if (self.countDown) {
        self.frameVal = self.startVal - self.options.easingFn(progress, 0, self.startVal - self.endVal, self.duration);
      } else {
        self.frameVal = self.options.easingFn(progress, self.startVal, self.endVal - self.startVal, self.duration);
      }
    } else {
      if (self.countDown) {
        self.frameVal = self.startVal - (self.startVal - self.endVal) * (progress / self.duration);
      } else {
        self.frameVal = self.startVal + (self.endVal - self.startVal) * (progress / self.duration);
      }
    }
    if (self.countDown) {
      self.frameVal = self.frameVal < self.endVal ? self.endVal : self.frameVal;
    } else {
      self.frameVal = self.frameVal > self.endVal ? self.endVal : self.frameVal;
    }
    self.frameVal = Math.round(self.frameVal * self.dec) / self.dec;
    self.printValue(self.frameVal);
    if (progress < self.duration) {
      self.rAF = requestAnimationFrame(self.count);
    } else {
      if (self.callback) {
        self.callback();
      }
    }
  };
  self.start = function (callback) {
    if (!self.initialize()) {
      return;
    }
    self.callback = callback;
    self.rAF = requestAnimationFrame(self.count);
  };
  self.pauseResume = function () {
    if (!self.paused) {
      self.paused = true;
      cancelAnimationFrame(self.rAF);
    } else {
      self.paused = false;
      delete self.startTime;
      self.duration = self.remaining;
      self.startVal = self.frameVal;
      requestAnimationFrame(self.count);
    }
  };
  self.reset = function () {
    self.paused = false;
    delete self.startTime;
    self.initialized = false;
    if (self.initialize()) {
      cancelAnimationFrame(self.rAF);
      self.printValue(self.startVal);
    }
  };
  self.update = function (newEndVal) {
    if (!self.initialize()) {
      return;
    }
    newEndVal = Number(newEndVal);
    if (!ensureNumber(newEndVal)) {
      self.error = "[CountUp] update() - new endVal is not a number: " + newEndVal;
      return;
    }
    self.error = "";
    if (newEndVal === self.frameVal) {
      return;
    }
    cancelAnimationFrame(self.rAF);
    self.paused = false;
    delete self.startTime;
    self.startVal = self.frameVal;
    self.endVal = newEndVal;
    self.countDown = self.startVal > self.endVal;
    self.rAF = requestAnimationFrame(self.count);
  };
  if (self.initialize()) {
    self.printValue(self.startVal);
  }
};

// 复制提醒
document.body.addEventListener("copy", (e => {
    "TEXTAREA" == e.target.tagName && "" == e.target.className || btf.snackbarShow("复制成功~")
}));

// 返回顶部显示网页阅读进度
window.onscroll = percent;// 执行函数
// 页面百分比
function percent() {
    let a = document.documentElement.scrollTop || window.pageYOffset, // 卷去高度
        b = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight) - document.documentElement.clientHeight, // 整个网页高度
        result = Math.round(a / b * 100), // 计算百分比
        up = document.querySelector("#go-up") // 获取按钮

    if (result <= 95) {
        up.childNodes[0].style.display = 'none'
        up.childNodes[1].style.display = 'block'
        up.childNodes[1].innerHTML = result;
    } else {
        up.childNodes[1].style.display = 'none'
        up.childNodes[0].style.display = 'block'
    }
}

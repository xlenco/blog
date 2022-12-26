// cw 自动更新配置
;(async (updateSWDelay, updateConfigDelay) => {
    const LSDB = {
        read: (key) => {
            return localStorage.getItem(key);
        },
        write: (key, value) => {
            localStorage.setItem(key, value);
        }
    }
    async function updateSW() {
        if (navigator.serviceWorker) {
            navigator.serviceWorker.getRegistrations().then(async registrations => {
                for (let registration of registrations) {
                    await registration.unregister();
                }
                console.log(`Unregistered service workers`);
            }).then(() => {
                //register new service worker in /cw.js
                navigator.serviceWorker.register('/cw.js').then(async registration => {
                    console.log(`Registered service worker`);
                    await registration.update();
                    LSDB.write('cw_time_sw', new Date().getTime());
                })
            })
        }
    };
    async function updateConfig() {
        await fetch('/cw-cgi/api?type=config').then(res => res.text()).then(res => {
            if (res === 'ok') {
                console.log(`Config updated`);
                LSDB.write('cw_time_config', new Date().getTime());
            } else {
                console.log(`Config update failed`);
            }
        })
    }

    if (Number(LSDB.read('cw_time_sw')) < new Date().getTime() - updateSWDelay) {
        await updateSW();
        await updateConfig();
    }
    if (Number(LSDB.read('cw_time_config')) < new Date().getTime() - updateConfigDelay) {
        await updateConfig();
    }

    setInterval(async () => {
        await updateSW();
        await updateConfig();
    }, updateSWDelay);
    setInterval(async () => {
        await updateConfig()
    }, updateConfigDelay);
})(1000 * 60 * 60 * 12, 1000 * 60);

// 浏览器动态标题
var OriginTitle = document.title;
var titleTime;
document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
        $('[rel="icon"]').attr('href', "/funny.ico");
        document.title = 'w(ﾟДﾟ)w 不要走鸭！再看看吧！！';
        clearTimeout(titleTime);
    }
    else {
        $('[rel="icon"]').attr('href', "/favicon.ico");
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

//重定向浏览器地址
pjax.site_handleResponse = pjax.handleResponse;
pjax.handleResponse = function(responseText, request, href, options){
  Object.defineProperty(request,'responseURL',{
    value: href
  });
  pjax.site_handleResponse(responseText,request,href,options);
}

// algolia 窗口自适应
searchSize();
window.addEventListener('resize', searchSize)
// 搜索窗口自适应
function searchSize() {
    // 只需要适应手机端
    if (document.body.clientWidth > 768) return
    let div = document.querySelector('#algolia-hits')
    // 监听插入，如果有插入则根据可视高度动态设置最大高度
    div.addEventListener('DOMNodeInserted', () => {
        div.children[0].style.maxHeight = (document.documentElement.clientHeight - 210) + 'px'
    })
}

// Load Awesome
!function(w,C,S){"use strict";!function o(a,r,s){function l(n,e){if(!r[n]){if(!a[n]){var t="function"==typeof require&&require;if(!e&&t)return t(n,!0);if(i)return i(n,!0);e=new Error("Cannot find module '"+n+"'");throw e.code="MODULE_NOT_FOUND",e}t=r[n]={exports:{}};a[n][0].call(t.exports,function(e){var t=a[n][1][e];return l(t||e)},t,t.exports,o,a,r,s)}return r[n].exports}for(var i="function"==typeof require&&require,e=0;e<s.length;e++)l(s[e]);return l}({1:[function(e,t,n){function o(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(n,"__esModule",{value:!0});var c,d,a,f,p=e("./modules/handle-dom"),m=e("./modules/utils"),y=e("./modules/handle-swal-dom"),v=e("./modules/handle-click"),h=o(e("./modules/handle-key")),b=o(e("./modules/default-params")),g=o(e("./modules/set-params"));n.default=a=f=function(){var t=arguments[0];function e(e){return(t[e]===S?b.default:t)[e]}if(p.addClass(C.body,"stop-scrolling"),y.resetInput(),t===S)return m.logStr("SweetAlert expects at least 1 attribute!"),!1;var n=m.extend({},b.default);switch(typeof t){case"string":n.title=t,n.text=arguments[1]||"",n.type=arguments[2]||"";break;case"object":if(t.title===S)return m.logStr('Missing "title" argument!'),!1;for(var o in n.title=t.title,b.default)n[o]=e(o);n.confirmButtonText=n.showCancelButton?"Confirm":b.default.confirmButtonText,n.confirmButtonText=e("confirmButtonText"),n.doneFunction=arguments[1]||null;break;default:return m.logStr('Unexpected type of argument! Expected "string" or "object", got '+typeof t),!1}g.default(n),y.fixVerticalPosition(),y.openModal(arguments[1]);for(var a=y.getModal(),r=a.querySelectorAll("button"),s=["onclick","onmouseover","onmouseout","onmousedown","onmouseup","onfocus"],l=function(e){return v.handleButton(e,n,a)},i=0;i<r.length;i++)for(var u=0;u<s.length;u++)r[i][s[u]]=l;y.getOverlay().onclick=l,c=w.onkeydown;w.onkeydown=function(e){return h.default(e,n,a)},w.onfocus=function(){setTimeout(function(){d!==S&&(d.focus(),d=S)},0)},f.enableButtons()},a.setDefaults=f.setDefaults=function(e){if(!e)throw new Error("userParams is required");if("object"!=typeof e)throw new Error("userParams has to be a object");m.extend(b.default,e)},a.close=f.close=function(){var t=y.getModal(),e=(p.fadeOut(y.getOverlay(),5),p.fadeOut(t,5),p.removeClass(t,"showSweetAlert"),p.addClass(t,"hideSweetAlert"),p.removeClass(t,"visible"),t.querySelector(".sa-icon.sa-success")),e=(p.removeClass(e,"animate"),p.removeClass(e.querySelector(".sa-tip"),"animateSuccessTip"),p.removeClass(e.querySelector(".sa-long"),"animateSuccessLong"),t.querySelector(".sa-icon.sa-error")),e=(p.removeClass(e,"animateErrorIcon"),p.removeClass(e.querySelector(".sa-x-mark"),"animateXMark"),t.querySelector(".sa-icon.sa-warning"));return p.removeClass(e,"pulseWarning"),p.removeClass(e.querySelector(".sa-body"),"pulseWarningIns"),p.removeClass(e.querySelector(".sa-dot"),"pulseWarningIns"),setTimeout(function(){var e=t.getAttribute("data-custom-class");p.removeClass(t,e)},300),p.removeClass(C.body,"stop-scrolling"),w.onkeydown=c,w.previousActiveElement&&w.previousActiveElement.focus(),d=S,clearTimeout(t.timeout),!0},a.showInputError=f.showInputError=function(e){var t=y.getModal(),n=t.querySelector(".sa-input-error"),n=(p.addClass(n,"show"),t.querySelector(".sa-error-container"));p.addClass(n,"show"),n.querySelector("p").innerHTML=e,setTimeout(function(){a.enableButtons()},1),t.querySelector("input").focus()},a.resetInputError=f.resetInputError=function(e){if(e&&13===e.keyCode)return!1;var e=y.getModal(),t=e.querySelector(".sa-input-error"),t=(p.removeClass(t,"show"),e.querySelector(".sa-error-container"));p.removeClass(t,"show")},a.disableButtons=f.disableButtons=function(e){var t=y.getModal(),n=t.querySelector("button.confirm"),t=t.querySelector("button.cancel");n.disabled=!0,t.disabled=!0},a.enableButtons=f.enableButtons=function(e){var t=y.getModal(),n=t.querySelector("button.confirm"),t=t.querySelector("button.cancel");n.disabled=!1,t.disabled=!1},void 0!==w?w.sweetAlert=w.swal=a:m.logStr("SweetAlert is a frontend module!"),t.exports=n.default},{"./modules/default-params":2,"./modules/handle-click":3,"./modules/handle-dom":4,"./modules/handle-key":5,"./modules/handle-swal-dom":6,"./modules/set-params":8,"./modules/utils":9}],2:[function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0});n.default={title:"",text:"",type:null,allowOutsideClick:!1,showConfirmButton:!0,showCancelButton:!1,closeOnConfirm:!0,closeOnCancel:!0,confirmButtonText:"OK",confirmButtonColor:"#8CD4F5",cancelButtonText:"Cancel",imageUrl:null,imageSize:null,timer:null,customClass:"",html:!1,animation:!0,allowEscapeKey:!0,inputType:"text",inputPlaceholder:"",inputValue:"",showLoaderOnConfirm:!1},t.exports=n.default},{}],3:[function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0});function m(e,t){var n=!0;h.hasClass(e,"show-input")&&(n=(n=e.querySelector("input").value)||""),t.doneFunction(n),t.closeOnConfirm&&sweetAlert.close(),t.showLoaderOnConfirm&&sweetAlert.disableButtons()}function y(e,t){var n=String(t.doneFunction).replace(/\s/g,"");"function("===n.substring(0,9)&&")"!==n.substring(9,10)&&t.doneFunction(!1),t.closeOnCancel&&sweetAlert.close()}var v=e("./utils"),h=(e("./handle-swal-dom"),e("./handle-dom"));n.default={handleButton:function(e,t,n){var o,a,r,e=e||w.event,s=e.target||e.srcElement,l=-1!==s.className.indexOf("confirm"),i=-1!==s.className.indexOf("sweet-overlay"),u=h.hasClass(n,"visible"),c=t.doneFunction&&"true"===n.getAttribute("data-has-done-function");function d(e){l&&t.confirmButtonColor&&(s.style.backgroundColor=e)}switch(l&&t.confirmButtonColor&&(o=t.confirmButtonColor,a=v.colorLuminance(o,-.04),r=v.colorLuminance(o,-.14)),e.type){case"mouseover":d(a);break;case"mouseout":d(o);break;case"mousedown":d(r);break;case"mouseup":d(a);break;case"focus":var f=n.querySelector("button.confirm"),p=n.querySelector("button.cancel");l?p.style.boxShadow="none":f.style.boxShadow="none";break;case"click":p=n===s,f=h.isDescendant(n,s);if(!p&&!f&&u&&!t.allowOutsideClick)break;l&&c&&u?m(n,t):c&&u||i?y(0,t):h.isDescendant(n,s)&&"BUTTON"===s.tagName&&sweetAlert.close()}},handleConfirm:m,handleCancel:y},t.exports=n.default},{"./handle-dom":4,"./handle-swal-dom":6,"./utils":9}],4:[function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0});function o(e,t){return new RegExp(" "+t+" ").test(" "+e.className+" ")}function a(e){e.style.opacity="",e.style.display="block"}function r(e){e.style.opacity="",e.style.display="none"}n.hasClass=o,n.addClass=function(e,t){o(e,t)||(e.className+=" "+t)},n.removeClass=function(e,t){var n=" "+e.className.replace(/[\t\r\n]/g," ")+" ";if(o(e,t)){for(;0<=n.indexOf(" "+t+" ");)n=n.replace(" "+t+" "," ");e.className=n.replace(/^\s+|\s+$/g,"")}},n.escapeHtml=function(e){var t=C.createElement("div");return t.appendChild(C.createTextNode(e)),t.innerHTML},n._show=a,n.show=function(e){if(e&&!e.length)return a(e);for(var t=0;t<e.length;++t)a(e[t])},n._hide=r,n.hide=function(e){if(e&&!e.length)return r(e);for(var t=0;t<e.length;++t)r(e[t])},n.isDescendant=function(e,t){for(var n=t.parentNode;null!==n;){if(n===e)return!0;n=n.parentNode}return!1},n.getTopMargin=function(e){e.style.left="-9999px",e.style.display="block";var t=e.clientHeight,n="undefined"!=typeof getComputedStyle?parseInt(getComputedStyle(e).getPropertyValue("padding-top"),10):parseInt(e.currentStyle.padding);return e.style.left="",e.style.display="none","-"+parseInt((t+n)/2)+"px"},n.fadeIn=function(e,t){var n,o,a;function r(){return a.apply(this,arguments)}+e.style.opacity<1&&(t=t||16,e.style.opacity=0,e.style.display="block",n=+new Date,a=function(){e.style.opacity=+e.style.opacity+(new Date-n)/100,n=+new Date,+e.style.opacity<1&&setTimeout(o,t)},r.toString=function(){return a.toString()},(o=r)()),e.style.display="block"},n.fadeOut=function(e,t){t=t||16,e.style.opacity=1;var n,o=+new Date,a=(n=function(){e.style.opacity=+e.style.opacity-(new Date-o)/100,o=+new Date,0<+e.style.opacity?setTimeout(a,t):e.style.display="none"},r.toString=function(){return n.toString()},r);function r(){return n.apply(this,arguments)}a()},n.fireClick=function(e){var t;"function"==typeof MouseEvent?(t=new MouseEvent("click",{view:w,bubbles:!1,cancelable:!0}),e.dispatchEvent(t)):C.createEvent?((t=C.createEvent("MouseEvents")).initEvent("click",!1,!1),e.dispatchEvent(t)):C.createEventObject?e.fireEvent("onclick"):"function"==typeof e.onclick&&e.onclick()},n.stopEventPropagation=function(e){"function"==typeof e.stopPropagation?(e.stopPropagation(),e.preventDefault()):w.event&&w.event.hasOwnProperty("cancelBubble")&&(w.event.cancelBubble=!0)}},{}],5:[function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0});var c=e("./handle-dom"),d=e("./handle-swal-dom");n.default=function(e,t,n){var e=e||w.event,o=e.keyCode||e.which,a=n.querySelector("button.confirm"),r=n.querySelector("button.cancel"),s=n.querySelectorAll("button[tabindex]");if(-1!==[9,13,32,27].indexOf(o)){for(var l=e.target||e.srcElement,i=-1,u=0;u<s.length;u++)if(l===s[u]){i=u;break}9===o?(l=-1===i?a:i===s.length-1?s[0]:s[i+1],c.stopEventPropagation(e),l.focus(),t.confirmButtonColor&&d.setFocusStyle(l,t.confirmButtonColor)):13===o?"INPUT"===l.tagName&&(l=a).focus():27===o&&!0===t.allowEscapeKey&&c.fireClick(l=r,e)}},t.exports=n.default},{"./handle-dom":4,"./handle-swal-dom":6}],6:[function(e,t,n){function o(e){return e&&e.__esModule?e:{default:e}}function a(){var e=C.createElement("div");for(e.innerHTML=u.default;e.firstChild;)C.body.appendChild(e.firstChild)}Object.defineProperty(n,"__esModule",{value:!0});var r,s=e("./utils"),l=e("./handle-dom"),i=o(e("./default-params")),u=o(e("./injected-html")),c=(r=function(){var e=C.querySelector(".sweet-alert");return e||(a(),e=c()),e},d.toString=function(){return r.toString()},d);function d(){return r.apply(this,arguments)}function f(){var e=c();if(e)return e.querySelector("input")}function p(){return C.querySelector(".sweet-overlay")}function m(e){if(e&&13===e.keyCode)return!1;var t=(e=c()).querySelector(".sa-input-error"),t=(l.removeClass(t,"show"),e.querySelector(".sa-error-container"));l.removeClass(t,"show")}n.sweetAlertInitialize=a,n.getModal=c,n.getOverlay=p,n.getInput=f,n.setFocusStyle=function(e,t){t=s.hexToRgb(t);e.style.boxShadow="0 0 2px rgba("+t+", 0.8), inset 0 0 0 1px rgba(0, 0, 0, 0.05)"},n.openModal=function(e){var t=c();l.fadeIn(p(),10),l.show(t),l.addClass(t,"showSweetAlert"),l.removeClass(t,"hideSweetAlert"),w.previousActiveElement=C.activeElement;t.querySelector("button.confirm").focus(),setTimeout(function(){l.addClass(t,"visible")},500);var n,o=t.getAttribute("data-timer");"null"!==o&&""!==o&&(n=e,t.timeout=setTimeout(function(){(n?"true"===t.getAttribute("data-has-done-function"):null)?n(null):sweetAlert.close()},o))},n.resetInput=function(){var e=c(),t=f();l.removeClass(e,"show-input"),t.value=i.default.inputValue,t.setAttribute("type",i.default.inputType),t.setAttribute("placeholder",i.default.inputPlaceholder),m()},n.resetInputError=m,n.fixVerticalPosition=function(){c().style.marginTop=l.getTopMargin(c())}},{"./default-params":2,"./handle-dom":4,"./injected-html":7,"./utils":9}],7:[function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0});n.default='<div class="sweet-overlay" tabIndex="-1"></div><div class="sweet-alert"><div class="sa-icon sa-error">\n      <span class="sa-x-mark">\n        <span class="sa-line sa-left"></span>\n        <span class="sa-line sa-right"></span>\n      </span>\n    </div><div class="sa-icon sa-warning">\n      <span class="sa-body"></span>\n      <span class="sa-dot"></span>\n    </div><div class="sa-icon sa-info"></div><div class="sa-icon sa-success">\n      <span class="sa-line sa-tip"></span>\n      <span class="sa-line sa-long"></span>\n\n      <div class="sa-placeholder"></div>\n      <div class="sa-fix"></div>\n    </div><div class="sa-icon sa-custom"></div><h2>Title</h2>\n    <p>Text</p>\n    <fieldset>\n      <input type="text" tabIndex="3" />\n      <div class="sa-input-error"></div>\n    </fieldset><div class="sa-error-container">\n      <div class="icon">!</div>\n      <p>Not valid!</p>\n    </div><div class="sa-button-container">\n      <button class="cancel" tabIndex="2">Cancel</button>\n      <div class="sa-confirm-button-container">\n        <button class="confirm" tabIndex="1">OK</button><div class="la-ball-fall">\n          <div></div>\n          <div></div>\n          <div></div>\n        </div>\n      </div>\n    </div></div>',t.exports=n.default},{}],8:[function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0});var u=e("./utils"),c=e("./handle-swal-dom"),d=e("./handle-dom"),f=["error","warning","info","success","input","prompt"];n.default=function(a){var e,t,r=c.getModal(),n=r.querySelector("h2"),o=r.querySelector("p"),s=r.querySelector("button.cancel"),l=r.querySelector("button.confirm");if(n.innerHTML=a.html?a.title:d.escapeHtml(a.title).split("\n").join("<br>"),o.innerHTML=a.html?a.text:d.escapeHtml(a.text||"").split("\n").join("<br>"),a.text&&d.show(o),a.customClass?(d.addClass(r,a.customClass),r.setAttribute("data-custom-class",a.customClass)):(n=r.getAttribute("data-custom-class"),d.removeClass(r,n),r.setAttribute("data-custom-class","")),d.hide(r.querySelectorAll(".sa-icon")),a.type&&!u.isIE8()){var o=function(){for(var e=!1,t=0;t<f.length;t++)if(a.type===f[t]){e=!0;break}if(!e)return logStr("Unknown alert type: "+a.type),{v:!1};var n=S,o=(-1!==["success","error","warning","info"].indexOf(a.type)&&(n=r.querySelector(".sa-icon.sa-"+a.type),d.show(n)),c.getInput());switch(a.type){case"success":d.addClass(n,"animate"),d.addClass(n.querySelector(".sa-tip"),"animateSuccessTip"),d.addClass(n.querySelector(".sa-long"),"animateSuccessLong");break;case"error":d.addClass(n,"animateErrorIcon"),d.addClass(n.querySelector(".sa-x-mark"),"animateXMark");break;case"warning":d.addClass(n,"pulseWarning"),d.addClass(n.querySelector(".sa-body"),"pulseWarningIns"),d.addClass(n.querySelector(".sa-dot"),"pulseWarningIns");break;case"input":case"prompt":o.setAttribute("type",a.inputType),o.value=a.inputValue,o.setAttribute("placeholder",a.inputPlaceholder),d.addClass(r,"show-input"),setTimeout(function(){o.focus(),o.addEventListener("keyup",swal.resetInputError)},400)}}();if("object"==typeof o)return o.v}a.imageUrl&&((n=r.querySelector(".sa-icon.sa-custom")).style.backgroundImage="url("+a.imageUrl+")",d.show(n),e=o=80,a.imageSize&&(i=(t=a.imageSize.toString().split("x"))[0],t=t[1],i&&t?(o=i,e=t):logStr("Parameter imageSize expects value with format WIDTHxHEIGHT, got "+a.imageSize)),n.setAttribute("style",n.getAttribute("style")+"width:"+o+"px; height:"+e+"px")),r.setAttribute("data-has-cancel-button",a.showCancelButton),a.showCancelButton?s.style.display="inline-block":d.hide(s),r.setAttribute("data-has-confirm-button",a.showConfirmButton),a.showConfirmButton?l.style.display="inline-block":d.hide(l),a.cancelButtonText&&(s.innerHTML=d.escapeHtml(a.cancelButtonText)),a.confirmButtonText&&(l.innerHTML=d.escapeHtml(a.confirmButtonText)),a.confirmButtonColor&&(l.style.backgroundColor=a.confirmButtonColor,l.style.borderLeftColor=a.confirmLoadingButtonColor,l.style.borderRightColor=a.confirmLoadingButtonColor,c.setFocusStyle(l,a.confirmButtonColor)),r.setAttribute("data-allow-outside-click",a.allowOutsideClick);var i=!!a.doneFunction;r.setAttribute("data-has-done-function",i),a.animation?"string"==typeof a.animation?r.setAttribute("data-animation",a.animation):r.setAttribute("data-animation","pop"):r.setAttribute("data-animation","none"),r.setAttribute("data-timer",a.timer)},t.exports=n.default},{"./handle-dom":4,"./handle-swal-dom":6,"./utils":9}],9:[function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0});n.extend=function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);return e},n.hexToRgb=function(e){e=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return e?parseInt(e[1],16)+", "+parseInt(e[2],16)+", "+parseInt(e[3],16):null},n.isIE8=function(){return w.attachEvent&&!w.addEventListener},n.logStr=function(e){w.console&&w.console.log("SweetAlert: "+e)},n.colorLuminance=function(e,t){(e=String(e).replace(/[^0-9a-f]/gi,"")).length<6&&(e=e[0]+e[0]+e[1]+e[1]+e[2]+e[2]),t=t||0;for(var n,o="#",a=0;a<3;a++)n=parseInt(e.substr(2*a,2),16),o+=("00"+(n=Math.round(Math.min(Math.max(0,n+n*t),255)).toString(16))).substr(n.length);return o}},{}]},{},[1]),"function"==typeof define&&define.amd?define(function(){return sweetAlert}):"undefined"!=typeof module&&module.exports&&(module.exports=sweetAlert)}(window,document);
// Load Awesome 配置
function welcome(){
    let welcome_text = '欢迎光顾 Xlencoの小窝~'
    if(document.referrer!==''){
        let referrer=document.referrer.split("/")[2];
        welcome_text="欢迎你，来自"+referrer.toUpperCase()+"的用户！";
        if(referrer.toUpperCase()==document.domain.toUpperCase())return;
    }
    swal({
        title: " 欢迎！",
     //   text: welcome_text+'\n打开页面下方音乐以获得更佳体验！',
        imageUrl: "/img/head.webp",
        timer: 3000,
        showConfirmButton: false
    });
}
$(document).ready(()=>{
    welcome()
})


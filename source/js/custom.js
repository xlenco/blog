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



/**网站提示区 */
function welcome_mes() {
  if (navigator.userAgent.match(/edg/i)) {
    var we_mes = 'Edge';
  }
  /**社交软件检测 */
  else if (navigator.userAgent.match(/weixin/i)) {
    var we_mes = '微信';
  } else if (navigator.userAgent.match(/ks/i)) {
    var we_mes = '快手';
  } else if (navigator.userAgent.match(/weibo/i)) {
    var we_mes = '微博';
  } else if (navigator.userAgent.match(/dy/i)) {
    var we_mes = '抖音';
  }
  /**手机厂商浏览器检测区域 */
  else if (navigator.userAgent.match(/heytapbrowser/i)) {
    var we_mes = 'OPPO浏览器';
  } else if (navigator.userAgent.match(/vivobrowser/i)) {
    var we_mes = 'VIVO浏览器';
  } else if (navigator.userAgent.match(/HBPC/i) || navigator.userAgent.match(/huaweibrowser/i)) {
    var we_mes = '华为浏览器';
  } else if (navigator.userAgent.match(/iphone/i) && navigator.userAgent.match(/mac/i)) {
    var we_mes = '苹果设备';
  }

  /**第三方浏览器检测区域 */
  else if (navigator.userAgent.match(/quark/i)) {
    var we_mes = '夸克浏览器';
  } else if (navigator.userAgent.match(/firefox/i)) {
    var we_mes = '火狐浏览器';
  } else if (navigator.userAgent.match(/ucbrowser/i)) {
    var we_mes = 'UC浏览器';
  } else if (navigator.userAgent.match(/baidubox/i)) {
    var we_mes = '百度浏览器';
  } else if (navigator.userAgent.match(/opr/i)) {
    var we_mes = 'Opera浏览器';
  }
  /**else if(navigator.userAgent.match(/360/i)){ var we_mes = '360浏览器';}因多次查证，360浏览器并不包含特有信息，无法查证*/
  else if (navigator.userAgent.match(/qq/i)) {
    var we_mes = 'QQ浏览器';
  } else if (navigator.userAgent.match(/chrome/i)) {
    var we_mes = 'Chrome浏览器';
  }

 

  /**来源检测 */
  var we_link = document.referrer;
  if (we_link.match(/baidu/i)) {
    var welcome_link = '百度'
  } else if (we_link.match(/sougou/i)) {
    var welcome_link = '搜狗'
  } else if (we_link.match(/weixin/i)) {
    var welcome_link = '微信'
  } else if (we_link.match(/qq/i)) {
    var welcome_link = 'qq'
  } else if (we_link.match(/zhihu/i)) {
    var welcome_link = '知乎'
  } else if (we_link.match(/google/i)) {
    var welcome_link = '谷歌'
  } else if (we_link.match(/bing/i)) {
    var welcome_link = '必应'
  } else if (we_link.match(/so/i)) {
    var welcome_link = '360'
  } else if (we_link.match(/weibo/i)) {
    var welcome_link = '微博'
  } else if (we_link.match(/t.co/i)) {
    var welcome_link = '推特'
  } else if (we_link.match(/sougou/i)) {
    var welcome_link = '搜狗'
  } else if (we_link.match(/toutiao/i)) {
    var welcome_link = '今日头条'
  } else {
    var welcome_link = '远方'
  }
  if (getCookie("welcome") == '') {
    btf.snackbarShow("你好啊，来自" + ip_mess + "的朋友，您使用" + we_mes + "从" + welcome_link + "赶来", !1, 3e3);
    console.info(ip_mess+we_mes+we_link)
    setCookie("welcome", 1, "/");
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

// 即可短文导航页轮播
if (document.querySelector('#bber-talk')) {
      var swiper = new Swiper('.swiper-container', {
        direction: 'vertical', // 垂直切换选项
        loop: true,
        autoplay: {
        delay: 3000,
        pauseOnMouseEnter: true
      },
      });
    }

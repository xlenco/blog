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
    btf.snackbarShow("本页链接已复制到剪切板，快去分享吧~")
}


// 返回顶部 显示网页阅读进度
window.onscroll = percent;// 执行函数
// 页面百分比
function percent() {
    let a = document.documentElement.scrollTop || window.pageYOffset, // 卷去高度
        b = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight) - document.documentElement.clientHeight, // 整个网页高度 减去 可视高度
        result = Math.round(a / b * 100), // 计算百分比
        btn = document.querySelector("#percent"); // 获取图标

        result<=99||(result=99),btn.innerHTML=result
}

document.getElementById("page-name").innerText=document.title.split(" |Xlenco")[0];

// cardLink
// cardLink.server = 'https://api.allorigins.win/raw?url='
cardLink(document.querySelectorAll('article a[target=cardlink]'))


// 开往
function totraveling() {
  btf.snackbarShow('即将跳转到「开往」项目的成员博客，不保证跳转网站的安全性和可用性', !1, 5000)
  setTimeout(function () {
    window.open('https://travellings.cn/');
  }, '5000');
}

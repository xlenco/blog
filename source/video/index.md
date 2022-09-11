---
date: 2022-09-11 021:29:14
title: 视频解析
updated: 2022-09-11 021:29:14
aside: false
---
<html lang="zh-cn">
  <head>
    <style type="text/css">
      .video_div{ width:100%; height:645px;border-radius:5px;}
      @media screen and (max-width: 768px){.wiui01{width:100%; height:200px;}}}
      .input-group-addon{padding: 6px 12px; font-size: 14px; font-weight: 400; line-height: 1; color: #555; text-align: center; background-color: #eee; border-radius: 4px;border: #ccc;}
    </style>
    <script type="text/javascript">
      eval(
        (function (p, a, c, k, e, d) {
          e = function (c) {
            return (
              (c < a ? "" : e(parseInt(c / a))) +
              ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36))
            );
          };
          if (!"".replace(/^/, String)) {
            while (c--) d[e(c)] = k[c] || e(c);
            k = [
              function (e) {
                return d[e];
              },
            ];
            e = function () {
              return "\\w+";
            };
            c = 1;
          }
          while (c--)
            if (k[c])
              p = p.replace(new RegExp("\\b" + e(c) + "\\b", "g"), k[c]);
          return p;
        })(
          'b a(){0 6=1.2("9").4;0 5=1.2("3");0 3=1.2("3").c;0 8=5.e[3].4;0 7=1.2("f");7.d=8+6}',
          16,
          16,
          "var|document|getElementById|jk|value|jkurl|diz|cljurl|jkv|url|dihejk|function|selectedIndex|src|options|player".split(
            "|"
          ),
          0,
          {}
        )
      );
      function dihejk2() {
        var diz = document.getElementById("url").value;
        var jkurl = document.getElementById("jk");
        var jk = document.getElementById("jk").selectedIndex;
        var jkv = jkurl.options[jk].value;
        var cljurl = document.getElementById("player");
        window.open(jkv + diz, "_blank");
      }
    </script>
  </head>
  <body>
    <br />
    <div class="col-md-14 column">
      <div id="kj">
        <iframe
          class="video_div"
          style="background-image: url('https://s2.loli.net/2022/07/21/OjDFZJUHX8stBNx.png');background-size: 100%;"
          id="player"
          allowtransparency="true"
          allowfullscreen="true"
          frameborder="0"
          scrolling="no"
          name="player"
        ></iframe>
      </div>
      <script type="text/javascript">
        if (navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)) {
          document.getElementById("sdfdf").style.display = "block";
        }
      </script>
    </div>
    <div class="col-md-14 column">
      <div class="input-group" style="width: 100%;">
        <span class="input-group-addon">选择接口</span>
        <select class="form-control" id="jk">
          <option value="https://jx.zui.cm/?url" selected="">线路1</option>
          <option value="https://jx.playerjy.com/?url=" selected="">
            线路2
          </option>
          <option value="https://jx.yunjuw.cn/?url=" selected="">线路3</option>
          <option value="https://jx1.aiyingshis.com/?url=" selected="">
            线路4
          </option>
        </select>
      </div>
      <br />
      <div class="input-group" style="width: 100%;">
        <span class="input-group-addon">播放地址</span>
        <input
          class="form-control"
          type="search"
          placeholder="电脑使用Ctrl+V粘贴网址-手机直接长按粘贴网址"
          id="url"
        />
      </div>
      <br />
      <div>
        <button
          id="bf"
          type="button"
          class="btn btn-info btn-block"
          onclick="dihejk()"
        >
          开始解析
        </button>
        <button
          id="bf"
          type="button"
          class="btn btn-warning btn-block"
          onclick="dihejk2()"
        >
          全屏播放
        </button>
      </div>
    </div>
    <!--公告-->
    <script type="text/javascript">
      $(function () {
        function getNowFormatDate() {
          var date = new Date();
          var month = date.getMonth() + 1;
          var strDate = date.getDate();
          var currentdate = month + "月" + strDate + "日";
          return currentdate;
        }
        var text = ["本站不保存任何视频。所有资源来自于网络！！！"],
          content = "";
        for (var i = 0; i < text.length; i++) {
          content += i + 1 + ". " + text[i] + "\n";
        }
        setTimeout(function () {
          swal(getNowFormatDate() + "通知", content, "success");
        }, 1000);
      });
    </script>
  </body>
</html>

// 链接替换即可，不需要后面的参数
fetch("https://v6-widget.51.la/v6/JoywpzUzxGI1YNEp/quote.js")
  .then(res => res.text())
  .then(data => {
    let title = ["最近活跃", "今日人数", "今日访问", "昨日人数", "昨日访问", "本月访问", "总访问量"];
    // let num = data.match(/(?<=<\/span><span>).*?(?=<\/span><\/p>)/g)
    let num = data.match(/(<\/span><span>).*?(\/span><\/p>)/g);

    num = num.map(el => {
      let val = el.replace(/(<\/span><span>)/g, "");
      let str = val.replace(/(<\/span><\/p>)/g, "");
      return str;
    });
    let s = document.getElementById("statistic");
    // 自定义不显示哪个或者显示哪个，如下为不显示 最近活跃访客 和 总访问量
    let statistic = [];
    for (let i = 0; i < num.length; i++) {
      if (i == 0 || i == num.length - 1) continue;
      s.innerHTML += "<div><span>" + title[i] + "</span><span id=" + title[i] + ">" + num[i] + "</span></div>";
      queueMicrotask(() => {
        statistic.push(new CountUp(title[i], 0, num[i], 0, 2, CountUpOptions));
      });
    }
  });
  // 滚动
  var pursuitInterval = null;
  pursuitInterval = setInterval(function () {
    const show = document.querySelector('span[data-show]')
    const next = show.nextElementSibling || document.querySelector('.first-tips')
    const up = document.querySelector('span[data-up]')
    if (up) {
      up.removeAttribute('data-up')
    }
    show.removeAttribute('data-show')
    show.setAttribute('data-up', '')
    next.setAttribute('data-show', '')
  }, 2000)
  document.addEventListener('pjax:send', function(){
  clearInterval(pursuitInterval);
});

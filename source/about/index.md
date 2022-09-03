---
date: 2022-04-16 14:12:45
title: 关于窝
updated: 2022-09-03 21:26:39
---

博主个人介绍:
悲催学生党一枚。为什么要建博客？因为博主的爱好是搜集，记录。
### 访问统计
<div id="statistic">
<div class="content"></div>
<span style="font-size:14px">流量统计支持：<a style="color:#1690ff;" href="https://v6.51.la/">51la</a></span>
</div>

<!-- js -->
<script>
// 链接替换即可，不需要后面的参数
fetch('https://v6-widget.51.la/v6/JmsRdzV6syTLtUyn/quote.js').then(res => res.text()).then((data) => {
    let title = ['最近活跃访客', '今日人数', '今日访问', '昨日人数', '昨日访问', '本月访问', '总访问量']
    let num = data.match(/(?<=<\/span><span>).*?(?=<\/span><\/p>)/g)
    let order = [1, 3, 2, 4, 5] // 新增  可排序，如果需要隐藏则删除对应数字即可。
    // 示例：[1, 3, 2, 4, 5] 显示 ['今日人数', '昨日人数', '今日访问', '昨日访问', '本月访问']，不显示 最近活跃访客(0) 和 总访问量(6)
    for (let i = 0; i < order.length; i++) { document.querySelectorAll('#statistic .content')[0].innerHTML += '<div><span>' + title[order[i]] + '</span><span class="num">' + num[order[i]] + '</span></div>' }
});

// 老版本
// for (let i = 0; i < num.length; i++) {
//      // 自定义不显示哪个或者显示哪个，如下为不显示 最近活跃访客 和 总访问量
//     if (i == 0 || i == num.length - 1) continue;
//     s.innerHTML += '<div><span>' + title[i] + '</span><span class="num">' + num[i] + '</span></div>'
// }
// 
</script>

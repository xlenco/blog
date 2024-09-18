---
menu_id: friends
title: 友链
date: 2022-05-03 21:21:51
---

{% friends api:https://github.moeyy.xyz/https://raw.githubusercontent.com/xlenco/blog-friends/output/v2/data.json %}

{% box [2023-12] 友链失联了怎么办? %}
添加友链后如果网站长期无法访问，可能会被取消友链！如果您的网站恢复了，可以在申请友链时创建的那条 [issue](https://github.com/xlenco/blog-friends/issues) 中评论告知。
{% endbox %}




{% quot icon:hashtag 如何交换友链？ %}

1. 您的网站应满足以下全部条件：
- **安全合规**：合法的、非营利性、无木马植入的 HTTPS 站点。
- **非空壳网站**：网站内发布至少 {% mark 五篇 %} 原创文章，内容题材不限。

2. 我们需要有一定的有效互动：
- **先友后链**：与博主有至少 {% mark 半年 %} 的有效互动，例如 issue 或者评论留言。

{% box [2023-12] 友链申请条件变更说明 %}
1. 降低了对商业广告的要求，可以有但是不能太多。
2. 提高了「有效互动」的定义：5次更改为半年。
{% endbox %}

{% folding 我已满足全部条件，快告诉我如何交换友链！<img no-lazy style="display:inline;height:1em" src="https://cdn.jsdmirror.com/gh/norevi/waline-blobcatemojis@1.0/blobs/ablobcatattentionreverse.png"> %}

{% note color:warning 如果您没有满足上述条件，即使提交了申请也不会通过哦～ %}

{% timeline %}


<!-- node 第一步：新建 Issue -->

新建 [GitHub Issue](https://github.com/xlenco/blog-friends/issues/) 按照模板格式填写并提交。

为了提高图片加载速度，建议优化头像：
1. 打开 [压缩图](https://www.iloveimg.com/zh-cn/compress-image/) 上传自己的头像，将图片压缩后下载。
2. 将压缩后的图片上传到稳定的图床并使用此图片链接作为头像。

<!-- node 第二步：添加友链并等待管理员审核 -->

请添加本站到您的友链中：

```yaml
title: Xlenco's Blog
url: https://blog.xlenco.com
avatar: https://q1.qlogo.cn/g?b=qq&nk=1043865083&s=100
description: "总有人间一两风，吹我十万八千梦。"
```

待管理员审核通过，添加了 `active` 标签后，回来刷新即可生效。

如果您需要更新自己的友链，请直接修改 issue 内容，大约 3 分钟内生效，无需等待博客重新部署。

{% endtimeline %}

{% endfolding %}





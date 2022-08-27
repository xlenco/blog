---

title: Microsoft应用永久密钥获取教程
tags: 杂项
categories: 笔记
cover: >-
[https://ik.imagekit.io/nicexl/text/765243604c4abea65c4da035d17ff8da_0HBdJsQM9.png?ik-sdk-version=javascript-1.4.3&updatedAt=1655477630675](https://ik.imagekit.io/nicexl/text/765243604c4abea65c4da035d17ff8da_0HBdJsQM9.png?ik-sdk-version=javascript-1.4.3&updatedAt=1655477630675)
abbrlink: f366
date: 2022-06-19 18:47:47
---

### 开始

1. 首先打开网址：[https://developer.microsoft.com/en-us/graph/graph-explorer](https://developer.microsoft.com/en-us/graph/graph-explorer)
2. 左边点进`Sign in to Graph Explorer` ，然后用你的管理员账户登录。登录完成后回到第一步的页面
3. 眼睛往右边挪一下，找到`Modify permissions (Preview)` ，所有的权限都授予，直至全部呈现 ✔ 状态
4. 左侧栏，`Applications (8)` ，下面找到绿色的`POST` ，有两个，选择，`create a new application` ，双击就会在右侧呈现
5. 现在去注册的应用那里，复制`对象 ID` ，备用
6. 再回到 Graph Explorer，将 POST 的 URL 地址替换为[https://graph.microsoft.com/v1.0/applications/你的 ObjectId/addPassword](https://graph.microsoft.com/v1.0/applications/%E4%BD%A0%E7%9A%84ObjectId/addPassword)
7. 下面全部删除，修改成如下内容：

```
{
    "passwordCredential": {
        "displayName": "你想要给密钥的描述",
        "endDateTime": "9999-12-31T00:00:00Z"
    }
}
```

### 结尾

![](https://ik.imagekit.io/nicexl/text/71355945_8yY4Li2U0.png?ik-sdk-version=javascript-1.4.3&updatedAt=1655635911325#crop=0&crop=0&crop=1&crop=1&id=aRFE8&originHeight=348&originWidth=929&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
在 Response preview 中的 secretText 处就是你的 secret 值

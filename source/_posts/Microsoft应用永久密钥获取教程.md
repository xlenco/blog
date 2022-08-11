---
title: Microsoft应用永久密钥获取教程
tags: 笔记
categories: 杂项
cover: >-
  https://ik.imagekit.io/nicexl/text/765243604c4abea65c4da035d17ff8da_0HBdJsQM9.png?ik-sdk-version=javascript-1.4.3&updatedAt=1655477630675
abbrlink: f366
date: 2022-06-19 18:47:47
---

### 开始

1. 首先打开网址：[https://developer.microsoft.com/en-us/graph/graph-explorer](https://developer.microsoft.com/en-us/graph/graph-explorer)
2. 左边点进`Sign in to Graph Explorer` ，然后用你的管理员账户登录。登录完成后回到第一步的页面
3. 眼睛往右边挪一下，找到`Modify permissions (Preview)` ，所有的权限都授予，直至全部呈现✔状态
4. 左侧栏，`Applications (8)` ，下面找到绿色的`POST` ，有两个，选择，`create a new application` ，双击就会在右侧呈现
5. 现在去注册的应用那里，复制`对象 ID` ，备用
6. 再回到Graph Explorer，将POST的URL地址替换为[https://graph.microsoft.com/v1.0/applications/你的ObjectId/addPassword](https://graph.microsoft.com/v1.0/applications/%E4%BD%A0%E7%9A%84ObjectId/addPassword)
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

![1](https://ik.imagekit.io/nicexl/text/71355945_8yY4Li2U0.png?ik-sdk-version=javascript-1.4.3&updatedAt=1655635911325)
在Response preview中的secretText处就是你的secret值


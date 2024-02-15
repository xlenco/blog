---
title: Microsoft Azure应用永久密钥获取教程
date: 2022-06-19T18:47:47.000Z
updated: '2024-02-15 14:42:43'
categories: 教程
cover: 'https://cdn.nlark.com/yuque/0/2024/png/22578074/1707979339307-695c5973-8395-4d58-b1a3-7a77f94e86bd.png?x-oss-process=image%2Fresize%2Cw_937%2Climit_0'
abbrlink: f366
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

![](https://pic1.xlenco.top/i/1672982930068-0e833c3a-2917-4682-b830-fec891b162cd.png#id=MJDxC&originHeight=348&originWidth=929&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

在Response preview中的secretText处就是你的secret值

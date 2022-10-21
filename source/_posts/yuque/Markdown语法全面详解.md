---
abbrlink: 3b89
categories:
  - 笔记

cover: https://ik.imagekit.io/nicexl/text/386_qSCoLCgmI.jpeg
date: "2022-06-16 06:09:37"
description: 主要讲什么是Markdown语法，以及Markdown的用法
swiper_index: 3
tags:
  - Markdown

title: Markdown语法全面详解
updated: 2022-06-16 00:00:00
---

# Markdown 语法全面详解

目录

简介： md 格式是近几年流行起的一个纯文本格式，对于一个程序员来说，用 md 格式代替 word、txt 等格式用来写说明文档或者 blog，目前 github 以及 CSDN 都支持 md 格式书写 blog 了，用着用着就开始喜欢上了。

本篇文章主要就是记录一下 md 格式的语法，md 语法在几乎所有支持 md 格式的软件都是通用的，而快捷键是在 MarkdownPad2 软件环境下。

[TOC]

### 1、Markdown 常用快捷键

功能快捷键标题 ctrl+1 用#号表示，#一级标题，##表示二级标题，依次类推，快捷键 ctrl+1、2、3、4…加粗左右用**包裹起来，快捷键 Ctrl + B 斜体左右用*包裹起来，快捷键 Ctrl + I 引用在文字开头添加 > 表示引用说明，快捷键 Ctrl + Q 插入链接快捷键 Ctrl + L 插入代码可以通过 tab 或者 4 个空格缩进表示，也可以通过“`将代码包裹起来表示代码块，快捷键 Ctrl + K 插入图片快捷键 Ctrl + G 提升标题 Ctrl + H 有序列表通过-加一个空格表示，后面跟内容，快捷键 Ctrl + U 无序列表通过数字加一个.以及一个空格表示，后面跟内容,快捷键 ctrl+shift+o 横线快捷键 Ctrl + R 撤销快捷键 Ctrl + Z 重做快捷键 Ctrl + Y 时间戳快捷键 Ctrl + T 加粗加斜体左右用***包裹起来，快捷键 ctrl+i，ctrl+b，先后顺序无所谓生成目录[TOC]按回车

### 2、基本语法

### 2.1 字体设置斜体、粗体、删除线

```latex
这里显示正文
*这里显示的是斜体*
_这里显示的倾斜体_
**这里显示的文字是加粗了**
***这里的文字是倾斜加粗的***
~~这里的文字是加下划线的~~
```

显示如下

这里显示正文
_这里显示的是斜体_
_这里显示的倾斜体_
**这里显示的文字是加粗了**
**_这里的文字是倾斜加粗的_**
~~这里的文字是加下划线的~~

### 2.2 分级标题

写发 1： Markdown 支持两种标题的语法，类 Setext 和类 atx 形式。 类 Atx 形式则是在行首插入 1 到 6 个 # ，对应到标题 1 到 6 阶，例如：

```latex
# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题

这个写法和 **文字**效果是一样的
```

输出的结果：

## 一级标题

## 二级标题

### 三级标题

### 四级标题

### 五级标题

### 六级标题

写法 2： Markdown 支持两种标题的语法，类 Setext 和类 atx 形式。

类 Setext 形式是用底线的形式，利用 = （最高阶标题）和 - （第二阶标题），任何数量的 = 和 - 都可以有效果。例如：

```latex
这是一个一级标题
============================
```

输出结果：

## 这是一个一级标题

或者

```latex
二级标题
-----------
```

输出结果：

## 二级标题

### 2.3 链接

(1)插入本地图片链接的方法有两种： ![图片描述]（图片路径"title"） ![图片描述]（图片路径） 注：图片描述可以不写。 如本地插入图片示范：

```latex
![插入下一层级目录下的图片](/xx/083.jpg)
![插入同级目录下的图片](/xxx.jpg)
```

效果：

![](https://ik.imagekit.io/nicexl/Wallpaper/Aeolian_QRtDSqEg8r.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1652777355540#crop=0&crop=0&crop=1&crop=1&id=tZ47G&originHeight=1588&originWidth=3353&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)（2）插入互联网上图片

![图片描述]（图片网络路径） 注：图片描述与插入本地图片一样，描述可以不写。

写法：

```latex
![图片描述](https://xxxxxx/xxx.jpg)
```

效果：

![](https://ik.imagekit.io/nicexl/Wallpaper/61d716_REz6m2Ypk.png?ik-sdk-version=javascript-1.4.3&updatedAt=1655309024521#crop=0&crop=0&crop=1&crop=1&id=yJY3Y&originHeight=2122&originWidth=4341&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)（3）自动连接 Markdown 支持以比较简短的自动链接形式来处理网址和电子邮件信箱，只要是用<>包起来， Markdown 就会自动把它转成链接。也可以直接写，也是可以显示成链接形式的。 链接内容定义的形式为：

方括号（前面可以选择性地加上至多三个空格来缩进），里面输入链接文字 接着一个冒号 接着一个以上的空格或制表符 接着链接的网址 选择性地接着 title 内容，可以用单引号、双引号或是括弧包着

下面这三种链接的定义都是相同：

```latex
[这是一个链接]: http://xlenco.eu.org/  "这里是链接的title内容"
[这是一个链接]: http://xlenco.eu.org/  '这里是链接的title内容'
[这是一个链接]: http://xlenco.eu.org/  (这里是链接的title内容)
```

结果：

[这是一个链接]: http://xlenco.eu.org/ "这里是链接的 title 内

在链接的时候也可以选择加上 title 属性，title 属性是选择性的，链接名称可以用字母、数字和空格，但是不分大小写：

```latex
[这是一个链接](http://xlenco.eu.org/ "欢迎访问").
```

[这是一个链接](http://xlenco.eu.org/ "欢迎访问").

输出 HTML 为：

```latex
<a href="http://xlenco.eu.org/"target="_blank" 欢迎访问>
```

### 2.4 代码块

对于程序员来说代码功能是必不可少的，插入程序代码的方式有两种，一种是利用缩进(tab), 另一种是利用英文“`”符号（一般在 ESC 键下方，和~同一个键）包裹代码。

#### 行内代码

如果要标记一小段行内代码，你可以用反引号把它包起来（```），例如：

```latex
Use the `printf()` function.
```

会产生：

```latex
<p>Use the <code>printf()</code> function.</p>
```

如果要在代码区段内插入反引号，你可以用多个反引号来开启和结束代码区段： There is a literal backtick (`) here. 这段语法会产生：

There is a literal backtick (`) here.

在代码区块里面， & 、 < 和 > 会自动转成 HTML 实体，这样的方式让你非常容易使用 Markdown 插入范例用的 HTML 原始码，只需要复制贴上，剩下的 Markdown 都会帮你处理，Markdown 会把下面这段：

```latex
Please don't use any `<blink>` tags.
```

转为：

Please don't use any`<blink>` tags.

#### 代码快

```
Please don't use any `<blink>` tags.

<p><code>—</code> is the decimal-encoded
equivalent of <code>—</code>.</p>
```

以产生：

```latex
Please don't use any `<blink>` tags.

<p><code>—</code> is the decimal-encoded
equivalent of <code>—</code>.</p>
```

### 2.5 分割线

你可以在一行中用三个以上的星号、减号、底线来建立一个分隔线，行内不能有其他东西。你也可以在星号或是减号中间插入空格。下面每种写法都可以建立分隔线：

```latex
* * *

***

*****

- - -

---------------------------------------
```

### 2.6 强调

Markdown 使用星号（）和底线（_）作为标记强调字词的符号，被 \* 或 _ 包围的字词会被转成用 标签包围，用两个或\_包起来的话，则会被转成，例如：

```latex
*single asterisks*

_single underscores_

**double asterisks**

__double underscores__
```

会转成：

```latex
<em>single asterisks</em>

<em>single underscores</em>

<strong>double asterisks</strong>

<strong>double underscores</strong>
```

你可以随便用你喜欢的样式，唯一的限制是，你用什么符号开启标签，就要用什么符号结束。

强调也可以直接插在文字中间：

un_frigging_believable

但是如果你的 \* 和 \_ 两边都有空白的话，它们就只会被当成普通的符号。 如果要在文字前后直接插入普通的星号或底线，你可以用反斜线：

_this text is surrounded by literal asterisks_

### 2.7 引用

在被引用的文本前加上>符号，以及一个空格就可以了，如果只输入了一个>符号会产生一个空白的引用。

（1）基本使用 使用如下图所示：

```latex
> 文字引用
> 文字引用
> 文字引用
> 文字引用
> 文字引用
>
> 文字引用
> 文字引用
> 文字引用
```

显示如下：

> 文字引用 文字引用 文字引用 文字引用 文字引用
> 文字引用 文字引用 文字引用

（2）嵌套引用

```latex
>>>第一层嵌套引用
>>第二层嵌套引用
>第三层嵌套引用
```

显示如下：

> 第一层嵌套引用 第二层嵌套引用 第三层嵌套引用

（3）引用其它要素 引用的区块内也可以使用其他的 Markdown 语法，包括标题、列表、代码区块等。 使用如图所示：

### 2.8 列表

Markdown 支持有序列表和无序列表。 无序列表使用星号、加号或是减号作为列表标记： 不管是无序列表还是有序列表,符号后面一定要有一个空格，起到缩进的作用。

（1）无序列表 使用 星号\*，加号+，减号- 表示无序列表。

```latex
* 无序列表文字
* 无序列表文字
* 无序列表文字
```

等同于：

```latex
+ 无序列表文字
+ 无序列表文字
+ 无序列表文字
```

也等同于：

```latex
- 无序列表文字
- 无序列表文字
- 无序列表文字
```

最后显示结果相同，显示如下：

- 无序列表文字--前是\*号的显示
- 无序列表文字--前是\*号的显示
- 无序列表文字--前是\*号的显示
- 无序列表文字--前是+号的显示
- 无序列表文字--前是+号的显示
- 无序列表文字--前是+号的显示
- 无序列表文字--前是-号的显示
- 无序列表文字--前是-号的显示
- 无序列表文字--前是-号的显示

（2）有序列表 有序列表则使用数字接着一个英文句点： 注意：英文句点后面一定要有一个空格，起到缩进的作用。

```latex
1. 有序列表
2. 有序列表
3. 有序列表
```

显示结果如下：

1. 有序列表
2. 有序列表
3. 有序列表

（3）无序列表和有序列表同时使用

```latex
* 这是无序列表1
- 这是无序列表2
+ 这是无序列表3
1. 这是有序列表1
2. 这是有序列表2
* 1. 有序无序混合使用1
+ 2. 有序无序混合使用2
```

- 这是无序列表 1
- 这是无序列表 2
- 这是无序列表 3

1. 这是有序列表 1
2. 这是有序列表 2

- 有序无序混合使用 1
- 有序无序混合使用 2

（4）注意事项 在使用列表时，只要是数字后面加上英文的点，就会无意间产生列表，比如 2020.5.25 这时候想表达的是日期，有些软件把它被误认为是列表。解决方式：在每个点前面加上\就可以了。如下图所示：

2020. 5.  25. 今天是 2020 年 5 月 25 日

显示如下： 2020. 05. 25. 今天是 2020 年 5 月 25 日

### 2.9 表格

要添加表，请使用三个或多个连字符（---）创建每列的标题，并使用管道（|）分隔每列。您可以选择在表的任一端添加管道。

```markdown
| Syntax    | Description |
| --------- | ----------- |
| Header    | Title       |
| Paragraph | Text        |
```

呈现的输出如下所示：

| Syntax    | Description |
| --------- | ----------- |
| Header    | Title       |
| Paragraph | Text        |

单元格宽度可以变化，如下所示。呈现的输出将看起来相同。

```
| Syntax | Description |
| --- | ----------- |
| Header | Title |
| Paragraph | Text |
```

**Tip:** 使用连字符和管道创建表可能很麻烦。为了加快该过程，请尝试使用[Markdown Tables Generator](https://www.tablesgenerator.com/markdown_tables)。使用图形界面构建表，然后将生成的 Markdown 格式的文本复制到文件中。

#### 对齐

您可以通过在标题行中的连字符的左侧，右侧或两侧添加冒号（:），将列中的文本对齐到左侧，右侧或中心。

```markdown
| Syntax    | Description |   Test Text |
| :-------- | :---------: | ----------: |
| Header    |    Title    | Here's this |
| Paragraph |    Text     |    And more |
```

呈现的输出如下所示：

| Syntax    | Description | Test Text   |
| --------- | ----------- | ----------- |
| Header    | Title       | Here's this |
| Paragraph | Text        | And more    |

## 其他

### 反斜杠

Markdown 可以利用反斜杠来插入一些在语法中有其它意义的符号，例如：如果你想要用星号加在文字旁边的方式来做出强调效果（但不用 `` 标签），你可以在星号的前面加上反斜杠：

_literal asterisks_

Markdown 支持以下这些符号前面加上反斜杠来帮助插入普通的符号：

```latex
\   反斜线
`   反引号
*   星号
_   底线
{}  花括号
[]  方括号
()  括弧
#   井字号
+   加号
-   减号
.   英文句点
!   惊叹号
```

### 略缩

缩略有两种，一种是同时支持 Markdown，HTML，一种是只支持 HTML

#### 第一种

同时支持 Markdown，HTML
{% tabs  %}

<!-- tab 预览 -->
<details>
  <summary>文字</summary>
内容
</details>
<!-- endtab -->
<!-- tab 配置代码 -->
```
<details>
  <summary>文字</summary>
内容
</details>
```
<!-- endtab -->
{% endtabs %}

#### 第二种

只支持 HTML
{% tabs  %}

<!-- tab 预览 -->
<details>
  <summary>文字</summary>
  <pre>
    <ul>
内容
    </ul>
  </pre>
</details>
<!-- endtab -->
<!-- tab 配置代码 -->
```
<details>
  <summary>文字</summary>
  <pre>
    <ul>
内容
    </ul>
  </pre>
</details>
```
<!-- endtab -->
{% endtabs %}

### Butterfly 专用

> 此项是 butterfly 主题自带的外挂标签

{% tabs  %}

<!-- tab 预览 -->

{% hideToggle 文字%}
内容
{% endhideToggle %}

<!-- endtab -->

<!-- tab 配置代码 -->

```
{% hideToggle 文字%}
内容
{% endhideToggle %}
```

<!-- endtab -->

{% endtabs %}

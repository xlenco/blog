---
title: Tag-Plugins-Plus
cover: https://preview.cloud.189.cn/image/imageAction?param=32FD362F07854E186ECF47426BC05D78171838A5D2E778016D78A737933CDB78DCE3B92EAAAADC3B05EE4F686EF4F7F93D1761595C80701196F83BCF53B4EF4D0580E1B686868DC9FDFD5682AAEF8567414F3FFF4F4014DA21A17E699701A1AB4608072C332B241415FA131A04B1841A493DD03E
description: 添加大量外挂标签样式。
date: 2022-12-31 22:22:44
updated: 2022-12-31 22:22:44
---

{% tabs 配置方案,1 %}

1. 安装插件,在博客根目录`[Blogroot]`下打开终端，运行以下指令：

```bash
npm install hexo-butterfly-tag-plugins-plus --save
```

考虑到 hexo 自带的 markdown 渲染插件`hexo-renderer-marked`与外挂标签语法的兼容性较差，建议您将其替换成[hexo-renderer-kramed](https://www.npmjs.com/package/hexo-renderer-kramed)

```bash
npm uninstall hexo-renderer-marked --save
npm install hexo-renderer-kramed --save
```

2. 添加配置信息，以下为写法示例
   在站点配置文件`_config.yml`或者主题配置文件`_config.butterfly.yml`中添加

```yaml
# tag-plugins-plus
# see https://akilar.top/posts/615e2dec/
tag_plugins:
  enable: true # 开关
  priority: 5 #过滤器优先权
  issues: false #issues标签依赖注入开关
  link:
    placeholder: /img/link.png #link_card标签默认的图标图片
  CDN:
    anima: https://npm.elemecdn.com/hexo-butterfly-tag-plugins-plus@latest/lib/assets/font-awesome-animation.min.css #动画标签anima的依赖
    jquery: https://npm.elemecdn.com/jquery@latest/dist/jquery.min.js #issues标签依赖
    issues: https://npm.elemecdn.com/hexo-butterfly-tag-plugins-plus@latest/lib/assets/issues.js #issues标签依赖
    iconfont: //at.alicdn.com/t/font_2032782_8d5kxvn09md.js #参看https://akilar.top/posts/d2ebecef/
    carousel: https://npm.elemecdn.com/hexo-butterfly-tag-plugins-plus@latest/lib/assets/carousel-touch.js
    tag_plugins_css: https://npm.elemecdn.com/hexo-butterfly-tag-plugins-plus@latest/lib/tag_plugins.css
```

3. 参数释义  
   | 参数 | 备选值/类型 | 释义 |
   | --- | --- | --- |
   | enable | true/false | 【必选】控制开关 |
   | priority | number | 【可选】过滤器优先级，数值越小，执行越早，默认为 10，选填 |
   | issues | true/false | 【可选】issues 标签控制开关，默认为 false |
   | link.placeholder | 【必选】link 卡片外挂标签的默认图标 | |
   | CDN.anima | URL | 【可选】动画标签 anima 的依赖 |
   | CDN.jquery | URL | 【可选】issues 标签依赖 |
   | CDN.issues | URL | 【可选】issues 标签依赖 |
   | CDN.iconfont | URL | 【可选】iconfont 标签 symbol 样式引入，如果不想引入，则设为 false |
   | CDN.carousel | URL | 【可选】carousel 旋转相册标签鼠标拖动依赖，如果不想引入则设为 false |
   | CDN.tag_plugins_css | URL | 【可选】外挂标签样式的 CSS 依赖，为避免 CDN 缓存延迟，建议将[@latest ](/latest)
   改为具体版本号 |

{% tip info %}
源码修改配置方案适用于不想应用全部外挂标签的用户，供熟悉外挂标签原理的用户自行选择装配需要的标签文件。
{% endtip %}

1. 下载资源文件
   {% ghcard Akilarlxh/hexo-butterfly-tag-plugins-plus, theme="vue" %}
2. 将下载的`hexo-butterfly-tag-plugins-plus.zip`解压得到资源文件夹,下文以`[tag_plugins_file]`指代该文件夹。
3. 将`[tag_plugins_file]\lib\scripts`目录下的文件放到`[Blogroot]\themes\butterfly\scripts\tag\`文件夹内。
4. 将`[tag_plugins_file]\lib\style`目录下的文件放到`[Blogroot]\themes\butterfly\source\css\tags\`文件夹内。
5. 修改`[Blogroot]\_config.butterfly.yml`的`inject`配置项，添加`CDN`依赖项。由于`issues`写入`timeline`和`site-card`标签要用到`jquery`，请务必根据注释指示的版本决定是否添加。

```yaml
inject:
  head:
    - <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/l-lin/font-awesome-animation/dist/font-awesome-animation.min.css"  media="defer" onload="this.media='all'"> #动画标签anima的依赖
    - <script async src="https://npm.elemecdn.com/hexo-butterfly-tag-plugins-plus@latest/lib/carousel-touch.min.js"></script> #carousel相册鼠标动作的依赖
  bottom:
    - <script defer src="https://npm.elemecdn.com/jquery@latest/dist/jquery.min.js"></script>
    # 自butterfly_v3.4.0+开始，主题基本实现去jquery化，需要自己添加引用，请读者根据版本自行决定是否添加这行引用。
    - <script defer src="https://npm.elemecdn.com/hexo-theme-volantis@latest/source/js/issues.min.js"></script>
    #数据集合标签issues的依赖
```

5. 考虑到 hexo 自带的 markdown 渲染插件`hexo-renderer-marked`与外挂标签语法的兼容性较差，建议您将其替换成[hexo-renderer-kramed](https://www.npmjs.com/package/hexo-renderer-kramed)

```bash
npm uninstall hexo-renderer-marked --save
npm install hexo-renderer-kramed --save
```

6. 外挂标签使用方案请参阅下文。

{% endtabs %}

## 行内文本样式 text

{% tabs text,2 %}

```markdown
{% u 文本内容 %}
{% emp 文本内容 %}
{% wavy 文本内容 %}
{% del 文本内容 %}
{% kbd 文本内容 %}
{% psw 文本内容 %}
```

1. 带 {% u 下划线 %} 的文本
2. 带 {% emp 着重号 %} 的文本
3. 带 {% wavy 波浪线 %} 的文本
4. 带 {% del 删除线 %} 的文本
5. 键盘样式的文本 {% kbd command %} + {% kbd D %}
6. 密码样式的文本：{% psw 这里没有验证码 %}

```markdown
1. 带 {% u 下划线 %} 的文本
2. 带 {% emp 着重号 %} 的文本
3. 带 {% wavy 波浪线 %} 的文本
4. 带 {% del 删除线 %} 的文本
5. 键盘样式的文本 {% kbd command %} + {% kbd D %}
6. 密码样式的文本：{% psw 这里没有验证码 %}
```

{% endtabs %}

## 行内文本 span

{% tabs span,3 %}

```markdown
{% span 样式参数(参数以空格划分), 文本内容 %}
```

1. 字体: logo, code
2. 颜色: {% span red, red %},{% span yellow, yellow %},{% span green, green %},{% span cyan, cyan %},{% span blue, blue %},{% span gray, gray %}
3. 大小: small, h4, h3, h2, h1, large, huge, ultra
4. 对齐方向: left, center, right

- 彩色文字
  在一段话中方便插入各种颜色的标签，包括：{% span red, 红色 %}、{% span yellow, 黄色 %}、{% span green, 绿色 %}、{% span cyan, 青色 %}、{% span blue, 蓝色 %}、{% span gray, 灰色 %}。
- 超大号文字
  文档「开始」页面中的标题部分就是超大号文字。
  {% span center logo large, Volantis %}
  {% span center small, A Wonderful Theme for Hexo %}

```markdown
- 彩色文字
  在一段话中方便插入各种颜色的标签，包括：{% span red, 红色 %}、{% span yellow, 黄色 %}、{% span green, 绿色 %}、{% span cyan, 青色 %}、{% span blue, 蓝色 %}、{% span gray, 灰色 %}。
- 超大号文字
  文档「开始」页面中的标题部分就是超大号文字。
  {% span center logo large, Volantis %}
  {% span center small, A Wonderful Theme for Hexo %}
```

{% endtabs%}

## 段落文本 p

{% tabs p,3 %}

```markdown
{% p 样式参数(参数以空格划分), 文本内容 %}
```

1. 字体: logo, code
2. 颜色: {% span red, red %},{% span yellow, yellow %},{% span green, green %},{% span cyan, cyan %},{% span blue, blue %},{% span gray, gray %}
3. 大小: small, h4, h3, h2, h1, large, huge, ultra
4. 对齐方向: left, center, right

- 彩色文字
  在一段话中方便插入各种颜色的标签，包括：{% p red, 红色 %}、{% p yellow, 黄色 %}、{% p green, 绿色 %}、{% p cyan, 青色 %}、{% p blue, 蓝色 %}、{% p gray, 灰色 %}。
- 超大号文字
  文档「开始」页面中的标题部分就是超大号文字。
  {% p center logo large, Volantis %}
  {% p center small, A Wonderful Theme for Hexo %}

```markdown
- 彩色文字
  在一段话中方便插入各种颜色的标签，包括：{% p red, 红色 %}、{% p yellow, 黄色 %}、{% p green, 绿色 %}、{% p cyan, 青色 %}、{% p blue, 蓝色 %}、{% p gray, 灰色 %}。
- 超大号文字
  文档「开始」页面中的标题部分就是超大号文字。
  {% p center logo large, Volantis %}
  {% p center small, A Wonderful Theme for Hexo %}
```

{% endtabs%}

## 引用 note

{% note warning %}
最新版`butterfly`标签支持引用`fontawesome V5`图标，效果上已经优于`volantis`的 note 标签。故不再额外引入`volantis的note样式`。~~做样式适配好麻烦的啊，能偷懒就偷懒吧~~
{% endnote %}
{% note blue 'fas fa-bullhorn' modern %}
以下是`butterfly`主题的 note 写法。
{% endnote %}
{% tabs note,4 %}
修改主题配置文件

```yaml
note:
  # Note tag style values:
  #  - simple    bs-callout old alert style. Default.
  #  - modern    bs-callout new (v2-v3) alert style.
  #  - flat      flat callout style with background, like on Mozilla or StackOverflow.
  #  - disabled  disable all CSS styles import of note tag.
  style: simple
  icons: false
  border_radius: 3
  # Offset lighter of background in % for modern and flat styles (modern: -12 | 12; flat: -18 | 6).
  # Offset also applied to label tag variables. This option can work with disabled note tag.
  light_bg_offset: 0
```

`Note`标签外挂有两种用法。`icons`和`light_bg_offset`只对方法一生效。
{% folding cyan , 方法一 %}

```markdown
{% note [class] [no-icon] [style] %}
Any content (support inline tags too.io).
{% endnote %}
```

{% endfolding %}

{% folding blue , 方法二 %}

```markdown
{% note [color] [icon] [style] %}
Any content (support inline tags too.io).
{% endnote %}
```

{% endfolding %}
{% folding cyan , 方法一 %}

| 参数                                                        | 用法                                 |
| ----------------------------------------------------------- | ------------------------------------ |
| class                                                       | 【可选】标识，不同的标识有不同的配色 |
| （ default / primary / success / info / warning / danger ） |                                      |
| no-icon                                                     | 【可选】不显示 icon                  |
| style                                                       | 【可选】可以覆盖配置中的 style       |
| （simple/modern/flat/disabled）                             |                                      |

{% endfolding %}
{% folding blue , 方法二 %}

| 参数                                                        | 用法                                                                     |
| ----------------------------------------------------------- | ------------------------------------------------------------------------ |
| class                                                       | 【可选】标识，不同的标识有不同的配色                                     |
| （ default / blue / pink / red / purple / orange / green ） |                                                                          |
| no-icon                                                     | 【可选】可配置自定义 icon (只支持 fontawesome 图标, 也可以配置 no-icon ) |
| style                                                       | 【可选】可以覆盖配置中的 style                                           |
| （simple/modern/flat/disabled）                             |                                                                          |

{% endfolding %}
{% folding cyan , 方法一 %}

1. `simple`样式

{% note simple %}默认 提示块标签{% endnote %}

{% note default simple %}default 提示块标签{% endnote %}

{% note primary simple %}primary 提示块标签{% endnote %}

{% note success simple %}success 提示块标签{% endnote %}

{% note info simple %}info 提示块标签{% endnote %}

{% note warning simple %}warning 提示块标签{% endnote %}

{% note danger simple %}danger 提示块标签{% endnote %}

2. `modern`样式

{% note modern %}默认 提示块标签{% endnote %}

{% note default modern %}default 提示块标签{% endnote %}

{% note primary modern %}primary 提示块标签{% endnote %}

{% note success modern %}success 提示块标签{% endnote %}

{% note info modern %}info 提示块标签{% endnote %}

{% note warning modern %}warning 提示块标签{% endnote %}

{% note danger modern %}danger 提示块标签{% endnote %}

3. `flat`样式

{% note flat %}默认 提示块标签{% endnote %}

{% note default flat %}default 提示块标签{% endnote %}

{% note primary flat %}primary 提示块标签{% endnote %}

{% note success flat %}success 提示块标签{% endnote %}

{% note info flat %}info 提示块标签{% endnote %}

{% note warning flat %}warning 提示块标签{% endnote %}

{% note danger flat %}danger 提示块标签{% endnote %}

4. `disabled`样式

{% note disabled %}默认 提示块标签{% endnote %}

{% note default disabled %}default 提示块标签{% endnote %}

{% note primary disabled %}primary 提示块标签{% endnote %}

{% note success disabled %}success 提示块标签{% endnote %}

{% note info disabled %}info 提示块标签{% endnote %}

{% note warning disabled %}warning 提示块标签{% endnote %}

{% note danger disabled %}danger 提示块标签{% endnote %}

5. `no-icon`样式

{% note no-icon %}默认 提示块标签{% endnote %}

{% note default no-icon %}default 提示块标签{% endnote %}

{% note primary no-icon %}primary 提示块标签{% endnote %}

{% note success no-icon %}success 提示块标签{% endnote %}

{% note info no-icon %}info 提示块标签{% endnote %}

{% note warning no-icon %}warning 提示块标签{% endnote %}

{% note danger no-icon %}danger 提示块标签{% endnote %}

{% endfolding %}
{% folding blue , 方法二 %}

1. simple 样式

{% note 'fab fa-cc-visa' simple %}你是刷 Visa 还是 UnionPay{% endnote %}

{% note blue 'fas fa-bullhorn' simple %}2021 年快到了....{% endnote %}

{% note pink 'fas fa-car-crash' simple %}小心开车 安全至上{% endnote %}

{% note red 'fas fa-fan' simple%}这是三片呢？还是四片？{% endnote %}

{% note orange 'fas fa-battery-half' simple %}你是刷 Visa 还是 UnionPay{% endnote %}

{% note purple 'far fa-hand-scissors' simple %}剪刀石头布{% endnote %}

{% note green 'fab fa-internet-explorer' simple %}前端最讨厌的浏览器{% endnote %}

2. modern 样式

{% note 'fab fa-cc-visa' modern %}你是刷 Visa 还是 UnionPay{% endnote %}

{% note blue 'fas fa-bullhorn' modern %}2021 年快到了....{% endnote %}

{% note pink 'fas fa-car-crash' modern %}小心开车 安全至上{% endnote %}

{% note red 'fas fa-fan' modern%}这是三片呢？还是四片？{% endnote %}

{% note orange 'fas fa-battery-half' modern %}你是刷 Visa 还是 UnionPay{% endnote %}

{% note purple 'far fa-hand-scissors' modern %}剪刀石头布{% endnote %}

{% note green 'fab fa-internet-explorer' modern %}前端最讨厌的浏览器{% endnote %}

3. flat 样式

{% note 'fab fa-cc-visa' flat %}你是刷 Visa 还是 UnionPay{% endnote %}

{% note blue 'fas fa-bullhorn' flat %}2021 年快到了....{% endnote %}

{% note pink 'fas fa-car-crash' flat %}小心开车 安全至上{% endnote %}

{% note red 'fas fa-fan' flat%}这是三片呢？还是四片？{% endnote %}

{% note orange 'fas fa-battery-half' flat %}你是刷 Visa 还是 UnionPay{% endnote %}

{% note purple 'far fa-hand-scissors' flat %}剪刀石头布{% endnote %}

{% note green 'fab fa-internet-explorer' flat %}前端最讨厌的浏览器{% endnote %}

4. disabled 样式

{% note 'fab fa-cc-visa' disabled %}你是刷 Visa 还是 UnionPay{% endnote %}

{% note blue 'fas fa-bullhorn' disabled %}2021 年快到了....{% endnote %}

{% note pink 'fas fa-car-crash' disabled %}小心开车 安全至上{% endnote %}

{% note red 'fas fa-fan' disabled %}这是三片呢？还是四片？{% endnote %}

{% note orange 'fas fa-battery-half' disabled %}你是刷 Visa 还是 UnionPay{% endnote %}

{% note purple 'far fa-hand-scissors' disabled %}剪刀石头布{% endnote %}

{% note green 'fab fa-internet-explorer' disabled %}前端最讨厌的浏览器{% endnote %}

5. no-icon 样式

{% note no-icon %}你是刷 Visa 还是 UnionPay{% endnote %}

{% note blue no-icon %}2021 年快到了....{% endnote %}

{% note pink no-icon %}小心开车 安全至上{% endnote %}

{% note red no-icon %}这是三片呢？还是四片？{% endnote %}

{% note orange no-icon %}你是刷 Visa 还是 UnionPay{% endnote %}

{% note purple no-icon %}剪刀石头布{% endnote %}

{% note green no-icon %}前端最讨厌的浏览器{% endnote %}

{% endfolding %}
{% folding cyan , 方法一 %}

1. `simple`样式

```markdown
{% note simple %}默认 提示块标签{% endnote %}

{% note default simple %}default 提示块标签{% endnote %}

{% note primary simple %}primary 提示块标签{% endnote %}

{% note success simple %}success 提示块标签{% endnote %}

{% note info simple %}info 提示块标签{% endnote %}

{% note warning simple %}warning 提示块标签{% endnote %}

{% note danger simple %}danger 提示块标签{% endnote %}
```

2. `modern`样式

```markdown
{% note modern %}默认 提示块标签{% endnote %}

{% note default modern %}default 提示块标签{% endnote %}

{% note primary modern %}primary 提示块标签{% endnote %}

{% note success modern %}success 提示块标签{% endnote %}

{% note info modern %}info 提示块标签{% endnote %}

{% note warning modern %}warning 提示块标签{% endnote %}

{% note danger modern %}danger 提示块标签{% endnote %}
```

3. `flat`样式

```markdown
{% note flat %}默认 提示块标签{% endnote %}

{% note default flat %}default 提示块标签{% endnote %}

{% note primary flat %}primary 提示块标签{% endnote %}

{% note success flat %}success 提示块标签{% endnote %}

{% note info flat %}info 提示块标签{% endnote %}

{% note warning flat %}warning 提示块标签{% endnote %}

{% note danger flat %}danger 提示块标签{% endnote %}
```

4. `disabled`样式

```markdown
{% note disabled %}默认 提示块标签{% endnote %}

{% note default disabled %}default 提示块标签{% endnote %}

{% note primary disabled %}primary 提示块标签{% endnote %}

{% note success disabled %}success 提示块标签{% endnote %}

{% note info disabled %}info 提示块标签{% endnote %}

{% note warning disabled %}warning 提示块标签{% endnote %}

{% note danger disabled %}danger 提示块标签{% endnote %}
```

5. `no-icon`样式

```markdown
{% note no-icon %}默认 提示块标签{% endnote %}

{% note default no-icon %}default 提示块标签{% endnote %}

{% note primary no-icon %}primary 提示块标签{% endnote %}

{% note success no-icon %}success 提示块标签{% endnote %}

{% note info no-icon %}info 提示块标签{% endnote %}

{% note warning no-icon %}warning 提示块标签{% endnote %}

{% note danger no-icon %}danger 提示块标签{% endnote %}
```

{% endfolding %}
{% folding blue , 方法二 %}

1. `simple`样式

```markdown
{% note 'fab fa-cc-visa' simple %}你是刷 Visa 还是 UnionPay{% endnote %}

{% note blue 'fas fa-bullhorn' simple %}2021 年快到了....{% endnote %}

{% note pink 'fas fa-car-crash' simple %}小心开车 安全至上{% endnote %}

{% note red 'fas fa-fan' simple%}这是三片呢？还是四片？{% endnote %}

{% note orange 'fas fa-battery-half' simple %}你是刷 Visa 还是 UnionPay{% endnote %}

{% note purple 'far fa-hand-scissors' simple %}剪刀石头布{% endnote %}

{% note green 'fab fa-internet-explorer' simple %}前端最讨厌的浏览器{% endnote %}
```

2. `modern`样式

```markdown
{% note 'fab fa-cc-visa' modern %}你是刷 Visa 还是 UnionPay{% endnote %}

{% note blue 'fas fa-bullhorn' modern %}2021 年快到了....{% endnote %}

{% note pink 'fas fa-car-crash' modern %}小心开车 安全至上{% endnote %}

{% note red 'fas fa-fan' modern%}这是三片呢？还是四片？{% endnote %}

{% note orange 'fas fa-battery-half' modern %}你是刷 Visa 还是 UnionPay{% endnote %}

{% note purple 'far fa-hand-scissors' modern %}剪刀石头布{% endnote %}

{% note green 'fab fa-internet-explorer' modern %}前端最讨厌的浏览器{% endnote %}
```

3. `flat`样式

```markdown
{% note 'fab fa-cc-visa' flat %}你是刷 Visa 还是 UnionPay{% endnote %}

{% note blue 'fas fa-bullhorn' flat %}2021 年快到了....{% endnote %}

{% note pink 'fas fa-car-crash' flat %}小心开车 安全至上{% endnote %}

{% note red 'fas fa-fan' flat%}这是三片呢？还是四片？{% endnote %}

{% note orange 'fas fa-battery-half' flat %}你是刷 Visa 还是 UnionPay{% endnote %}

{% note purple 'far fa-hand-scissors' flat %}剪刀石头布{% endnote %}

{% note green 'fab fa-internet-explorer' flat %}前端最讨厌的浏览器{% endnote %}
```

4. `disabled`样式

```markdown
{% note 'fab fa-cc-visa' disabled %}你是刷 Visa 还是 UnionPay{% endnote %}

{% note blue 'fas fa-bullhorn' disabled %}2021 年快到了....{% endnote %}

{% note pink 'fas fa-car-crash' disabled %}小心开车 安全至上{% endnote %}

{% note red 'fas fa-fan' disabled %}这是三片呢？还是四片？{% endnote %}

{% note orange 'fas fa-battery-half' disabled %}你是刷 Visa 还是 UnionPay{% endnote %}

{% note purple 'far fa-hand-scissors' disabled %}剪刀石头布{% endnote %}

{% note green 'fab fa-internet-explorer' disabled %}前端最讨厌的浏览器{% endnote %}
```

5. `no-icon`样式

```markdown
{% note no-icon %}你是刷 Visa 还是 UnionPay{% endnote %}

{% note blue no-icon %}2021 年快到了....{% endnote %}

{% note pink no-icon %}小心开车 安全至上{% endnote %}

{% note red no-icon %}这是三片呢？还是四片？{% endnote %}

{% note orange no-icon %}你是刷 Visa 还是 UnionPay{% endnote %}

{% note purple no-icon %}剪刀石头布{% endnote %}

{% note green no-icon %}前端最讨厌的浏览器{% endnote %}
```

{% endfolding %}
{% endtabs %}

## 上标标签 tip

{% tip cogs %}
主要样式参考自[小康的 butterfly 渐变背景标签](https://www.antmoe.com/posts/3b43914f/),自己写了个`tip.js`来渲染标签，精简了一下代码。
{% endtip %}

{% tabs tip,3 %}

```markdown
{% tip [参数，可选] %}文本内容{% endtip %}
```

1. 样式: success,error,warning,bolt,ban,home,sync,cogs,key,bell
2. 自定义图标: 支持 fontawesome。

{% tip %}default{% endtip %}
{% tip info %}info{% endtip %}
{% tip success %}success{% endtip %}
{% tip error %}error{% endtip %}
{% tip warning %}warning{% endtip %}
{% tip bolt %}bolt{% endtip %}
{% tip ban %}ban{% endtip %}
{% tip home %}home{% endtip %}
{% tip sync %}sync{% endtip %}
{% tip cogs %}cogs{% endtip %}
{% tip key %}key{% endtip %}
{% tip bell %}bell{% endtip %}
{% tip fa-atom %}自定义 font awesome 图标{% endtip %}

```markdown
{% tip %}default{% endtip %}
{% tip info %}info{% endtip %}
{% tip success %}success{% endtip %}
{% tip error %}error{% endtip %}
{% tip warning %}warning{% endtip %}
{% tip bolt %}bolt{% endtip %}
{% tip ban %}ban{% endtip %}
{% tip home %}home{% endtip %}
{% tip sync %}sync{% endtip %}
{% tip cogs %}cogs{% endtip %}
{% tip key %}key{% endtip %}
{% tip bell %}bell{% endtip %}
{% tip fa-atom %}自定义 font awesome 图标{% endtip %}
```

{% endtabs%}

## 动态标签 anima

{% tip fa-gamepad faa-horizontal animated %}
动态标签的实质是引用了[font-awesome-animation](https://github.com/l-lin/font-awesome-animation)的 css 样式，不一定局限于 tip 标签，也可以是其他标签。
只不过这里`tip.js`是我自己写的，所以我清楚它会怎么被渲染成 html，才用的这个写法。
可以熟读文档，使用 html 语言来编写其他标签类型。{% endtip %}

{% tabs tip,3 %}

```markdown
{% tip [参数，可选] %}文本内容{% endtip %}
```

{% note blue 'fas fa-bullhorn' simple %}
更多详情请参看[font-awesome-animation 文档](http://l-lin.github.io/font-awesome-animation/)

1.  将所需的 CSS 类添加到图标（或 DOM 中的任何元素）。
2.  对于父级悬停样式，需要给目标元素添加指定 CSS 类，同时还要给目标元素的父级元素添加 CSS 类`faa-parent animated-hover`。（详情见示例及示例源码）
    You can regulate the speed of the animation by adding the CSS class or . faa-fastfaa-slow
3.  可以通过给目标元素添加 CSS 类`faa-fast`或`faa-slow`来控制动画快慢。
    {% endnote %}
    | On DOM load
    当页面加载时
    显示动画 | On hover
    当鼠标悬停时
    显示动画 | On parent hover
    当鼠标悬停
    在父级元素时  
    | 显示动画 |
    | --- |
    | faa-wrench animated |
    | faa-ring animated |
    | faa-horizontal animated |
    | faa-vertical animated |
    | faa-flash animated |
    | faa-bounce animated |
    | faa-spin animated |
    | faa-tada animated |
    | faa-pulse animated |
    | faa-shake animated |
    | faa-tada animated |
    | faa-passing animated |
    | faa-passing-reverse animated |
    | faa-burst animated |
    | faa-falling animated |
    | faa-rising animated |

4.  On DOM load（当页面加载时显示动画）

{% tip warning faa-horizontal animated %}warning{% endtip %}
{% tip ban faa-flash animated %}ban{% endtip %}

2. 调整动画速度。

{% tip warning faa-horizontal animated faa-fast %}warning{% endtip %}
{% tip ban faa-flash animated faa-slow %}ban{% endtip %}

3. On hover（当鼠标悬停时显示动画）

{% tip warning faa-horizontal animated-hover %}warning{% endtip %}
{% tip ban faa-flash animated-hover %}ban{% endtip %}

4. On parent hover（当鼠标悬停在父级元素时显示动画）

{% tip warning faa-parent animated-hover %}
warning
ban

1. On DOM load（当页面加载时显示动画）

```markdown
{% tip warning faa-horizontal animated %}warning{% endtip %}
{% tip ban faa-flash animated %}ban{% endtip %}
```

2. 调整动画速度

```markdown
{% tip warning faa-horizontal animated faa-fast %}warning{% endtip %}
{% tip ban faa-flash animated faa-slow %}ban{% endtip %}
```

3. On hover（当鼠标悬停时显示动画）

```markdown
{% tip warning faa-horizontal animated-hover %}warning{% endtip %}
{% tip ban faa-flash animated-hover %}ban{% endtip %}
```

4. On parent hover（当鼠标悬停在父级元素时显示动画）

```markdown
{% tip warning faa-parent animated-hover %}<p class="faa-horizontal">warning</p>{% endtip %}
{% tip ban faa-parent animated-hover %}<p class="faa-flash">ban</p>{% endtip %}
```

{% endtabs%}

## 复选列表 checkbox

{% tabs checkbox,3 %}

```markdown
{% checkbox 样式参数（可选）, 文本（支持简单md） %}
```

1. 样式: plus, minus, times
2. 颜色: {% span red, red %},{% span yellow, yellow %},{% span green, green %},{% span cyan, cyan %},{% span blue, blue %},{% span gray, gray %}
3. 选中状态: checked

{% checkbox 纯文本测试 %}
{% checkbox checked, 支持简单的 [markdown](https://guides.github.com/features/mastering-markdown/) 语法 %}
{% checkbox red, 支持自定义颜色 %}
{% checkbox green checked, 绿色 + 默认选中 %}
{% checkbox yellow checked, 黄色 + 默认选中 %}
{% checkbox cyan checked, 青色 + 默认选中 %}
{% checkbox blue checked, 蓝色 + 默认选中 %}
{% checkbox plus green checked, 增加 %}
{% checkbox minus yellow checked, 减少 %}
{% checkbox times red checked, 叉 %}

```markdown
{% checkbox 纯文本测试 %}
{% checkbox checked, 支持简单的 [markdown](https://guides.github.com/features/mastering-markdown/) 语法 %}
{% checkbox red, 支持自定义颜色 %}
{% checkbox green checked, 绿色 + 默认选中 %}
{% checkbox yellow checked, 黄色 + 默认选中 %}
{% checkbox cyan checked, 青色 + 默认选中 %}
{% checkbox blue checked, 蓝色 + 默认选中 %}
{% checkbox plus green checked, 增加 %}
{% checkbox minus yellow checked, 减少 %}
{% checkbox times red checked, 叉 %}
```

{% endtabs%}

## 单选列表 radio

{% tabs radio,3 %}

```markdown
{% radio 样式参数（可选）, 文本（支持简单md） %}
```

1. 颜色: {% span red, red %},{% span yellow, yellow %},{% span green, green %},{% span cyan, cyan %},{% span blue, blue %},{% span gray, gray %}
2. 选中状态: checked

{% radio 纯文本测试 %}
{% radio checked, 支持简单的 [markdown](https://guides.github.com/features/mastering-markdown/) 语法 %}
{% radio red, 支持自定义颜色 %}
{% radio green, 绿色 %}
{% radio yellow, 黄色 %}
{% radio cyan, 青色 %}
{% radio blue, 蓝色 %}

```markdown
{% radio 纯文本测试 %}
{% radio checked, 支持简单的 [markdown](https://guides.github.com/features/mastering-markdown/) 语法 %}
{% radio red, 支持自定义颜色 %}
{% radio green, 绿色 %}
{% radio yellow, 黄色 %}
{% radio cyan, 青色 %}
{% radio blue, 蓝色 %}
```

{% endtabs%}

## 时间轴 timeline

{% tip fa-wrench %}
插件版 v1.0.16 以后，为避免与 Butterfly_v4.0+版本中的 timeline 外挂标签冲突，已经移除了插件内的 timeline 外挂标签，请低于 Butterfly_v4.0 的用户升级主题或安装 1.0.15 版本的外挂标签插件，或者自行添加 timeline.js 和 timeline.styl 文件至对应文件夹。请使用了原有 timeline 外挂标签的用户受累替换语法格式。
Butterfly_v4.0+自带的 timeline 外挂标签样式更加好看。语法语意也更加清晰。
{% endtip %}

{% tabs timeline,2 %}

```markdown
{% timeline 时间线标题（可选）[,color] %}

<!-- timeline 时间节点（标题） -->

正文内容

<!-- endtimeline -->
<!-- timeline 时间节点（标题） -->

正文内容

<!-- endtimeline -->

{% endtimeline %}
```

| 参数                                                             | 解释        |
| ---------------------------------------------------------------- | ----------- |
| title                                                            | 标题/时间线 |
| color                                                            | `timeline`  |
| 颜色:default(留空) / blue / pink / red / purple / orange / green |             |

{% timeline 时间轴样式,blue %}

1. 如果有 `hexo-lazyload-image` 插件，需要删除并重新安装最新版本，设置 `lazyload.isSPA: true`。
2. 2.x 版本的 css 和 js 不适用于 3.x 版本，如果使用了 `use_cdn: true` 则需要删除。
3. 2.x 版本的 fancybox 标签在 3.x 版本中被重命名为 gallery 。
4. 2.x 版本的置顶 `top: true` 改为了 `pin: true`，并且同样适用于 `layout: page` 的页面。
5. 如果使用了 `hexo-offline` 插件，建议卸载，3.0 版本默认开启了 pjax 服务。

不需要额外处理。

1. 全局搜索 `seotitle` 并替换为 `seo_title`。
2. group 组件的索引规则有变，使用 group 组件的文章内，`group: group_name` 对应的组件名必须是 `group_name`。
3. group 组件的列表名优先显示文章的 `short_title` 其次是 `title`。

{% endtimeline %}

```markdown
{% timeline 时间轴样式,blue %}

<!-- timeline 2020-07-24 [2.6.6 -> 3.0](https://github.com/volantis-x/hexo-theme-volantis/releases) -->

1. 如果有 `hexo-lazyload-image` 插件，需要删除并重新安装最新版本，设置 `lazyload.isSPA: true`。
2. 2.x 版本的 css 和 js 不适用于 3.x 版本，如果使用了 `use_cdn: true` 则需要删除。
3. 2.x 版本的 fancybox 标签在 3.x 版本中被重命名为 gallery 。
4. 2.x 版本的置顶 `top: true` 改为了 `pin: true`，并且同样适用于 `layout: page` 的页面。
5. 如果使用了 `hexo-offline` 插件，建议卸载，3.0 版本默认开启了 pjax 服务。

<!-- endtimeline -->

<!-- timeline 2020-05-15 [2.6.3 -> 2.6.6](https://github.com/volantis-x/hexo-theme-volantis/releases/tag/2.6.6) -->

不需要额外处理。

<!-- endtimeline -->

<!-- timeline 2020-04-20 [2.6.2 -> 2.6.3](https://github.com/volantis-x/hexo-theme-volantis/releases/tag/2.6.3) -->

1. 全局搜索 `seotitle` 并替换为 `seo_title`。
2. group 组件的索引规则有变，使用 group 组件的文章内，`group: group_name` 对应的组件名必须是 `group_name`。
3. group 组件的列表名优先显示文章的 `short_title` 其次是 `title`。

<!-- endtimeline -->

{% endtimeline %}
```

{% endtabs%}

## 链接卡片 link

{% tabs link,2 %}

```markdown
{% link 标题, 链接, 图片链接（可选） %}
```

{% link 糖果屋教程贴, [https://akilar.top/posts/615e2dec/](https://akilar.top/posts/615e2dec/), [https://npm.elemecdn.com/akilar-candyassets/image/siteicon/favicon.ico](https://npm.elemecdn.com/akilar-candyassets/image/siteicon/favicon.ico) %}

```markdown
{% link 糖果屋教程贴, https://akilar.top/posts/615e2dec/, https://npm.elemecdn.com/akilar-candyassets/image/siteicon/favicon.ico %}
```

{% endtabs%}

## 按钮 btns

{% note blue 'fas fa-bullhorn' simple %}
`Volantis`的按钮使用的是`btn`和`btns`标签。`btns`和`butterfly`的`button`不冲突，但是`btn`会被强制渲染，导致部分参数失效,而且`btn`的效果还是`butterfly`的`button`更好看些。所以就只适配了`btns`。
{% endnote %}
{% tabs btn,3 %}

```markdown
{% btns 样式参数 %}
{% cell 标题, 链接, 图片或者图标 %}
{% cell 标题, 链接, 图片或者图标 %}
{% endbtns %}
```

1.  圆角样式：rounded, circle
2.  增加文字样式：可以在容器内增加 `<b>标题</b>`和`<p>描述文字</p>`
3.  布局方式：
    默认为自动宽度，适合视野内只有一两个的情况。  
    | 参数 | 含义 |
    | --- | --- |
    | wide | 宽一点的按钮 |
    | fill | 填充布局，自动铺满至少一行，多了会换行 |
    | center | 居中，按钮之间是固定间距 |
    | around | 居中分散 |
    | grid2 | 等宽最多 2 列，屏幕变窄会适当减少列数 |
    | grid3 | 等宽最多 3 列，屏幕变窄会适当减少列数 |
    | grid4 | 等宽最多 4 列，屏幕变窄会适当减少列数 |
    | grid5 | 等宽最多 5 列，屏幕变窄会适当减少列数 |

4.  如果需要显示类似「团队成员」之类的一组含有头像的链接：

{% btns circle grid5 %}
{% cell xaoxuu, [https://xaoxuu.com](https://xaoxuu.com), [https://cdn.jsdelivr.net/gh/xaoxuu/cdn-assets/avatar/avatar.png](https://cdn.jsdelivr.net/gh/xaoxuu/cdn-assets/avatar/avatar.png) %}
{% cell xaoxuu, [https://xaoxuu.com](https://xaoxuu.com), [https://cdn.jsdelivr.net/gh/xaoxuu/cdn-assets/avatar/avatar.png](https://cdn.jsdelivr.net/gh/xaoxuu/cdn-assets/avatar/avatar.png) %}
{% cell xaoxuu, [https://xaoxuu.com](https://xaoxuu.com), [https://cdn.jsdelivr.net/gh/xaoxuu/cdn-assets/avatar/avatar.png](https://cdn.jsdelivr.net/gh/xaoxuu/cdn-assets/avatar/avatar.png) %}
{% cell xaoxuu, [https://xaoxuu.com](https://xaoxuu.com), [https://cdn.jsdelivr.net/gh/xaoxuu/cdn-assets/avatar/avatar.png](https://cdn.jsdelivr.net/gh/xaoxuu/cdn-assets/avatar/avatar.png) %}
{% cell xaoxuu, [https://xaoxuu.com](https://xaoxuu.com), [https://cdn.jsdelivr.net/gh/xaoxuu/cdn-assets/avatar/avatar.png](https://cdn.jsdelivr.net/gh/xaoxuu/cdn-assets/avatar/avatar.png) %}
{% endbtns %}

2. 或者含有图标的按钮：

{% btns rounded grid5 %}
{% cell 下载源码, /, fas fa-download %}
{% cell 查看文档, /, fas fa-book-open %}
{% endbtns %}

3. 圆形图标 + 标题 + 描述 + 图片 + 网格 5 列 + 居中

{% btns circle center grid5 %}
[

**心率管家**
{% p red, 专业版 %}

]([https://apps.apple.com/cn/app/heart-mate-pro-hrm-utility/id1463348922?ls=1](https://apps.apple.com/cn/app/heart-mate-pro-hrm-utility/id1463348922?ls=1))![](https://cdn.jsdelivr.net/gh/xaoxuu/cdn-assets/qrcode/heartmate_pro.png#crop=0&crop=0&crop=1&crop=1&id=AECMh&originHeight=300&originWidth=300&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=#crop=0&crop=0&crop=1&crop=1&id=eYTCY&originHeight=300&originWidth=300&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
[

**心率管家**
{% p green, 免费版 %}

]([https://apps.apple.com/cn/app/heart-mate-lite-hrm-utility/id1475747930?ls=1](https://apps.apple.com/cn/app/heart-mate-lite-hrm-utility/id1475747930?ls=1))![](https://cdn.jsdelivr.net/gh/xaoxuu/cdn-assets/qrcode/heartmate_lite.png#crop=0&crop=0&crop=1&crop=1&id=yMdZG&originHeight=300&originWidth=300&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=#crop=0&crop=0&crop=1&crop=1&id=gQS9j&originHeight=300&originWidth=300&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
{% endbtns %}

1. 如果需要显示类似「团队成员」之类的一组含有头像的链接：

```markdown
{% btns circle grid5 %}
{% cell xaoxuu, https://xaoxuu.com, https://cdn.jsdelivr.net/gh/xaoxuu/cdn-assets/avatar/avatar.png %}
{% cell xaoxuu, https://xaoxuu.com, https://cdn.jsdelivr.net/gh/xaoxuu/cdn-assets/avatar/avatar.png %}
{% cell xaoxuu, https://xaoxuu.com, https://cdn.jsdelivr.net/gh/xaoxuu/cdn-assets/avatar/avatar.png %}
{% cell xaoxuu, https://xaoxuu.com, https://cdn.jsdelivr.net/gh/xaoxuu/cdn-assets/avatar/avatar.png %}
{% cell xaoxuu, https://xaoxuu.com, https://cdn.jsdelivr.net/gh/xaoxuu/cdn-assets/avatar/avatar.png %}
{% endbtns %}
```

2. 或者含有图标的按钮：

```markdown
{% btns rounded grid5 %}
{% cell 下载源码, /, fas fa-download %}
{% cell 查看文档, /, fas fa-book-open %}
{% endbtns %}
```

3. 圆形图标 + 标题 + 描述 + 图片 + 网格 5 列 + 居中

```markdown
{% btns circle center grid5 %}
<a href='https://apps.apple.com/cn/app/heart-mate-pro-hrm-utility/id1463348922?ls=1'>
<i class='fab fa-apple'></i>
<b>心率管家</b>
{% p red, 专业版 %}
<img src='https://cdn.jsdelivr.net/gh/xaoxuu/cdn-assets/qrcode/heartmate_pro.png'>
</a>
<a href='https://apps.apple.com/cn/app/heart-mate-lite-hrm-utility/id1475747930?ls=1'>
<i class='fab fa-apple'></i>
<b>心率管家</b>
{% p green, 免费版 %}
<img src='https://cdn.jsdelivr.net/gh/xaoxuu/cdn-assets/qrcode/heartmate_lite.png'>
</a>
{% endbtns %}
```

{% endtabs%}

## github 卡片 ghcard

{% note blue 'fas fa-bullhorn' modern %}
ghcard 使用了`github-readme-stats`的 API，支持直接使用 markdown 语法来写。
{% endnote %}

{% tabs ghcard,3 %}

```markdown
{% ghcard 用户名, 其它参数（可选） %}
{% ghcard 用户名/仓库, 其它参数（可选） %}
```

更多参数可以参考：
{% ghcard anuraghazra/github-readme-stats %}
使用`,`分割各个参数。写法为：`参数名=参数值`
以下只写几个常用参数值。

| 参数名        | 取值                                                                                                      | 释义                             |
| ------------- | --------------------------------------------------------------------------------------------------------- | -------------------------------- |
| hide          | stars,commits,prs,issues,contribs                                                                         | 隐藏指定统计                     |
| count_private | true                                                                                                      | 将私人项目贡献添加到总提交计数中 |
| show_icons    | true                                                                                                      | 显示图标                         |
| theme         | 请查阅[Available Themes](https://github.com/anuraghazra/github-readme-stats/blob/master/themes/README.md) | 主题                             |

1.  用户信息卡片  
    | {% ghcard xaoxuu %} | {% ghcard xaoxuu, theme=vue %} |
    | --- | --- |
    | {% ghcard xaoxuu, theme=buefy %} | {% ghcard xaoxuu, theme=solarized-light %} |
    | {% ghcard xaoxuu, theme=onedark %} | {% ghcard xaoxuu, theme=solarized-dark %} |
    | {% ghcard xaoxuu, theme=algolia %} | {% ghcard xaoxuu, theme=calm %} |

2.  仓库信息卡片  
    | {% ghcard volantis-x/hexo-theme-volantis %} | {% ghcard volantis-x/hexo-theme-volantis, theme=vue %} |
    | --- | --- |
    | {% ghcard volantis-x/hexo-theme-volantis, theme=buefy %} | {% ghcard volantis-x/hexo-theme-volantis, theme=solarized-light %} |
    | {% ghcard volantis-x/hexo-theme-volantis, theme=onedark %} | {% ghcard volantis-x/hexo-theme-volantis, theme=solarized-dark %} |
    | {% ghcard volantis-x/hexo-theme-volantis, theme=algolia %} | {% ghcard volantis-x/hexo-theme-volantis, theme=calm %} |

3.  用户信息卡片

```markdown
| {% ghcard xaoxuu %}                | {% ghcard xaoxuu, theme=vue %}             |
| ---------------------------------- | ------------------------------------------ |
| {% ghcard xaoxuu, theme=buefy %}   | {% ghcard xaoxuu, theme=solarized-light %} |
| {% ghcard xaoxuu, theme=onedark %} | {% ghcard xaoxuu, theme=solarized-dark %}  |
| {% ghcard xaoxuu, theme=algolia %} | {% ghcard xaoxuu, theme=calm %}            |
```

2. 仓库信息卡片

```markdown
| {% ghcard volantis-x/hexo-theme-volantis %}                | {% ghcard volantis-x/hexo-theme-volantis, theme=vue %}             |
| ---------------------------------------------------------- | ------------------------------------------------------------------ |
| {% ghcard volantis-x/hexo-theme-volantis, theme=buefy %}   | {% ghcard volantis-x/hexo-theme-volantis, theme=solarized-light %} |
| {% ghcard volantis-x/hexo-theme-volantis, theme=onedark %} | {% ghcard volantis-x/hexo-theme-volantis, theme=solarized-dark %}  |
| {% ghcard volantis-x/hexo-theme-volantis, theme=algolia %} | {% ghcard volantis-x/hexo-theme-volantis, theme=calm %}            |
```

{% endtabs%}

## github 徽标 ghbdage

{% tip cogs %}
关于 ghbdage 参数的更多具体用法可以参看站内教程：[添加 github 徽标](/posts/e87ad7f8)
{% endtip %}
{% tabs ghbdage,3 %}

```markdown
{% bdage [right],[left],[logo]||[color],[link],[title]||[option] %}
```

1. `left`：徽标左边的信息，必选参数。
2. `right`: 徽标右边的信息，必选参数，
3. `logo`：徽标图标，图标名称详见[simpleicons](https://simpleicons.org/)，可选参数。
4. `color`：徽标右边的颜色，可选参数。
5. `link`：指向的链接，可选参数。
6. `title`：徽标的额外信息，可选参数。主要用于优化 SEO，但`object`标签不会像`a`标签一样在鼠标悬停显示`title`信息。
7. `option`：自定义参数，支持[shields.io](https://shields.io/)的全部 API 参数支持，具体参数可以参看上文中的拓展写法示例。形式为`name1=value2&name2=value2`。

{% note info modern %}
本外挂标签的参数分为三组，用`||`分割。
{% endnote %}

1. 基本参数

{% bdage Theme,Butterfly %}
{% bdage Frame,Hexo,hexo %} 2. 信息参数

{% bdage CDN,JsDelivr,jsDelivr||abcdef,https://metroui.org.ua/index.html,本站使用JsDelivr为静态资源提供CDN加速 %}
{% bdage Source,GitHub,GitHub||,[https://github.com/](https://github.com/) %} 3. 拓展参数

{% bdage Hosted,Vercel,Vercel||brightgreen,https://vercel.com/,本站采用双线部署，默认线路托管于Vercel||style=social&logoWidth=40 %}
{% bdage Hosted,Vercel,Vercel||||style=social&logoWidth=40&logoColor=violet %}

{% note info modern %}
本外挂标签的参数分为三组，用`||`分割。
{% endnote %}

1. 基本参数,定义徽标左右文字和图标

```markdown
{% bdage Theme,Butterfly %}
{% bdage Frame,Hexo,hexo %}
```

2. 信息参数，定义徽标右侧内容背景色，指向链接

```markdown
{% bdage CDN,JsDelivr,jsDelivr||abcdef,https://metroui.org.ua/index.html,本站使用JsDelivr为静态资源提供CDN加速 %}
//如果是跨顺序省略可选参数，仍然需要写个逗号,用作分割
{% bdage Source,GitHub,GitHub||,https://github.com/ %}
```

3. 拓展参数，支持 shields 的 API 的全部参数内容

```markdown
{% bdage Hosted,Vercel,Vercel||brightgreen,https://vercel.com/,本站采用双线部署，默认线路托管于Vercel||style=social&logoWidth=20 %}
//如果是跨顺序省略可选参数组，仍然需要写双竖线||用作分割
{% bdage Hosted,Vercel,Vercel||||style=social&logoWidth=20&logoColor=violet %}
```

{% endtabs%}

## 网站卡片 sites

{% tabs site,2 %}

```markdown
{% sitegroup %}
{% site 标题, url=链接, screenshot=截图链接, avatar=头像链接（可选）, description=描述（可选） %}
{% site 标题, url=链接, screenshot=截图链接, avatar=头像链接（可选）, description=描述（可选） %}
{% endsitegroup %}
```

{% sitegroup %}
{% site xaoxuu, url=https://xaoxuu.com, screenshot=https://i.loli.net/2020/08/21/VuSwWZ1xAeUHEBC.jpg, avatar=https://cdn.jsdelivr.net/gh/xaoxuu/cdn-assets/avatar/avatar.png, description=简约风格 %}
{% site inkss, url=https://inkss.cn, screenshot=https://i.loli.net/2020/08/21/Vzbu3i8fXs6Nh5Y.jpg, avatar=https://cdn.jsdelivr.net/gh/inkss/common@master/static/web/avatar.jpg, description=这是一段关于这个网站的描述文字 %}
{% site MHuiG, url=https://blog.mhuig.top, screenshot=https://i.loli.net/2020/08/22/d24zpPlhLYWX6D1.png, avatar=https://cdn.jsdelivr.net/gh/MHuiG/imgbed@master/data/p.png, description=这是一段关于这个网站的描述文字 %}
{% site Colsrch, url=https://colsrch.top, screenshot=https://i.loli.net/2020/08/22/dFRWXm52OVu8qfK.png, avatar=https://cdn.jsdelivr.net/gh/Colsrch/images/Colsrch/avatar.jpg, description=这是一段关于这个网站的描述文字 %}
{% site Linhk1606, url=https://linhk1606.github.io, screenshot=https://i.loli.net/2020/08/21/3PmGLCKicnfow1x.png, avatar=https://i.loli.net/2020/02/09/PN7I5RJfFtA93r2.png, description=这是一段关于这个网站的描述文字 %}
{% endsitegroup %}

```markdown
{% sitegroup %}
{% site xaoxuu, url=https://xaoxuu.com, screenshot=https://i.loli.net/2020/08/21/VuSwWZ1xAeUHEBC.jpg, avatar=https://cdn.jsdelivr.net/gh/xaoxuu/cdn-assets/avatar/avatar.png, description=简约风格 %}
{% site inkss, url=https://inkss.cn, screenshot=https://i.loli.net/2020/08/21/Vzbu3i8fXs6Nh5Y.jpg, avatar=https://cdn.jsdelivr.net/gh/inkss/common@master/static/web/avatar.jpg, description=这是一段关于这个网站的描述文字 %}
{% site MHuiG, url=https://blog.mhuig.top, screenshot=https://i.loli.net/2020/08/22/d24zpPlhLYWX6D1.png, avatar=https://cdn.jsdelivr.net/gh/MHuiG/imgbed@master/data/p.png, description=这是一段关于这个网站的描述文字 %}
{% site Colsrch, url=https://colsrch.top, screenshot=https://i.loli.net/2020/08/22/dFRWXm52OVu8qfK.png, avatar=https://cdn.jsdelivr.net/gh/Colsrch/images/Colsrch/avatar.jpg, description=这是一段关于这个网站的描述文字 %}
{% site Linhk1606, url=https://linhk1606.github.io, screenshot=https://i.loli.net/2020/08/21/3PmGLCKicnfow1x.png, avatar=https://i.loli.net/2020/02/09/PN7I5RJfFtA93r2.png, description=这是一段关于这个网站的描述文字 %}
{% endsitegroup %}
```

{% endtabs%}

## 行内图片 inlineimage

{% tabs inlineimage,3 %}

```markdown
{% inlineimage 图片链接, height=高度（可选） %}
```

1. 高度：height=20px

这是 {% inlineimage [https://cdn.jsdelivr.net/gh/volantis-x/cdn-emoji/aru-l/0000.gif](https://cdn.jsdelivr.net/gh/volantis-x/cdn-emoji/aru-l/0000.gif) %} 一段话。

这又是 {% inlineimage [https://cdn.jsdelivr.net/gh/volantis-x/cdn-emoji/aru-l/5150.gif](https://cdn.jsdelivr.net/gh/volantis-x/cdn-emoji/aru-l/5150.gif), height=40px %} 一段话。

```markdown
这是 {% inlineimage https://cdn.jsdelivr.net/gh/volantis-x/cdn-emoji/aru-l/0000.gif %} 一段话。

这又是 {% inlineimage https://cdn.jsdelivr.net/gh/volantis-x/cdn-emoji/aru-l/5150.gif, height=40px %} 一段话。
```

{% endtabs%}

## 单张图片 image

{% tabs image,3 %}

```markdown
{% image 链接, width=宽度（可选）, height=高度（可选）, alt=描述（可选）, bg=占位颜色（可选） %}
```

1. 图片宽度高度：width=300px, height=32px
2. 图片描述：alt=图片描述（butterfly 需要在主题配置文件中开启图片描述）
3. 占位背景色：bg=#f2f2f2
4. 添加描述：

{% image [https://cdn.jsdelivr.net/gh/volantis-x/cdn-wallpaper-minimalist/2020/025.jpg](https://cdn.jsdelivr.net/gh/volantis-x/cdn-wallpaper-minimalist/2020/025.jpg), alt=每天下课回宿舍的路，没有什么故事。 %}

2. 指定宽度：

{% image [https://cdn.jsdelivr.net/gh/volantis-x/cdn-wallpaper-minimalist/2020/025.jpg](https://cdn.jsdelivr.net/gh/volantis-x/cdn-wallpaper-minimalist/2020/025.jpg), width=400px %}

3. 指定宽度并添加描述：

{% image [https://cdn.jsdelivr.net/gh/volantis-x/cdn-wallpaper-minimalist/2020/025.jpg](https://cdn.jsdelivr.net/gh/volantis-x/cdn-wallpaper-minimalist/2020/025.jpg), width=400px, alt=每天下课回宿舍的路，没有什么故事。 %}

4. 设置占位背景色：

{% image [https://cdn.jsdelivr.net/gh/volantis-x/cdn-wallpaper-minimalist/2020/025.jpg](https://cdn.jsdelivr.net/gh/volantis-x/cdn-wallpaper-minimalist/2020/025.jpg), width=400px, bg=#1D0C04, alt=优化不同宽度浏览的观感 %}

1. 添加描述：

```markdown
{% image https://cdn.jsdelivr.net/gh/volantis-x/cdn-wallpaper-minimalist/2020/025.jpg, alt=每天下课回宿舍的路，没有什么故事。 %}
```

2. 指定宽度：

```markdown
{% image https://cdn.jsdelivr.net/gh/volantis-x/cdn-wallpaper-minimalist/2020/025.jpg, width=400px %}
```

3. 指定宽度并添加描述：

```markdown
{% image https://cdn.jsdelivr.net/gh/volantis-x/cdn-wallpaper-minimalist/2020/025.jpg, width=400px, alt=每天下课回宿舍的路，没有什么故事。 %}
```

4. 设置占位背景色：

```markdown
{% image https://cdn.jsdelivr.net/gh/volantis-x/cdn-wallpaper-minimalist/2020/025.jpg, width=400px, bg=#1D0C04, alt=优化不同宽度浏览的观感 %}
```

{% endtabs%}

## 音频 audio

{% tabs audio,2 %}

```markdown
{% audio 音频链接 %}
```

{% audio [https://github.com/volantis-x/volantis-docs/releases/download/assets/Lumia1020.mp3](https://github.com/volantis-x/volantis-docs/releases/download/assets/Lumia1020.mp3) %}

```markdown
{% audio https://github.com/volantis-x/volantis-docs/releases/download/assets/Lumia1020.mp3 %}
```

{% endtabs%}

## 视频 video

{% tabs video,3 %}

```markdown
{% video 视频链接 %}
```

1. 对其方向：left, center, right
2. 列数：逗号后面直接写列数，支持 1 ～ 4 列。
3. 100%宽度

{% video [https://github.com/volantis-x/volantis-docs/releases/download/assets/IMG_0341.mov](https://github.com/volantis-x/volantis-docs/releases/download/assets/IMG_0341.mov) %}

2. 50%宽度
   {% videos, 2 %}
   {% video [https://github.com/volantis-x/volantis-docs/releases/download/assets/IMG_0341.mov](https://github.com/volantis-x/volantis-docs/releases/download/assets/IMG_0341.mov) %}
   {% video [https://github.com/volantis-x/volantis-docs/releases/download/assets/IMG_0341.mov](https://github.com/volantis-x/volantis-docs/releases/download/assets/IMG_0341.mov) %}
   {% video [https://github.com/volantis-x/volantis-docs/releases/download/assets/IMG_0341.mov](https://github.com/volantis-x/volantis-docs/releases/download/assets/IMG_0341.mov) %}
   {% video [https://github.com/volantis-x/volantis-docs/releases/download/assets/IMG_0341.mov](https://github.com/volantis-x/volantis-docs/releases/download/assets/IMG_0341.mov) %}
   {% endvideos %}
3. 25%宽度

{% videos, 4 %}
{% video [https://github.com/volantis-x/volantis-docs/releases/download/assets/IMG_0341.mov](https://github.com/volantis-x/volantis-docs/releases/download/assets/IMG_0341.mov) %}
{% video [https://github.com/volantis-x/volantis-docs/releases/download/assets/IMG_0341.mov](https://github.com/volantis-x/volantis-docs/releases/download/assets/IMG_0341.mov) %}
{% video [https://github.com/volantis-x/volantis-docs/releases/download/assets/IMG_0341.mov](https://github.com/volantis-x/volantis-docs/releases/download/assets/IMG_0341.mov) %}
{% video [https://github.com/volantis-x/volantis-docs/releases/download/assets/IMG_0341.mov](https://github.com/volantis-x/volantis-docs/releases/download/assets/IMG_0341.mov) %}
{% video [https://github.com/volantis-x/volantis-docs/releases/download/assets/IMG_0341.mov](https://github.com/volantis-x/volantis-docs/releases/download/assets/IMG_0341.mov) %}
{% video [https://github.com/volantis-x/volantis-docs/releases/download/assets/IMG_0341.mov](https://github.com/volantis-x/volantis-docs/releases/download/assets/IMG_0341.mov) %}
{% video [https://github.com/volantis-x/volantis-docs/releases/download/assets/IMG_0341.mov](https://github.com/volantis-x/volantis-docs/releases/download/assets/IMG_0341.mov) %}
{% video [https://github.com/volantis-x/volantis-docs/releases/download/assets/IMG_0341.mov](https://github.com/volantis-x/volantis-docs/releases/download/assets/IMG_0341.mov) %}
{% endvideos %}

1. 100%宽度

```markdown
{% video https://github.com/volantis-x/volantis-docs/releases/download/assets/IMG_0341.mov %}
```

2. 50%宽度

```markdown
{% videos, 2 %}
{% video https://github.com/volantis-x/volantis-docs/releases/download/assets/IMG_0341.mov %}
{% video https://github.com/volantis-x/volantis-docs/releases/download/assets/IMG_0341.mov %}
{% video https://github.com/volantis-x/volantis-docs/releases/download/assets/IMG_0341.mov %}
{% video https://github.com/volantis-x/volantis-docs/releases/download/assets/IMG_0341.mov %}
{% endvideos %}
```

3. 25%宽度

```markdown
{% videos, 4 %}
{% video https://github.com/volantis-x/volantis-docs/releases/download/assets/IMG_0341.mov %}
{% video https://github.com/volantis-x/volantis-docs/releases/download/assets/IMG_0341.mov %}
{% video https://github.com/volantis-x/volantis-docs/releases/download/assets/IMG_0341.mov %}
{% video https://github.com/volantis-x/volantis-docs/releases/download/assets/IMG_0341.mov %}
{% video https://github.com/volantis-x/volantis-docs/releases/download/assets/IMG_0341.mov %}
{% video https://github.com/volantis-x/volantis-docs/releases/download/assets/IMG_0341.mov %}
{% video https://github.com/volantis-x/volantis-docs/releases/download/assets/IMG_0341.mov %}
{% video https://github.com/volantis-x/volantis-docs/releases/download/assets/IMG_0341.mov %}
{% endvideos %}
```

{% endtabs%}

## 相册 gallery

{% note blue 'fas fa-bullhorn' disabled %}
`Butterfly`自带`gallery`相册，而且会根据图片大小自动调整排版，效果比`Volantis`的`gallery`更好，故不再收录`Volantis`的`gallery`标签。
{% endnote %}
{% note %}
以下为`Butterfly`自带的`gallery`标签写法。相册图库和相册配合使用。
{% endnote %}

{% tabs gallery,3 %}

1. gallerygroup 相册图库

```markdown
<div class="gallery-group-main">
{% galleryGroup name description link img-url %}
{% galleryGroup name description link img-url %}
{% galleryGroup name description link img-url %}
</div>
```

2. gallery 相册

```markdown
{% gallery %}
markdown 圖片格式
{% endgallery %}
```

- gallerygroup 相册图库  
  | 参数名 | 释义 |
  | --- | --- |
  | name | 图库名字 |
  | description | 图库描述 |
  | link | 链接到对应相册的地址 |
  | img-url | 图库封面 |

{% note info %}
思维拓展一下，相册图库的实质其实就是个快捷方式，可以自定义添加描述、封面、链接。那么我们未必要把它当做一个相册，完全可以作为一个链接卡片，链接到视频、QQ、友链都是不错的选择。
{% endnote %}

- gallery 相册
  区别于旧版的 Gallery 相册,新的 Gallery 相册会自动根据图片长度进行排版，书写也更加方便，与 markdown 格式一样。可根据需要插入到相应的 md。无需再自己配置长宽。**建议在粘贴时故意使用长短、大小、横竖不一的图片**，会有更好的效果。（尺寸完全相同的图片只会平铺输出，效果很糟糕）
- gallerygroup 相册图库
- gallery 相册

{% gallery %}
![](https://i.loli.net/2019/12/25/Fze9jchtnyJXMHN.jpg#crop=0&crop=0&crop=1&crop=1&id=nxDig&originHeight=642&originWidth=900&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=#crop=0&crop=0&crop=1&crop=1&id=yi4aj&originHeight=642&originWidth=900&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
![](https://i.loli.net/2019/12/25/ryLVePaqkYm4TEK.jpg#crop=0&crop=0&crop=1&crop=1&id=uFN68&originHeight=642&originWidth=900&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=#crop=0&crop=0&crop=1&crop=1&id=a92Pe&originHeight=642&originWidth=900&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
![](https://i.loli.net/2019/12/25/gEy5Zc1Ai6VuO4N.jpg#crop=0&crop=0&crop=1&crop=1&id=iGbb9&originHeight=485&originWidth=679&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=#crop=0&crop=0&crop=1&crop=1&id=Ealyt&originHeight=485&originWidth=679&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
![](https://i.loli.net/2019/12/25/d6QHbytlSYO4FBG.jpg#crop=0&crop=0&crop=1&crop=1&id=Hx3Rf&originHeight=800&originWidth=571&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=#crop=0&crop=0&crop=1&crop=1&id=cnFOC&originHeight=800&originWidth=571&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
![](https://i.loli.net/2019/12/25/6nepIJ1xTgufatZ.jpg#crop=0&crop=0&crop=1&crop=1&id=ISADg&originHeight=800&originWidth=571&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=#crop=0&crop=0&crop=1&crop=1&id=yvaSy&originHeight=800&originWidth=571&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
![](https://i.loli.net/2019/12/25/E7Jvr4eIPwUNmzq.jpg#crop=0&crop=0&crop=1&crop=1&id=zAGYU&originHeight=800&originWidth=800&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=#crop=0&crop=0&crop=1&crop=1&id=HG3Y3&originHeight=800&originWidth=800&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
![](https://i.loli.net/2019/12/25/mh19anwBSWIkGlH.jpg#crop=0&crop=0&crop=1&crop=1&id=Zudvd&originHeight=642&originWidth=900&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=#crop=0&crop=0&crop=1&crop=1&id=qIg5Z&originHeight=642&originWidth=900&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
![](https://i.loli.net/2019/12/25/2tu9JC8ewpBFagv.jpg#crop=0&crop=0&crop=1&crop=1&id=ShOpe&originHeight=642&originWidth=900&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=#crop=0&crop=0&crop=1&crop=1&id=Xq2LZ&originHeight=642&originWidth=900&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
{% endgallery %}
{% note info %}
对于很多同学提问的`gallerygroup`和`gallery`相册页的链接问题。这里说下我个人的使用习惯。
一般使用相册图库的话，可以在导航栏加一个 gallery 的 page(**使用指令**`**hexo new page gallery**`**添加**)，里面放相册图库作为封面。然后在`[Blogroot]/source/gallery/`下面建立相应的文件夹，例如若按照这里的示例，若欲使用`/gallery/MC/`路径访问 MC 相册，则需要新建`[Blogroot]/source/gallery/MC/index.md`，并在里面填入`gallery`相册内容。
{% endnote %}

1. gallerygroup 相册图库

```markdown
<div class="gallery-group-main">
{% galleryGroup MC 在Rikkaの六花服务器里留下的足迹 '/gallery/MC/' https://npm.elemecdn.com/akilar-candyassets/image/1.jpg %}
{% galleryGroup Gundam 哦咧哇gundam哒！ '/gallery/Gundam/' https://npm.elemecdn.com/akilar-candyassets/image/20200907110508327.png %}
{% galleryGroup I-am-Akilar 某种意义上也算自拍吧 '/gallery/I-am-Akilar/' https://npm.elemecdn.com/akilar-candyassets/image/20200907113116651.png %}
</div>
```

2. gallery 相册

```markdown
{% gallery %}
![](https://i.loli.net/2019/12/25/Fze9jchtnyJXMHN.jpg)
![](https://i.loli.net/2019/12/25/ryLVePaqkYm4TEK.jpg)
![](https://i.loli.net/2019/12/25/gEy5Zc1Ai6VuO4N.jpg)
![](https://i.loli.net/2019/12/25/d6QHbytlSYO4FBG.jpg)
![](https://i.loli.net/2019/12/25/6nepIJ1xTgufatZ.jpg)
![](https://i.loli.net/2019/12/25/E7Jvr4eIPwUNmzq.jpg)
![](https://i.loli.net/2019/12/25/mh19anwBSWIkGlH.jpg)
![](https://i.loli.net/2019/12/25/2tu9JC8ewpBFagv.jpg)
{% endgallery %}
```

{% endtabs%}

## 折叠框 folding

{% note blue 'fas fa-bullhorn' disabled %}
`Butterfly`虽然也有内置折叠框`hideToggle`标签，但是`Volantis`的`folding`折叠框更好看一些。
{% endnote %}
{% tabs folding,3 %}

```markdown
{% folding 参数（可选）, 标题 %}
![](https://cdn.jsdelivr.net/gh/volantis-x/cdn-wallpaper/abstract/41F215B9-261F-48B4-80B5-4E86E165259E.jpeg)
{% endfolding %}
```

1. 颜色：blue, cyan, green, yellow, red
2. 状态：状态填写 open 代表默认打开。

{% folding 查看图片测试 %}

![](https://cdn.jsdelivr.net/gh/volantis-x/cdn-wallpaper/abstract/41F215B9-261F-48B4-80B5-4E86E165259E.jpeg#crop=0&crop=0&crop=1&crop=1&id=Yovh1&originHeight=1536&originWidth=2731&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=#crop=0&crop=0&crop=1&crop=1&id=DJYHv&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

{% endfolding %}

{% folding cyan open, 查看默认打开的折叠框 %}

这是一个默认打开的折叠框。

{% endfolding %}

{% folding green, 查看代码测试 %}

```markdown
![](https://cdn.jsdelivr.net/gh/volantis-x/cdn-wallpaper/abstract/41F215B9-261F-48B4-80B5-4E86E165259E.jpeg)
```

{% endfolding %}

{% folding yellow, 查看列表测试 %}

- haha
- hehe

{% endfolding %}

{% folding red, 查看嵌套测试 %}

{% folding blue, 查看嵌套测试2 %}

{% folding 查看嵌套测试3 %}

hahaha ![](https://cdn.jsdelivr.net/gh/volantis-x/cdn-emoji/tieba/%E6%BB%91%E7%A8%BD.png#crop=0&crop=0&crop=1&crop=1&id=yGvrA&originHeight=60&originWidth=60&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=#crop=0&crop=0&crop=1&crop=1&id=c74l3&originHeight=60&originWidth=60&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

{% endfolding %}

{% endfolding %}

{% endfolding %}

```markdown
{% folding 查看图片测试 %}

![](https://cdn.jsdelivr.net/gh/volantis-x/cdn-wallpaper/abstract/41F215B9-261F-48B4-80B5-4E86E165259E.jpeg)

{% endfolding %}

{% folding cyan open, 查看默认打开的折叠框 %}

这是一个默认打开的折叠框。

{% endfolding %}

{% folding green, 查看代码测试 %}
假装这里有代码块（代码块没法嵌套代码块）
{% endfolding %}

{% folding yellow, 查看列表测试 %}

- haha
- hehe

{% endfolding %}

{% folding red, 查看嵌套测试 %}

{% folding blue, 查看嵌套测试2 %}

{% folding 查看嵌套测试3 %}

hahaha <span><img src='https://cdn.jsdelivr.net/gh/volantis-x/cdn-emoji/tieba/%E6%BB%91%E7%A8%BD.png' style='height:24px'></span>

{% endfolding %}

{% endfolding %}

{% endfolding %}
```

{% endtabs%}

## 分栏 tab

{% note blue 'fas fa-bullhorn' disabled %}
`Butterfly`的`tab`标签和`Volantis`的`tab`标签都是移值自`NexT`主题，所以写法和效果一模一样。
{% endnote %}
{% tabs folding,3 %}

```markdown
{% tabs Unique name, [index] %}

<!-- tab [Tab caption] [@icon] -->

Any content (support inline tags too).

<!-- endtab -->

{% endtabs %}
```

1. Unique name :
   - 选项卡块标签的唯一名称，不带逗号。
   - 将在#id 中用作每个标签及其索引号的前缀。
   - 如果名称中包含空格，则对于生成#id，所有空格将由破折号代替。
   - 仅当前帖子/页面的 URL 必须是唯一的！
2. [index]:
   - 活动选项卡的索引号。
   - 如果未指定，将选择第一个标签（1）。
   - 如果 index 为-1，则不会选择任何选项卡。
   - 可选参数。
3. [Tab caption]:
   - 当前选项卡的标题。
   - 如果未指定标题，则带有制表符索引后缀的唯一名称将用作制表符的标题。
   - 如果未指定标题，但指定了图标，则标题将为空。
   - 可选参数。
4. [@icon]:
   - FontAwesome 图标名称（全名，看起来像“ fas fa-font”）
   - 可以指定带空格或不带空格；
   - 例如'Tab caption @icon' 和 'Tab caption@icon'.
   - 可选参数。

{% note primary %}
Demo 1 - 预设选择第一个【默认】
{% endnote %}

{% tabs test1 %}
**This is Tab 1.**
**This is Tab 2.**
**This is Tab 3.**
{% endtabs %}

{% note primary %}
Demo 2 - 预设选择 tabs
{% endnote %}

{% tabs test2, 3 %}
**This is Tab 1.**
**This is Tab 2.**
**This is Tab 3.**
{% endtabs %}

{% note primary %}
Demo 3 - 没有预设值
{% endnote %}

{% tabs test3, -1 %}
**This is Tab 1.**
**This is Tab 2.**
**This is Tab 3.**
{% endtabs %}

{% note primary %}
Demo 4 - 自定义 Tab 名 + 只有 icon + icon 和 Tab 名
{% endnote %}

{% tabs test4 %}
**tab 名字为第一个 Tab**
**只有图标 没有 Tab 名字**
**名字+icon**
{% endtabs %}
{% note primary %}
Demo 1 - 预设选择第一个【默认】
{% endnote %}

```markdown
{% tabs test1 %}

<!-- tab -->

**This is Tab 1.**

<!-- endtab -->

<!-- tab -->

**This is Tab 2.**

<!-- endtab -->

<!-- tab -->

**This is Tab 3.**

<!-- endtab -->

{% endtabs %}
```

{% note primary %}
Demo 2 - 预设选择 tabs
{% endnote %}

```markdown
{% tabs test2, 3 %}

<!-- tab -->

**This is Tab 1.**

<!-- endtab -->

<!-- tab -->

**This is Tab 2.**

<!-- endtab -->

<!-- tab -->

**This is Tab 3.**

<!-- endtab -->

{% endtabs %}
```

{% note primary %}
Demo 3 - 没有预设值
{% endnote %}

```markdown
{% tabs test3, -1 %}

<!-- tab -->

**This is Tab 1.**

<!-- endtab -->

<!-- tab -->

**This is Tab 2.**

<!-- endtab -->

<!-- tab -->

**This is Tab 3.**

<!-- endtab -->

{% endtabs %}
```

{% note primary %}
Demo 4 - 自定义 Tab 名 + 只有 icon + icon 和 Tab 名
{% endnote %}

```markdown
{% tabs test4 %}

<!-- tab 第一个Tab -->

**tab 名字为第一个 Tab**

<!-- endtab -->

<!-- tab @fab fa-apple-pay -->

**只有图标 没有 Tab 名字**

<!-- endtab -->

<!-- tab 炸弹@fas fa-bomb -->

**名字+icon**

<!-- endtab -->

{% endtabs %}
```

{% endtabs%}

## 数据集合 issues

{% tabs issues,3 %}

```markdown
{% issues type | api=url | group=key:value1,value2（可选） %}
```

{% span center logo large, type(类型)： %}
根据需求不同，会将 issues 内容解析成不同的 HTML 标签，目前支持的类型有：

1. 时间轴`timeline`: 解析成`timeline`标签，`issue`的标题对应`timeline`的时间，`issue`的内容对应`timeline`的内容。
2. 网站卡片`sites`: 解析成`sites`标签，需要有`JSON`代码块,各参数对应`sites`标签参数:

```json
{
  "title": "",
  "screenshot": "",
  "url": "",
  "avatar": "",
  "description": "",
  "「keywords」": ""
}
```

| 参数       | 释义               |
| ---------- | ------------------ |
| title      | 网站名称           |
| screenshot | 网站预览图         |
| url        | 网站链接，需要添加 |

`https://`
协议组成完整域名。
否则可能被识别成站点相对路径。 |
| avatar | 站长头像 |
| 「keywords」 | 分组依据，
未必要叫「keywords」，
详见下文 group(分组) |

{% span center logo large, api(接口)： %}
url 为可以调的通的 API，例如：

```
api=https://gitee.com/api/v5/repos/xaoxuu/friends/issues?sort=updated&state=open&page=1&per_page=100&labels=active
api=https://api.github.com/repos/xaoxuu/friends/issues?sort=updated&state=open&page=1&per_page=100&labels=active
```

| 参数                                                   | 释义                       |
| ------------------------------------------------------ | -------------------------- |
| [https://gitee.com/api/v5/](https://gitee.com/api/v5/) | gitee 仓库的 api           |
| [https://api.github.com/](https://api.github.com/)     | github 仓库的 api          |
| repos/xaoxuu/friends/issues                            | repos/用户名/仓库名/issues |
| sort=updated&state=open                                | 界定哪些类型的`issues`     |

会
被读取过来渲染成相应的标签 |
| page=1&per_page=100 | 读取前 100 条 issues |
| labels=active | 控制默认的 issue 不显示，
只有自己审核通过
添加了 active 标签之后才会显示 |

{% span center logo large, group(分组)： %}
`sites`类型的`issues`默认不分组，如果需要分组，可指定分组依据`「keywords」`，和分组白名单`「value1」`、`「value2」`等，例如：

```yaml
group=version:v4,v3,v2
# 此处的version就是上文中的「keywords」
```

这个参数的作用就是，筛选出`JSON`中包含`"version": "v4"`或者`"version":"v3"`或者`"version": "v2"`的数据，并分组显示。

{% span center logo large, 仓库ISSUES模板配置 %}

{% folding green,Github仓库配置方案 %}

1. 新建一个仓库，仓库名随意，这里我命名为`friend_link`,
   新建文件`friend_link\.github\ISSUE_TEMPLATE.md`,
   并在其中输入以下内容作为`issues`模板。

{% tip warning faa-horizontal animated fa-slow %}
其中的 json 代码块前面的反斜杠记得删去。此处这么写主要是为了转义，否则无法嵌套代码块。
{% endtip %}

````markdown
---
name: 友链模板
about: 请根据指示规范填写友链格式。
---

<!-- 请在下方代码块的双引号中填写 -->

\```json
{
"title": "",
"screenshot": "",
"url": "",
"avatar": "",
"description": "",
"keywords": ""
}
\```

<!--
"title": "站点名称",
"screenshot": "站点预览图链接",
"url": "站点链接",
"avatar": "头像链接",
"description": "站点描述",
"keywords": "关键词，作为分组名"
-->

<!-- 示例 -->

<!--
"title": "Akilarの糖果屋",
"screenshot": "https://cdn.jsdelivr.net/gh/Akilarlxh/ScreenShot@gh-pages/akilar.top.jpg",
"url": "https://akilar.top/",
"avatar": "https://npm.elemecdn.com/akilar-candyassets/image/siteicon/favicon.png",
"description": "期待您的光临！",
"keywords": "糖果屋"
-->
````

2. 新建 active label

![](https://npm.elemecdn.com/akilar-candyassets/image/d63b5c0c.png#crop=0&crop=0&crop=1&crop=1&id=Kt8S3&originHeight=344&originWidth=1586&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=#crop=0&crop=0&crop=1&crop=1&id=cuZqG&originHeight=344&originWidth=1586&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

![](https://npm.elemecdn.com/akilar-candyassets/image/6311f960.png#crop=0&crop=0&crop=1&crop=1&id=R6Pyu&originHeight=229&originWidth=1263&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=#crop=0&crop=0&crop=1&crop=1&id=OIQ5l&originHeight=229&originWidth=1263&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

3. 提交示例

![](https://npm.elemecdn.com/akilar-candyassets/image/f87ebfd3.png#crop=0&crop=0&crop=1&crop=1&id=X0jT3&originHeight=715&originWidth=1100&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=#crop=0&crop=0&crop=1&crop=1&id=evFu3&originHeight=715&originWidth=1100&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
![](https://npm.elemecdn.com/akilar-candyassets/image/efdfc67d.png#crop=0&crop=0&crop=1&crop=1&id=zOfIn&originHeight=224&originWidth=1361&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=#crop=0&crop=0&crop=1&crop=1&id=zD0xf&originHeight=224&originWidth=1361&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

4. 从审核通过到页面读取有一段 api 的缓存期，稍微有点耐心。

{% endfolding %}

{% folding yellow,Gitee仓库配置方案 %}

1. 新建一个仓库，仓库名随意，这里我命名为`friend_link`,
   新建文件`friend_link\.gitee\ISSUE_TEMPLATE.md`,
   并在其中输入以下内容作为`issues`模板。

{% tip warning faa-horizontal animated fa-slow %}
其中的 json 代码块前面的反斜杠记得删去。此处这么写主要是为了转义，否则无法嵌套代码块。
{% endtip %}

````markdown
---
name: 友链模板
about: 请根据指示规范填写友链格式。
---

<!-- 请在下方代码块的双引号中填写 -->

\```json
{
"title": "",
"screenshot": "",
"url": "",
"avatar": "",
"description": "",
"keywords": ""
}
\```

<!--
"title": "站点名称",
"screenshot": "站点预览图链接",
"url": "站点链接",
"avatar": "头像链接",
"description": "站点描述",
"keywords": "关键词，作为分组名"
-->

<!-- 示例 -->

<!--
"title": "Akilarの糖果屋",
"screenshot": "https://cdn.jsdelivr.net/gh/Akilarlxh/ScreenShot@gh-pages/akilar.top.jpg",
"url": "https://akilar.top/",
"avatar": "https://npm.elemecdn.com/akilar-candyassets/image/siteicon/favicon.png",
"description": "期待您的光临！",
"keywords": "糖果屋"
-->
````

2. 新建 active 标签

![](https://npm.elemecdn.com/akilar-candyassets/image/7522911b.png#crop=0&crop=0&crop=1&crop=1&id=U69lK&originHeight=495&originWidth=475&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=#crop=0&crop=0&crop=1&crop=1&id=TP5m1&originHeight=495&originWidth=475&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

3. 提交示例

![](https://npm.elemecdn.com/akilar-candyassets/image/dd334eea.png#crop=0&crop=0&crop=1&crop=1&id=VF8P3&originHeight=559&originWidth=871&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=#crop=0&crop=0&crop=1&crop=1&id=Xgqvv&originHeight=559&originWidth=871&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
![](https://npm.elemecdn.com/akilar-candyassets/image/72d06ae1.png#crop=0&crop=0&crop=1&crop=1&id=EAKWM&originHeight=599&originWidth=1316&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=#crop=0&crop=0&crop=1&crop=1&id=dzuPO&originHeight=599&originWidth=1316&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

4. 从审核通过到页面读取有一段 api 的缓存期，稍微有点耐心。

{% endfolding %}

1. 时间轴标签`timeline`渲染
   对应的仓库`issues`链接:
   {% link xaoxuu/timeline, [https://gitee.com/xaoxuu/timeline/issues](https://gitee.com/xaoxuu/timeline/issues), [https://cdn.jsdelivr.net/gh/xaoxuu/cdn-assets@master/logo/256/safari.png](https://cdn.jsdelivr.net/gh/xaoxuu/cdn-assets@master/logo/256/safari.png) %}

{% issues timeline | api=https://gitee.com/api/v5/repos/xaoxuu/timeline/issues?state=open&creator=xaoxuu&sort=created&direction=desc&page=1&per_page=100 %}

2. 网站卡片标签`sites`渲染

- gitee 仓库示例
  对应的仓库`issues`链接:
  {% link xaoxuu/friends, [https://gitee.com/xaoxuu/friends/issues](https://gitee.com/xaoxuu/friends/issues), [https://cdn.jsdelivr.net/gh/xaoxuu/cdn-assets@master/logo/256/safari.png](https://cdn.jsdelivr.net/gh/xaoxuu/cdn-assets@master/logo/256/safari.png) %}
  渲染后的标签：
  {% issues sites | api=https://gitee.com/api/v5/repos/xaoxuu/friends/issues?sort=updated&state=open&page=1&per_page=100&labels=active %}
- github 仓库示例
  对应的仓库`issues`链接:
  {% link xaoxuu/friends, [https://github.com/xaoxuu/friends/issues](https://github.com/xaoxuu/friends/issues), [https://cdn.jsdelivr.net/gh/xaoxuu/cdn-assets@master/logo/256/safari.png](https://cdn.jsdelivr.net/gh/xaoxuu/cdn-assets@master/logo/256/safari.png) %}
  渲染后的标签：
  {% issues sites | api=https://api.github.com/repos/xaoxuu/friends/issues?sort=updated&state=open&page=1&per_page=100&labels=active %}

3. 网站卡片标签`sites`分组渲染
   这是`Volantis`主题官网的「示例博客」页面的数据：
   对应的仓库`issues`链接:

{% link 如何参与项目, [https://github.com/volantis-x/examples/issues](https://github.com/volantis-x/examples/issues), [https://cdn.jsdelivr.net/gh/xaoxuu/cdn-assets@master/logo/256/safari.png](https://cdn.jsdelivr.net/gh/xaoxuu/cdn-assets@master/logo/256/safari.png) %}

渲染后的标签：

{% issues sites | api=https://api.github.com/repos/volantis-x/examples/issues?sort=updated&state=open&page=1&per_page=100 | group=version:版本：4.0,版本：3.0,版本：^2.0 %}

1. 时间轴标签`timeline`渲染

```markdown
{% issues timeline | api=https://gitee.com/api/v5/repos/xaoxuu/timeline/issues?state=open&creator=xaoxuu&sort=created&direction=desc&page=1&per_page=100 %}
```

2. 网站卡片标签`sites`渲染

- gitee 仓库示例

```markdown
{% issues sites | api=https://gitee.com/api/v5/repos/xaoxuu/friends/issues?sort=updated&state=open&page=1&per_page=100&labels=active %}
```

- github 仓库示例

```markdown
{% issues sites | api=https://api.github.com/repos/xaoxuu/friends/issues?sort=updated&state=open&page=1&per_page=100&labels=active %}
```

3. 网站卡片标签`sites`分组渲染
   这是`Volantis`主题官网的「示例博客」页面的数据：

```markdown
{% issues sites | api=https://api.github.com/repos/volantis-x/examples/issues?sort=updated&state=open&page=1&per_page=100 | group=version:版本：^4.0,版本：^3.0,版本：^2.0 %}
```

{% endtabs%}

## 诗词标签 poem

{% tabs poem,3 %}

```markdown
{% poem [title],[author] %}
诗词内容
{% endpoem %}
```

1. title：诗词标题
2. author：作者，可以不写

{% poem 水调歌头,苏轼 %}

明月几时有？把酒问青天。
不知天上宫阙，今夕是何年？
我欲乘风归去，又恐琼楼玉宇，高处不胜寒。
起舞弄清影，何似在人间？
转朱阁，低绮户，照无眠。
不应有恨，何事长向别时圆？
人有悲欢离合，月有阴晴圆缺，此事古难全。
但愿人长久，千里共婵娟。
{% endpoem %}

```markdown
{% poem 水调歌头,苏轼 %}
丙辰中秋，欢饮达旦，大醉，作此篇，兼怀子由。
明月几时有？把酒问青天。
不知天上宫阙，今夕是何年？
我欲乘风归去，又恐琼楼玉宇，高处不胜寒。
起舞弄清影，何似在人间？

转朱阁，低绮户，照无眠。
不应有恨，何事长向别时圆？
人有悲欢离合，月有阴晴圆缺，此事古难全。
但愿人长久，千里共婵娟。
{% endpoem %}
```

{% endtabs%}

## 阿里图标 icon

{% tip cogs %}
本标签的图标需要自己额外引入阿里矢量图标库的样式，具体引入方案请移步：[Hexo 引入阿里矢量图标库](/posts/d2ebecef/)
{% endtip %}

{% tabs icon示例,3 %}

```markdown
{% icon [icon-xxxx],[font-size] %}
```

1. `icon-xxxx`：表示图标`font-class`,可以在自己的阿里矢量图标库项目的`font-class`引用方案内查询并复制。
2. `font-size`：表示图标大小，直接填写数字即可，单位为`em`。图标大小默认值为`1em`。  
   | {% icon icon-rat_zi %} | {% icon icon-rat,2 %} | {% icon icon-ox_chou,3 %} | {% icon icon-ox,4 %} | {% icon icon-tiger_yin,5 %} | {% icon icon-tiger,6 %} |
   | --- | --- | --- | --- | --- | --- |
   | {% icon icon-rabbit_mao,1 %} | {% icon icon-rabbit,2 %} | {% icon icon-dragon_chen,3 %} | {% icon icon-dragon,4 %} | {% icon icon-snake_si,5 %} | {% icon icon-snake,6 %} |
   | {% icon icon-horse_wu %} | {% icon icon-horse,2 %} | {% icon icon-goat_wei,3 %} | {% icon icon-goat,4 %} | {% icon icon-monkey_shen,5 %} | {% icon icon-monkey,6 %} |
   | {% icon icon-rooster_you %} | {% icon icon-rooster,2 %} | {% icon icon-dog_xu,3 %} | {% icon icon-dog,4 %} | {% icon icon-boar_hai,5 %} | {% icon icon-boar,6 %} |

```markdown
{% icon icon-rat_zi %}{% icon icon-rat,2 %}

{% icon icon-ox_chou,3 %}{% icon icon-ox,4 %}

{% icon icon-tiger_yin,5 %}{% icon icon-tiger,6 %}

{% icon icon-rabbit_mao,1 %}{% icon icon-rabbit,2 %}

{% icon icon-dragon_chen,3 %}{% icon icon-dragon,4 %}

{% icon icon-snake_si,5 %}{% icon icon-snake,6 %}

{% icon icon-horse_wu %}{% icon icon-horse,2 %}

{% icon icon-goat_wei,3 %}{% icon icon-goat,4 %}

{% icon icon-monkey_shen,5 %}{% icon icon-monkey,6 %}

{% icon icon-rooster_you %}{% icon icon-rooster,2 %}

{% icon icon-dog_xu,3 %}{% icon icon-dog,4 %}

{% icon icon-boar_hai,5 %}{% icon icon-boar,6 %}
```

{% endtabs %}

## 特效标签 wow

{% note blue 'fas fa-bullhorn' modern%}
特效标签的静态资源未添加在本帖的配置内容中（因为多为 cdn 配置），请移步站内教程完成相关配置：
{% link 使用wowjs给博客添加动画效果, /posts/abab51cf/, [https://npm.elemecdn.com/akilar-candyassets/image/siteicon/favicon.ico](https://npm.elemecdn.com/akilar-candyassets/image/siteicon/favicon.ico) %}
{% endnote %}

{% tabs animate,3 %}

```markdown
{% wow [animete],[duration],[delay],[offset],[iteration] %}
内容
{% endwow %}
```

1. `animate`: 动画样式，效果详见[animate.css 参考文档](https://animate.style/)
2. `duration`: 选填项，动画持续时间，单位可以是`ms`也可以是`s`。例如`3s`，`700ms`。
3. `delay`: 选填项，动画开始的延迟时间，单位可以是`ms`也可以是`s`。例如`3s`，`700ms`。
4. `offset`: 选填项，开始动画的距离（相对浏览器底部）
5. `iteration`: 选填项，动画重复的次数

{% note warning %}
注意，后面四个虽然是选填项，但是当有跨位选填时，次序不能乱。详见示例。
支持嵌套其他外挂标签。
{% endnote %}

1. `flip`动画效果。
   {% wow animate__flip %}
   {% note green 'fas fa-fan' modern%}
   `flip`动画效果。
   {% endnote %}
   {% endwow %}
2. `zoomIn`动画效果，持续`5s`，延时`5s`，离底部`100`距离时启动，重复`10`次。
   {% wow animate__zoomIn,5s,5s,100,10 %}
   {% note blue 'fas fa-bullhorn' modern%}
   `zoomIn`动画效果，持续`5s`，延时`5s`，离底部`100`距离时启动，重复`10`次
   {% endnote %}
   {% endwow %}
3. `slideInRight`动画效果，持续`5s`，延时`5s`。
   {% wow animate__slideInRight,5s,5s %}
   {% note orange 'fas fa-car' modern%}
   `slideInRight`动画效果，持续`5s`，延时`5s`。
   {% endnote %}
   {% endwow %}
4. `heartBeat`动画效果，延时`5s`，重复`10`次。
   {% wow animate__heartBeat,,5s,,10 %}
   {% note red 'fas fa-battery-half' modern%}
   `heartBeat`动画效果，延时`5s`，重复`10`次。
   {% endnote %}
   {% endwow %}
5. `flip`动画效果。

```markdown
{% wow animate__flip %}
{% note green 'fas fa-fan' modern%}
`flip`动画效果。
{% endnote %}
{% endwow %}
```

2. `zoomIn`动画效果，持续`5s`，延时`5s`，离底部`100`距离时启动，重复`10`次。

```markdown
{% wow animate__zoomIn,5s,5s,100,10 %}
{% note blue 'fas fa-bullhorn' modern%}
`zoomIn`动画效果，持续`5s`，延时`5s`，离底部`100`距离时启动，重复`10`次
{% endnote %}
{% endwow %}
```

3. `slideInRight`动画效果，持续`5s`，延时`5s`。

```markdown
{% wow animate__slideInRight,5s,5s %}
{% note orange 'fas fa-car' modern%}
`slideInRight`动画效果，持续`5s`，延时`5s`。
{% endnote %}
{% endwow %}
```

4. `heartBeat`动画效果，延时`5s`，重复`10`次。此处注意不用的参数位置要留空，用逗号间隔。

```markdown
{% wow animate__heartBeat,,5s,,10 %}
{% note red 'fas fa-battery-half' modern%}
`heartBeat`动画效果，延时`5s`，重复`10`次。
{% endnote %}
{% endwow %}
```

{% endtabs%}

## 进度条 progress

{% note info morden %}
进度条标签参考[沂佰孜猫-给 HEXO 文章添加彩色进度条](https://rongbuqiu.com/jdt.html)。
源样式提取自[Cuteen](https://zwying0814.gitbook.io/cuteen/)主题。
{% endnote %}
{% tabs progress,3 %}

```markdown
{% progress [width] [color] [text] %}
```

`width`: 0 到 100 的阿拉伯数字
`color`: 颜色，取值有{% span red, red %},{% span yellow, yellow %},{% span green, green %},{% span cyan, cyan %},{% span blue, blue %},{% span gray, gray %}
`text`:进度条上的文字内容
{% progress 10 red 进度条样式预览 %}
{% progress 30 yellow 进度条样式预览 %}
{% progress 50 green 进度条样式预览 %}
{% progress 70 cyan 进度条样式预览 %}
{% progress 90 blue 进度条样式预览 %}
{% progress 100 gray 进度条样式预览 %}

```markdown
{% progress 10 red 进度条样式预览 %}
{% progress 30 yellow 进度条样式预览 %}
{% progress 50 green 进度条样式预览 %}
{% progress 70 cyan 进度条样式预览 %}
{% progress 90 blue 进度条样式预览 %}
{% progress 100 gray 进度条样式预览 %}
```

{% endtabs%}

## 注释 notation

{% tabs notation,3 %}

```markdown
{% nota [label] , [text] %}
```

`label`: 注释词汇
`text`: 悬停显示的注解内容
{% nota 把鼠标移动到我上面试试 ,可以看到注解内容出现在顶栏 %}

```markdown
{% nota 把鼠标移动到我上面试试 ,可以看到注解内容出现在顶栏 %}
```

{% endtabs%}

## 气泡注释 bubble

{% tabs bubble,3 %}

```markdown
{% bubble [content] , [notation] ,[background-color] %}
```

`content`: 注释词汇
`notation`: 悬停显示的注解内容
`background-color`: 可选，气泡背景色。默认为“#71a4e3”
{% raw %}

最近我学到了不少新玩意儿（虽然对很多大佬来说这些已经是旧技术了），比如 CSS 的兄弟相邻选择器例如 h1 + p {margin-top:50px;}，flex 布局 Flex 是 Flexible Box 的缩写，意为弹性布局 "，用来为盒状模型提供最大的灵活性"，transform 变换 transform 属性向元素应用 2D 或 3D 转换。该属性允许我们对元素进行旋转、缩放、移动或倾斜。，animation 的贝塞尔速度曲线贝塞尔曲线 (Bézier curve)，又称贝兹曲线或贝济埃曲线，是应用于二维图形应用程序的数学曲线。一般的矢量图形软件通过它来精确画出曲线，贝兹曲线由线段与节点组成，节点是可拖动的支点，线段像可伸缩的皮筋写法，还有今天刚看到的 clip-pathclip-path 属性使用裁剪方式创建元素的可显示区域。区域内的部分显示，区域外的隐藏。属性。这些对我来说很新颖的概念狠狠的冲击着我以前积累起来的设计思路。

## 引用文献 reference

{% tabs bubble,3 %}

```markdown
{% referto [id] , [literature] %}
{% referfrom [id] , [literature] , [url] %}
```

{% tip ban %}
考虑到锚点跳转的特性，不建议您将引用出处标签 referfrom 写在常隐外挂标签(如 folding、tab、hideToggle)中，这样能有效避免跳转失败。
{% endtip %}

1. referto 引用上标
   `id`: 上标序号内容，需与 referfrom 标签的 id 对应才能实现跳转
   `literature`: 引用的参考文献名称
2. referfrom 引用出处
   `id`: 序号内容，需与 referto 标签的 id 对应才能实现跳转
   `literature`: 引用的参考文献名称
   `url`: 引用的参考文献链接，可省略

{% raw %}

Akilar の糖果屋(akilar.top)是一个私人性质的博客[[1]](#referfrom*%5B1%5D)Akilar の糖果屋群聊简介参考资料，从各类教程至生活点滴，无话不谈。建群的目的是提供一个闲聊的场所。博客采用 Hexo 框架[[2]](#referfrom*%5B2%5D)Hexo 中文文档参考资料，Butterfly 主题[[3]](#referfrom\_%5B3%5D)Butterfly 安装文档(一) 快速开始参考资料

本项目参考了 Volantis[[4]](#referfrom*%5B4%5D)hexo-theme-volantis 标签插件参考资料的标签样式。引入`[tag].js`，并针对`butterfly`主题修改了相应的`[tag].styl`。在此鸣谢`Volantis`主题众开发者。
主要参考内容包括各个 volantis 的内置标签插件文档[[5]](#referfrom*%5B5%5D)Volantis 文档:内置标签插件参考资料
Butterfly 主题的各个衍生魔改[[6]](#referfrom*%5B6%5D)Butterfly 安装文档:标签外挂（Tag Plugins 参考资料[[7]](#referfrom*%5B7%5D)小弋の生活馆全样式预览参考资料[[8]](#referfrom*%5B8%5D)l-lin-font-awesome-animation 参考资料[[9]](#referfrom*%5B9%5D)小康的 butterfly 主题使用文档参考资料
{% referfrom '[1]','Akilarの糖果屋群聊简介','[https://jq.qq.com/?_wv=1027&k=pGLB2C0N](https://jq.qq.com/?_wv=1027&k=pGLB2C0N)' %}
{% referfrom '[2]','Hexo中文文档','[https://hexo.io/zh-cn/docs/](https://hexo.io/zh-cn/docs/)' %}
{% referfrom '[3]','Butterfly 安装文档(一) 快速开始','[https://butterfly.js.org/posts/21cfbf15/](https://butterfly.js.org/posts/21cfbf15/)' %}
{% referfrom '[4]','hexo-theme-volantis 标签插件','[https://volantis.js.org/v5/tag-plugins/](https://volantis.js.org/v5/tag-plugins/)' %}
{% referfrom '[5]','Volantis文档:内置标签插件','[https://volantis.js.org/tag-plugins/](https://volantis.js.org/tag-plugins/)' %}
{% referfrom '[6]','Butterfly 安装文档:标签外挂（Tag Plugins','[https://butterfly.js.org/posts/4aa8abbe/#標籤外掛（Tag-Plugins）](https://butterfly.js.org/posts/4aa8abbe/#%E6%A8%99%E7%B1%A4%E5%A4%96%E6%8E%9B%EF%BC%88Tag-Plugins%EF%BC%89)' %}
{% referfrom '[7]','小弋の生活馆全样式预览','[https://lovelijunyi.gitee.io/posts/c898.html](https://lovelijunyi.gitee.io/posts/c898.html)' %}
{% referfrom '[8]','l-lin-font-awesome-animation','[https://github.com/l-lin/font-awesome-animation](https://github.com/l-lin/font-awesome-animation)' %}
{% referfrom '[9]','小康的butterfly主题使用文档','[https://www.antmoe.com/posts/3b43914f/](https://www.antmoe.com/posts/3b43914f/)' %}

```markdown
Akilar の糖果屋(akilar.top)是一个私人性质的博客{% referto '[1]','Akilarの糖果屋群聊简介' %}，从各类教程至生活点滴，无话不谈。建群的目的是提供一个闲聊的场所。博客采用 Hexo 框架{% referto '[2]','Hexo中文文档' %}，Butterfly 主题{% referto '[3]','Butterfly 安装文档(一) 快速开始' %}

本项目参考了 Volantis{% referto '[4]','hexo-theme-volantis 标签插件' %}的标签样式。引入`[tag].js`，并针对`butterfly`主题修改了相应的`[tag].styl`。在此鸣谢`Volantis`主题众开发者。
主要参考内容包括各个 volantis 的内置标签插件文档{% referto '[5]','Volantis文档:内置标签插件' %}
Butterfly 主题的各个衍生魔改{% referto '[6]','Butterfly 安装文档:标签外挂（Tag Plugins' %}{% referto '[7]','小弋の生活馆全样式预览' %}{% referto '[8]','l-lin-font-awesome-animation' %}{% referto '[9]','小康的butterfly主题使用文档' %}

{% referfrom '[1]','Akilarの糖果屋群聊简介','https://jq.qq.com/?_wv=1027&k=pGLB2C0N' %}
{% referfrom '[2]','Hexo中文文档','https://hexo.io/zh-cn/docs/' %}
{% referfrom '[3]','Butterfly 安装文档(一) 快速开始','https://butterfly.js.org/posts/21cfbf15/' %}
{% referfrom '[4]','hexo-theme-volantis 标签插件','https://volantis.js.org/v5/tag-plugins/' %}
{% referfrom '[5]','Volantis文档:内置标签插件','https://volantis.js.org/tag-plugins/' %}
{% referfrom '[6]','Butterfly 安装文档:标签外挂（Tag Plugins','https://butterfly.js.org/posts/4aa8abbe/#%E6%A8%99%E7%B1%A4%E5%A4%96%E6%8E%9B%EF%BC%88Tag-Plugins%EF%BC%89' %}
{% referfrom '[7]','小弋の生活馆全样式预览','https://lovelijunyi.gitee.io/posts/c898.html' %}
{% referfrom '[8]','l-lin-font-awesome-animation','https://github.com/l-lin/font-awesome-animation' %}
{% referfrom '[9]','小康的butterfly主题使用文档','https://www.antmoe.com/posts/3b43914f/' %}
```

{% endtabs%}

## 旋转相册 carousel

{% tip warning %}
旋转相册标签与 fancybox 灯箱存在兼容性 bug，若发现旋转相册呈扁平状，请关闭 fancybox 或换用 medium_zoom。
{% endtip %}
{% tabs notation,3 %}

```markdown
{% carousel [Id] , [name] %}
![](/img/1.jpg)
![](/img/2.jpg)
![](/img/3,jpg)
{% endcarousel %}
```

`Id`: 相册唯一 ID，用于监测相册鼠标动作。禁止使用中文。同一页内不得出现相同 ID 的 carousel 相册。
`name`: 相册中间显示的内容，建议用英文单引号包裹。
{% raw %}

![](https://npm.elemecdn.com/akilar-candyassets/image/20200907110444226.png#crop=0&crop=0&crop=1&crop=1&id=wQBju&originHeight=843&originWidth=559&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=#crop=0&crop=0&crop=1&crop=1&id=ff6fv&originHeight=843&originWidth=559&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)![](https://npm.elemecdn.com/akilar-candyassets/image/20200907110508327.png#crop=0&crop=0&crop=1&crop=1&id=ce61N&originHeight=653&originWidth=623&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=#crop=0&crop=0&crop=1&crop=1&id=q2kAH&originHeight=653&originWidth=623&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)![](https://npm.elemecdn.com/akilar-candyassets/image/20200907110525753.png#crop=0&crop=0&crop=1&crop=1&id=Wkgne&originHeight=815&originWidth=627&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=#crop=0&crop=0&crop=1&crop=1&id=AwbRE&originHeight=815&originWidth=627&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)![](https://npm.elemecdn.com/akilar-candyassets/image/20200907110600751.png#crop=0&crop=0&crop=1&crop=1&id=w8DSs&originHeight=833&originWidth=630&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=#crop=0&crop=0&crop=1&crop=1&id=nfFkL&originHeight=833&originWidth=630&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)![](https://npm.elemecdn.com/akilar-candyassets/image/20200907110621554.png#crop=0&crop=0&crop=1&crop=1&id=FxOKC&originHeight=748&originWidth=631&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=#crop=0&crop=0&crop=1&crop=1&id=RZtKc&originHeight=748&originWidth=631&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)![](https://npm.elemecdn.com/akilar-candyassets/image/20200907110637459.png#crop=0&crop=0&crop=1&crop=1&id=ArAgd&originHeight=786&originWidth=634&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=#crop=0&crop=0&crop=1&crop=1&id=TkSRa&originHeight=786&originWidth=634&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)![](https://npm.elemecdn.com/akilar-candyassets/image/20200907110654150.png#crop=0&crop=0&crop=1&crop=1&id=doNAj&originHeight=614&originWidth=818&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=#crop=0&crop=0&crop=1&crop=1&id=Nu97R&originHeight=614&originWidth=818&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)![](https://npm.elemecdn.com/akilar-candyassets/image/20200907110707916.png#crop=0&crop=0&crop=1&crop=1&id=S9aX6&originHeight=842&originWidth=634&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=#crop=0&crop=0&crop=1&crop=1&id=nC4Vy&originHeight=842&originWidth=634&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)![](https://npm.elemecdn.com/akilar-candyassets/image/20200907110719787.png#crop=0&crop=0&crop=1&crop=1&id=reRCh&originHeight=821&originWidth=533&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=#crop=0&crop=0&crop=1&crop=1&id=IDIHP&originHeight=821&originWidth=533&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)![](https://npm.elemecdn.com/akilar-candyassets/image/20200907110731118.png#crop=0&crop=0&crop=1&crop=1&id=dx6re&originHeight=727&originWidth=522&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=#crop=0&crop=0&crop=1&crop=1&id=Ny4bI&originHeight=727&originWidth=522&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
strike freedom

---
categories:
- Butterfly
- ''
cover: https://ik.imagekit.io/nicexl/Wallpaper/0f11ebb6edd017c2d2eca2_UCIfkba8h.jpg
date: '2022-07-28 11:51:20'
tags:
- 教程
title: butterfly版权块美化教程
updated: '2022-07-29 11:05:14'
---
### 教程

#### 修改post-copyright.pug

打开**ROOT\themes\butterfly\layout\includes\post**文件夹，将下列代码覆盖**post-copyright.pug**文件

```
if theme.post_copyright.enable && page.copyright !== false
  - let author = page.copyright_author ? page.copyright_author : config.author
  - let url = page.copyright_url ? page.copyright_url : page.permalink
  .post-copyright
    .post-copyright__title
      span.post-copyright-info
        h #[=page.title]
    .post-copyright__type
      span.post-copyright-info
        a(href=url_for(url))= theme.post_copyright.decode ? decodeURI(url) : url
    .post-copyright-m
      .post-copyright-m-info
        .post-copyright-a(style="display: inline-block;width: 120px")
            h 作者
            .post-copyright-cc-info
                h=author
        .post-copyright-c(style="display: inline-block;width: 120px")
            h 发布于
            .post-copyright-cc-info
                h=date(page.date, config.date_format)
        .post-copyright-u(style="display: inline-block;width: 120px")
            h 更新于
            .post-copyright-cc-info
                h=date(page.updated, config.date_format)
        .post-copyright-c(style="display: inline-block;width: 120px")
            h 许可协议
            .post-copyright-cc-info
                a.icon(rel='noopener' target='_blank' title='Creative Commons' href='https://creativecommons.org/')
                  i.fab.fa-creative-commons
                a(rel='noopener' target='_blank' title='CC BY 4.0' href='https://creativecommons.org/licenses/by/4.0/deed.zh') CC BY 4.0
```

注意，是覆盖，不是增加！

#### 修改post.styl

打开`ROOT\themes\butterfly\source\css_layout文件夹`，修改`post.styl`文件

修改范围：`.post-copyright`至 `.post-outdate-notice`

##### diff模式

```
.post-copyright
    position: relative
    margin: 2rem 0 .5rem
    padding: .5rem .8rem
    border: 1px solid var(--light-grey)
    transition: box-shadow .3s ease-in-out
+   overflow: hidden
+   border-radius: 12px!important
+   background-color: rgb(239 241 243)

    &:before
-     @extend .fontawesomeIcon
-     position: absolute
-     top: .1rem
-     right: .6rem
-     color: $theme-color
-     content: '\f1f9'
-     font-size: 1rem
+     position absolute
+     right -26px
+     top -120px
+     content '\f25e'
+     font-size 200px
+     font-family 'Font Awesome 5 Brands'
+     opacity .2

    &:hover
      box-shadow: 0 0 8px 0 rgba(232, 237, 250, .6), 0 2px 4px 0 rgba(232, 237, 250, .5)

    .post-copyright
      &-meta
        color: $light-blue
        font-weight: bold

      &-info
        padding-left: .3rem

        a
-         text-decoration: underline
+         text-decoration: none
          word-break: break-word

          &:hover
            text-decoration: none

+ .post-copyright-cc-info
+   color: $theme-color;

  .post-outdate-notice
    position: relative
    margin: 0 0 1rem
    padding: .5em 1.2em
    border-radius: 15px
    background-color: $noticeOutdate-bg
    color: $noticeOutdate-color
```

##### 成品

```
.post-copyright
    position: relative
    margin: 2rem 0 .5rem
    padding: .5rem .8rem
    border: 1px solid var(--light-grey)
    transition: box-shadow .3s ease-in-out
    overflow: hidden
    border-radius: 12px!important
    background-color: rgb(239 241 243)

    &:before
      background var(--heo-post-blockquote-bg)
      position absolute
      right -26px
      top -120px
      content '\f25e'
      font-size 200px
      font-family 'Font Awesome 5 Brands'
      opacity .2

    &:hover
      box-shadow: 0 0 8px 0 rgba(232, 237, 250, .6), 0 2px 4px 0 rgba(232, 237, 250, .5)

    .post-copyright
      &-meta
        color: $light-blue
        font-weight: bold

      &-info
        padding-left: .3rem

        a
          text-decoration: none
          word-break: break-word

          &:hover
            text-decoration: none

  .post-copyright-cc-info
    color: $theme-color;

  .post-outdate-notice
    position: relative
    margin: 0 0 1rem
    padding: .5em 1.2em
    border-radius: 15px
    background-color: $noticeOutdate-bg
    color: $noticeOutdate-color
```

#### 自定义css

新建 `copyright.css `，适配夜间模式和美化字体样式

```
[data-theme="dark"]
  #post .post-copyright {
    background-color: rgb(7 8 10);
    text-shadow: #bfbeb8 1px 0 4px;
  }
[data-theme="dark"]
  #post .post-copyright {
    border: 1px solid rgb(19 18 18 / 35%);
  }
[data-theme="dark"]
  .post-copyright-info {
    color: #e0e0e4;
  }
#post .post-copyright__title{
    font-size:22px;
}
#post .post-copyright__notice{
    font-size:15px;
}
```

放入**ROOT\themes\butterfly\source\css**

#### 配置主题文件

```
inject:
  head
    - <link rel="stylesheet" href="/css/copyright.css">
  bottom:
```

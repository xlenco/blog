---
title: 在GitHub个人页添加一个有趣的贪吃蛇动画
urlname: qz0ant
date: '2022-08-26 23:47:24 +0800'
tags: []
categories: []
---

---
categories:
  - 教程

cover: "[https://ik.imagekit.io/nicexl/Wallpaper/8f223fdf-5867-4581-b50a-4e5a5c794a97_HljNmaNGR.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1661082624230](https://ik.imagekit.io/nicexl/Wallpaper/8f223fdf-5867-4581-b50a-4e5a5c794a97_HljNmaNGR.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1661082624230)"
date: "2022-07-28 12:07:51"
tags:
  - Github

title: 在GitHub个人页添加一个有趣的贪吃蛇动画
updated: "2022-07-29 14:59:10"
abbrlink: ce95
---

这是我之前在逛 GitHub 发现的有意思的东西，给自己的个人 GitHub 主页添加一个贪吃蛇动画，效果如下：
![](https://nsso.eu.org/img/a1ebe329-c070-4ba4-a43a-ffb0ebf92d39.gif#crop=0&crop=0&crop=1&crop=1&id=fCpGv&originHeight=206&originWidth=880&originalType=binary∶=1&rotation=0&showTitle=false&status=done&style=none&title=)

贪吃蛇会吃掉我们在 GitHub 上提交的代码记录，即吃掉那些绿色的格子。

回到前面说的，如何在 GitHub 个人主页，实现贪吃蛇的小动画呢？

![](https://github-readme-stats.vercel.app/api/pin/?username=L1cardo&repo=L1cardo&show_owner=true#crop=0&crop=0&crop=1&crop=1&id=PvPYC&originalType=binary∶=1&rotation=0&showTitle=false&status=done&style=none&title=)

非常简单，只需要你会复制代码就可以了，这个贪吃蛇小动画的代码来自 GitHub 上的一位用户 [@L1cardo ](/L1cardo) 的个人页面：

1. 在你的 GitHub ID 同名仓库的里新建`assets`文件夹
   由于 github 不支持空文件夹，建议先随意放个文件，过后再删除。
2. 我们需要将这个代码复制到与自己的 GitHub ID 同名仓库的 `.github/workflows` 路径下。

##### **Generate Snake.yml**

```
# GitHub Action for generating a contribution graph with a snake eating your contributions.
name: Generate Snake
on:
  schedule:
    - cron: "0 0 * * *"
  workflow_dispatch:
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2.3.4
      - name: Generate Snake
        uses: Platane/snk@master
        id: snake-gif
        with:
          github_user_name: ${{ github.repository_owner }}
          gif_out_path: ./assets/github-contribution-grid-snake.gif
          svg_out_path: ./assets/github-contribution-grid-snake.svg
      - name: Push to GitHub
        uses: EndBug/add-and-commit@v7.2.1
        with:
          branch: main
          message: 'Generate Contribution Snake'
```

3.复制完代码后，我们还要将代码生成的 svg 文件放在 **GitHub ID 同名仓库的 README 文档中** ，它才会在个人首页显示。

由于 README 文档是用 **Markdown** 格式进行编辑，引入 svg 文件需要使用下面这种格式。

```
![](https://cdn.jsdelivr.net/gh/xxx/xxx@main/assets/github-contribution-grid-snake.svg)
```

将 xxx 改为你的 github 用户名即可

完成以上述操作，就可以在自己的 GitHub 主页看到这个动画啦，还是很酷的

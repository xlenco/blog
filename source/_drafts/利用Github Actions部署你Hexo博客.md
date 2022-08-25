---
categories:
- 教程
cover: ''
date: '2022-08-25 22:01:13'
tags:
- Hexo
- Butterfly
title: 利用Github Actions部署你Hexo博客
---

### Github Actions概念

GitHub Actions 是一个持续集成和持续交付 (CI/CD) 平台，可用于自动执行构建、测试和部署管道。 您可以创建工作流程来构建和测试存储库的每个拉取请求，或将合并的拉取请求部署到生产环境。

GitHub Actions 不仅仅是 DevOps，还允许您在存储库中发生其他事件时运行工作流程。 例如，您可以运行工作流程，以便在有人在您的存储库中创建新问题时自动添加相应的标签。

GitHub 提供 Linux、Windows 和 macOS 虚拟机来运行工作流程，或者您可以在自己的数据中心或云基础架构中托管自己的自托管运行器。

### 正文

Git推送到Github库的常用连接方案是HTTPS和SSH这两种连接方式。

所以Actions自动化也大致分为两种。

#### 方案一

##### HTTPS连接部署方式

部署简单适合小白。缺点:有时候可能遇到不知名bug。

1. 获取Github access tokens
   打开https://github.com/settings/tokens
   点击Generate new token新建个token

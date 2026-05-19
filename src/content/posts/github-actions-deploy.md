---
title: "从零搭建 GitHub Actions 自动部署"
date: 2026-04-25
category: "DevOps"
tags: ["GitHub", "CI/CD", "DevOps"]
description: "几分钟搞定 GitHub Pages 自动部署，push 代码就能自动更新网站。"
---

## 为什么用 GitHub Pages

免费、稳定、全球 CDN。对于个人博客来说，没有更好的选择了。

## 配置步骤

1. 在仓库设置中开启 GitHub Pages
2. 创建 `.github/workflows/deploy.yml`
3. 配置 Node.js 环境、构建步骤、部署步骤
4. push 代码，自动触发部署

整个流程不超过 20 行配置。比手动 FTP 上传不知道高到哪里去了。

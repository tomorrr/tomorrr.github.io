# Personal Blog Design Spec

## Overview

个人博客，展示成果、文章、想法。最终部署到 GitHub Pages。
风格：玻璃拟态 + 极光冰蓝配色，炫酷但不复杂。

## Tech Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | Astro | 专为内容站点设计，零 JS 输出，支持 React 岛屿 |
| Content | Local Markdown | 用 VS Code 写文章，git 管理版本 |
| Styling | Tailwind CSS | 快速实现玻璃拟态效果，响应式方便 |
| Interactivity | React + Framer Motion | 岛屿架构嵌入，不拖累静态页面性能 |
| Deployment | GitHub Pages + Actions | push 即部署，免费 |

## Visual Direction

**风格**: 玻璃拟态 (Glass morphism)
- 半透明卡片 (`backdrop-filter: blur()`)
- 细边框 (`border: 1px solid rgba(255,255,255,0.08)`)
- 深色渐变背景

**配色**: 极光冰蓝 (Nordic Ice)
- 主背景: `#0f172a` → `#1e293b` (slate 渐变)
- 强调色: `#60a5fa` / `#93c5fd` / `#bae6fd` (蓝色光晕)
- 文字: `#f0f9ff` (标题) / `#cbd5e1` (正文) / `#94a3b8` (辅助)

**动效**:
- 首页背景：Canvas 星光粒子浮动动画
- 卡片 hover：轻微上浮 + 阴影增强 (Framer Motion)
- 页面切换：淡入过渡
- 滚动触发：卡片依次入场

**字体**: 系统字体栈，中文优先 PingFang SC / Microsoft YaHei

## Pages & Routes

```
/                      首页 (文章列表 + Hero)
/about                 关于我 (Markdown 页面)
/posts/[slug]          文章详情
/projects              项目展示 (网格)
/projects/[slug]       项目详情
/archive               归档时间线
/friends               友链
/rss.xml               RSS 订阅
```

### 首页
- Hero 区：头像 + 一句话介绍 + 社交链接(GitHub, Email, RSS)
- 星光粒子 Canvas 背景动画
- 最新文章列表（玻璃卡片，每篇显示日期/分类/标题/摘要）
- 分页或「查看更多」链接
- 页脚：社交链接 + 版权

### 文章详情页
- 窄栏居中（max-w-prose），阅读优先
- 文章元信息：日期、分类、标签、阅读时长
- 标签使用圆角 chip 样式
- 代码块暗色主题、引用块玻璃边框
- 文章底部：「上一篇/下一篇」导航
- 移动端全宽，字号自适应

### 项目展示页
- 网格布局展示项目卡片
- 每张卡片：封面区（纯色渐变背景）+ 标题 + 简介 + 技术标签
- 卡片 hover：上浮 4px + 边框增亮
- 支持分类筛选（React 岛屿组件）

### 关于页
- 头像 + 个人简介
- 数据统计卡片（文章数、项目数等）
- 内容从 `content/about.md` 读取

### 归档页
- 时间线布局，按年份分组
- 滚动时时间线节点依次亮起动画（React 岛屿）

### 友链页
- 好友博客链接列表，玻璃卡片展示

### RSS
- Astro 内置生成，输出标准 RSS XML

### 搜索
- 全局搜索框（React 岛屿），前端全文搜索文章标题和摘要

## Content Structure

所有内容放在 `src/content/` 下，使用 Astro Content Collections：

```yaml
# src/content/posts/hello-world.md
---
title: "Hello World"
date: 2024-01-15
category: "前端"
tags: ["Astro", "博客"]
description: "文章摘要描述"
---

正文内容 (Markdown)
```

```yaml
# src/content/projects/my-blog.md
---
title: "My Blog"
description: "用 Astro 构建的个人博客"
tags: ["Astro", "React"]
url: "https://github.com/xxx/my-blog"
order: 1
---

项目详细介绍 (Markdown)
```

## Component Tree

```
BaseLayout.astro          ← 全局框架 (nav + glass bg + footer)
├── StarField.tsx         ← 首页星空粒子 Canvas (React)
├── PostCard.astro        ← 文章卡片组件
├── ProjectCard.astro     ← 项目卡片组件
├── Search.tsx            ← 搜索框 (React)
├── ProjectFilter.tsx     ← 项目分类筛选 (React)
├── Timeline.tsx          ← 时间线动画 (React)
├── TagChip.astro         ← 标签 chip
└── PageTransition.astro  ← 页面过渡动画 wrapper
```

## Data Flow

```
Markdown files (.md)
    │
    ▼
Astro Content Collections (type-safe)
    │
    ▼
.astro templates → Static HTML
    │
    ▼
React islands (hydrated on client, only where needed)
    │
    ▼
GitHub Pages (pure static files)
```

## Features Checklist

- [ ] 玻璃拟态全局样式 + 极光冰蓝配色
- [ ] 首页星空粒子背景动画
- [ ] 文章 CRUD（新增/编辑/删除 Markdown 文件）
- [ ] 项目展示网格 + hover 动效
- [ ] 分类/标签体系 + 筛选
- [ ] 全局搜索
- [ ] 归档时间线
- [ ] 友链页
- [ ] RSS 订阅
- [ ] 移动端响应式
- [ ] 暗色模式（默认暗色，可切换亮色）
- [ ] GitHub Pages 自动部署

## Out of Scope (for now)

- 评论系统（后续可加 Giscus）
- 访问统计（后续可加 Umami/Plausible）
- 多语言
- CMS 后台

## Deployment

1. 代码托管在 GitHub 公开仓库
2. GitHub Actions 自动构建 `npm run build` → 输出到 `dist/`
3. 部署到 GitHub Pages (`username.github.io` 或自定义域名)
4. push main 分支自动触发部署

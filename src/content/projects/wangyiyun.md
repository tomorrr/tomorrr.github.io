---
image: "/images/wangyiyun-preview.svg"
title: "网易云音乐"
description: "仿网易云音乐 UI，Vue 构建的音乐播放器项目。"
tags: ["Vue", "音乐", "前端"]
url: "https://github.com/tomorrr/wangyiyun"
order: 4
---

一个仿照网易云音乐界面设计的音乐播放器，使用 Vue 框架构建，实现了音乐播放的核心功能。

## 已实现功能

- 推荐歌单展示
- 歌曲搜索
- 音乐播放 / 暂停 / 切歌
- 播放进度控制
- 歌词滚动显示
- 收藏与播放历史
- 歌单详情页

## 技术选型

| 功能 | 技术方案 |
|------|----------|
| 框架 | Vue 2 |
| 状态管理 | Vuex |
| 网络请求 | Axios |
| UI 样式 | 手写 CSS |
| 后端 API | NeteaseCloudMusicApi |

## 快速开始

```bash
git clone https://github.com/tomorrr/wangyiyun.git
cd wangyiyun
npm install
npm run serve
```

> 需要配合 [NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi) 后端服务使用。

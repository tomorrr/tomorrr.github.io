# 网易云音乐

> 仿网易云音乐 UI，Vue 构建的音乐播放器项目。

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

## 项目截图

启动后端 API 服务后，浏览器访问 `http://localhost:8080` 即可看到音乐播放器界面。

## License

MIT

---
title: "CSS 玻璃拟态效果完全指南"
date: 2026-05-12
category: "前端"
tags: ["CSS", "设计", "前端"]
description: "从 backdrop-filter 到毛玻璃卡片，一步步拆解玻璃拟态的实现原理和最佳实践。"
---

## 什么是玻璃拟态

玻璃拟态（Glassmorphism）是近年来流行的一种 UI 设计风格。核心特征：

- 半透明背景
- 背景模糊（backdrop-filter）
- 细边框
- 层次感

## 核心 CSS

```css
.glass {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  border-radius: 12px;
}
```

三个属性就搞定了。关键在 `backdrop-filter: blur()`——它模糊的是元素背后的内容，不是元素本身。

# 摄影预约系统

> 摄影店在线预约订购系统，原生 HTML+CSS+JS 全栈项目。

## 功能模块

### 用户端
- 浏览摄影套餐
- 在线预约拍摄时间
- 订单管理与支付（模拟）
- 个人中心

### 管理端
- 订单审核与管理
- 套餐上下架
- 客户信息管理
- 预约日历视图

## 技术实现

- **前端**：原生 HTML + CSS + JavaScript，不依赖框架
- **后端**：Node.js + Express
- **数据库**：MySQL
- **会话管理**：JWT 认证

## 项目结构

```
├── frontend/        # 前端页面
│   ├── index.html   # 首页
│   ├── booking.html # 预约页
│   └── admin/       # 管理后台
├── backend/         # 后端服务
│   ├── routes/      # 接口路由
│   └── models/      # 数据模型
└── database/        # SQL 脚本
```

## 快速开始

```bash
git clone https://github.com/tomorrr/VedioBookingAndOrderingSystSem.git
cd VedioBookingAndOrderingSystSem
npm install
npm start
```

## License

MIT

# Railway 部署指南 (后台)

## 1. 概述

本文档说明如何将 MMES-MCTI 后台管理系统部署到 Railway。

**技术栈:** Next.js 14.2.0
**代码修改需求:** ❌ 无需修改

Railway 原生支持 Next.js，包括文件系统和 API Routes。

---

## 2. 部署拓扑图

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              Railway 平台                                       │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │                         Railway Service                                  │   │
│  │  ┌─────────────────────────────────────────────────────────────────┐  │   │
│  │  │                    Backend (Next.js :3001)                       │  │   │
│  │  │              API Routes + JSON Storage + Image Upload          │  │   │
│  │  └─────────────────────────────────────────────────────────────────┘  │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────────┘
                                       │
                                       │ HTTPS
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              Cloudflare Pages                                   │
│                         Frontend (mmes-mcti.pages.dev)                          │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Railway 优势

| 优势 | 说明 |
|------|------|
| Next.js 原生支持 | 无需额外配置 |
| 文件系统支持 | 完整 Node.js 环境 |
| 自动 HTTPS | 免费 SSL 证书 |
| 持久化存储 | 数据不会丢失 |
| 免费额度 | 每月 $5 免费使用 |

---

## 4. 部署步骤

### 4.1 准备代码

后台代码在 `backend/` 目录，已经包含完整的 Next.js 项目。

### 4.2 创建 Railway 项目

#### 方式一: 通过 GitHub 部署 (推荐)

1. 访问 https://railway.app
2. 注册/登录 Railway 账户
3. 点击 "New Project"
4. 选择 "Deploy from GitHub repo"
5. 选择包含 `backend/` 目录的仓库

**注意:** 如果仓库只有后台代码，选择整个仓库；如果前后台分离，需要指定 `backend` 目录为根目录。

#### 方式二: 通过 Railway CLI

```bash
# 安装 Railway CLI
npm install -g @railway/cli

# 登录
railway login

# 进入后台目录
cd backend

# 部署
railway up
```

### 4.3 配置环境变量

在 Railway 项目设置中添加:

| 变量名 | 值 | 说明 |
|--------|-----|------|
| `ADMIN_PASSWORD` | `your_secure_password` | 管理员密码 (建议修改默认密码) |
| `NODE_ENV` | `production` | 生产环境 |

### 4.4 配置端口

Railway 会自动设置 `PORT` 环境变量，但需要确保应用监听正确端口:

```bash
# Railway 默认端口
PORT=3001
```

### 4.5 部署

点击 "Deploy" 开始部署。等待几分钟后，Railway 会自动完成构建和启动。

---

## 5. 部署后配置

### 5.1 获取部署 URL

部署完成后，Railway 提供类似以下的 URL:
```
https://mmes-mcti-backend.up.railway.app
```

### 5.2 验证 API

访问以下地址验证:
```
https://your-app.up.railway.app/api/products
https://your-app.up.railway.app/api/blog
```

### 5.3 配置前台环境变量

在 Cloudflare Pages 设置中添加:

```
NEXT_PUBLIC_API_URL=https://your-app.up.railway.app
```

---

## 6. 自定义域名 (可选)

### 6.1 Railway 域名设置

1. 在 Railway 项目中点击 "Settings"
2. 选择 "Networking"
3. 点击 "Generate Domain"

### 6.2 添加自定义域名

1. 在 Railway 项目中点击 "Settings"
2. 选择 "Custom Domains"
3. 输入你的域名 (如 `api.yourdomain.com`)
4. 按照提示配置 DNS

---

## 7. 数据管理

### 7.1 数据持久化

Railway 的持久化存储会自动保存:
- `data/products.json`
- `data/blog.json`
- `public/images/products/` 中的图片

### 7.2 备份数据

```bash
# 下载产品数据
curl -o products_backup.json https://your-app.up.railway.app/api/products

# 下载博客数据
curl -o blog_backup.json https://your-app.up.railway.app/api/blog
```

---

## 8. 成本估算

### 8.1 免费额度

- 每月 $5 免费额度
- 512MB RAM
- 1GB 存储

### 8.2 预估成本

对于小型 B2B 网站，**免费额度足够使用**。

---

## 9. 部署检查清单

- [ ] Railway 账户已创建
- [ ] GitHub 仓库已连接
- [ ] 环境变量已配置 (`ADMIN_PASSWORD`)
- [ ] 部署成功
- [ ] API URL 可访问
- [ ] 前台 `NEXT_PUBLIC_API_URL` 已更新
- [ ] 图片上传功能正常
- [ ] 翻译功能正常

---

## 10. 常见问题

### Q1: 部署失败怎么办？
检查 Railway 日志，常见问题:
- 依赖安装失败 → 检查 `package.json`
- 端口配置错误 → 确保应用监听 `process.env.PORT`

### Q2: 数据会丢失吗？
Railway 提供持久化存储，但建议定期备份重要数据。

### Q3: 如何更新代码？
```bash
git add . && git commit -m "Update"
git push
# Railway 会自动重新部署
```

---

*文档版本: 1.0*
*最后更新: 2026-04-18*

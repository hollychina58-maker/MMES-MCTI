# Cloudflare Pages 部署指南 (前台)

## 1. 概述

本文档说明如何将 MMES-MCTI 前台网站部署到 Cloudflare Pages。

**技术栈:** Next.js 16.2.4
**代码修改状态:** ✅ 已完成

---

## 2. 部署拓扑图

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              Cloudflare 全球边缘网络                             │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │                         Cloudflare Pages                                 │   │
│  │  ┌─────────────────────────────────────────────────────────────────┐  │   │
│  │  │                    Frontend (Next.js)                             │  │   │
│  │  │                  https://mmes-mcti.pages.dev                    │  │   │
│  │  └─────────────────────────────────────────────────────────────────┘  │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
│                                      │                                            │
│                                      │ fetch()                                   │
│                                      ▼                                            │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │                      Railway Backend (Port 3001)                          │   │
│  │  ┌─────────────────────────────────────────────────────────────────┐  │   │
│  │  │                    Admin API Routes                               │  │   │
│  │  │              /api/products, /api/blog, /api/upload               │  │   │
│  │  └─────────────────────────────────────────────────────────────────┘  │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. 代码修改说明

### 3.1 已完成的修改

1. **创建 API 配置模块** (`src/lib/api-config.ts`)
   - 使用环境变量 `NEXT_PUBLIC_API_URL` 配置后端地址
   - 开发环境默认 `http://localhost:3001`

2. **更新前端组件**
   - `products/page.tsx` - 使用 `API_ENDPOINTS.products`
   - `products/[slug]/page.tsx` - 使用 `API_ENDPOINTS.products` 和 `IMAGE_BASE_URL`
   - `blog/page.tsx` - 使用 `API_ENDPOINTS.blog`
   - `blog/[slug]/page.tsx` - 使用 `API_ENDPOINTS.blog` 和 `IMAGE_BASE_URL`

### 3.2 环境变量

| 变量名 | 值 | 说明 |
|--------|-----|------|
| `NEXT_PUBLIC_API_URL` | `https://your-backend.railway.app` | Railway 后端地址 |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | 你的 EmailJS Service ID | 联系表单 |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | 你的 EmailJS Template ID | 联系表单 |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | 你的 EmailJS Public Key | 联系表单 |

---

## 4. 部署步骤

### 4.1 创建 GitHub 仓库

```bash
cd d:/projects/MMES-MCTI

# 初始化 git (如果是新仓库)
git init
git add project/
git commit -m "Frontend: MMES-MCTI website"

# 创建并推送
git remote add origin https://github.com/YOUR_USERNAME/mmes-mcti.git
git branch -M main
git push -u origin main
```

### 4.2 连接 Cloudflare Pages

1. 访问 https://dash.cloudflare.com/pages
2. 点击 "Create a project"
3. 选择 "Connect to Git"
4. 授权 GitHub 访问
5. 选择 `mmes-mcti` 仓库

### 4.3 配置构建设置

| 配置项 | 值 |
|--------|-----|
| Project name | `mmes-mcti` |
| Production branch | `main` |
| Framework preset | Next.js |
| Build command | `npm run build` |
| Build output directory | `.next` |
| Root directory | `project` |

### 4.4 添加环境变量

在 Cloudflare Pages 设置中添加:

```
NEXT_PUBLIC_API_URL=https://your-backend.railway.app
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

### 4.5 部署

点击 "Save and Deploy" 开始部署。

---

## 5. 自定义域名 (可选)

### 5.1 添加域名

1. 访问 Cloudflare Dashboard
2. 选择 Pages 项目
3. 点击 "Custom domains"
4. 添加你的域名 (如 `www.yourdomain.com`)

### 5.2 DNS 配置

Cloudflare 会自动配置 DNS。确保:
- `www.yourdomain.com` → Pages 项目

---

## 6. 部署后验证

### 6.1 检查清单

- [ ] 网站可访问 (https://mmes-mcti.pages.dev)
- [ ] 语言切换正常
- [ ] 产品列表显示
- [ ] 产品详情显示
- [ ] 博客列表显示
- [ ] 博客详情显示
- [ ] 图片正常加载
- [ ] 联系表单可用

---

## 7. 更新代码

```bash
# 1. 本地修改代码
cd project
git add .
git commit -m "Update: 修复某bug"

# 2. 推送到 GitHub
git push

# 3. Cloudflare Pages 自动构建部署
```

---

*文档版本: 2.0*
*最后更新: 2026-04-18*

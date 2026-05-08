# MMES-MCTI 系统架构文档

## 1. 项目概述

MMES-MCTI 是一个外贸B2B展示型网站，包含面向客户的**前台网站**和管理员使用的**后台管理系统**。

### 1.1 技术栈

| 组件 | 技术 | 版本 |
|------|------|------|
| 前台框架 | Next.js | 16.2.4 |
| 后台框架 | Next.js | 14.2.0 |
| UI框架 | React | 19.2.4 / 18.3.0 |
| 样式 | Tailwind CSS | - |
| 动画 | Framer Motion | 12.x / 11.x |
| 国际化 | next-intl | 4.9.1 |
| 翻译API | MyMemory | - |
| 表单邮件 | EmailJS | - |
| 分析 | Google Analytics 4 | - |

### 1.2 目录结构

```
d:/projects/MMES-MCTI/
├── project/                      # 前台网站 (Next.js 16.2.4)
│   ├── src/
│   │   ├── app/                 # App Router 页面
│   │   │   ├── [locale]/        # 国际化路由
│   │   │   │   ├── page.tsx     # 首页
│   │   │   │   ├── products/    # 产品页面
│   │   │   │   ├── blog/        # 博客页面
│   │   │   │   ├── about/       # 关于我们
│   │   │   │   └── contact/     # 联系页面
│   │   │   ├── api/             # 前台API (博客)
│   │   │   └── admin/           # 管理入口
│   │   ├── components/           # 公共组件
│   │   ├── messages/            # 国际化翻译文件
│   │   ├── lib/                 # 工具函数
│   │   └── i18n/                # 国际化配置
│   ├── public/                   # 静态资源
│   └── data/                    # 本地数据副本
│
├── backend/                      # 后台管理系统 (Next.js 14.2.0)
│   ├── app/
│   │   ├── admin/               # 管理后台页面
│   │   │   ├── products/        # 产品管理
│   │   │   └── blog/            # 博客管理
│   │   └── api/                 # API 路由
│   │       ├── admin/login/      # 认证API
│   │       ├── products/         # 产品CRUD API
│   │       ├── blog/             # 博客CRUD API
│   │       ├── upload/           # 图片上传API
│   │       └── translate/         # 翻译API
│   ├── components/               # Admin UI组件
│   ├── lib/                     # 数据访问层
│   ├── types/                   # TypeScript类型定义
│   ├── data/                    # JSON数据存储
│   └── public/images/products/   # 上传的产品图片
│
├── images/                       # 产品图片源文件
├── other/docs/                   # 文档目录
└── shared/                       # 共享工具
```

---

## 2. 系统拓扑图

### 2.1 整体架构

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                   用户浏览器                                       │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │                         Frontend (Port 3000)                              │   │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────────┐   │   │
│  │  │   Home  │  │Products │  │  Blog   │  │ About   │  │  Contact    │   │   │
│  │  └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘  └──────┬──────┘   │   │
│  │       │            │            │            │               │          │   │
│  │  ┌────┴────────────┴────────────┴────────────┴───────────────┴────┐     │   │
│  │  │                    i18n (6 Languages)                          │     │   │
│  │  │                 en, zh, ru, ar, fa, la                        │     │   │
│  │  └───────────────────────────────────────────────────────────────┘     │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
│                                      │                                          │
│                    ┌─────────────────┴─────────────────┐                      │
│                    │          HTTP API Request           │                      │
│                    │    http://localhost:3001/api/*     │                      │
│                    └─────────────────┬─────────────────┘                      │
└──────────────────────────────────────│──────────────────────────────────────────┘
                                       │
┌──────────────────────────────────────│──────────────────────────────────────────┐
│                          Backend (Port 3001)                                    │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │                       Admin CMS API Server                              │   │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐        │   │
│  │  │ Products   │  │   Blog     │  │  Upload    │  │ Translate  │        │   │
│  │  │   CRUD     │  │   CRUD     │  │   Image    │  │   Text     │        │   │
│  │  └─────┬──────┘  └─────┬──────┘  └─────┬──────┘  └─────┬──────┘        │   │
│  │        │               │               │               │                │   │
│  │  ┌─────┴───────────────┴───────────────┴───────────────┴─────┐          │   │
│  │  │                    JSON File Storage                       │          │   │
│  │  │              data/products.json, data/blog.json           │          │   │
│  │  └───────────────────────────────────────────────────────────┘          │   │
│  │                                                                       │   │
│  │  ┌───────────────────────────────────────────────────────────────┐     │   │
│  │  │              Image Storage (public/images/products/)          │     │   │
│  │  └───────────────────────────────────────────────────────────────┘     │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────────┘
                                       │
                    ┌─────────────────┴─────────────────┐
                    │    External Services              │
                    │  ┌──────────────────────────┐    │
                    │  │  MyMemory Translation    │    │
                    │  │  api.mymemory.translated │    │
                    │  └──────────────────────────┘    │
                    │  ┌──────────────────────────┐    │
                    │  │  EmailJS                 │    │
                    │  │  Email Service           │    │
                    │  └──────────────────────────┘    │
                    └─────────────────────────────────┘
```

### 2.2 数据流拓扑

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                           前台用户操作流程                                     │
└──────────────────────────────────────────────────────────────────────────────┘

[用户访问网站]
       │
       ▼
┌──────────────────┐
│  Locale Router   │
│  /en/ /zh/ /ru/  │
│  /ar/ /fa/ /la/  │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐     ┌─────────────────┐
│  Products Page   │────▶│  Backend API    │
│  /products      │     │  GET /products  │
└────────┬─────────┘     └────────┬────────┘
         │                        │
         │                        ▼
         │               ┌─────────────────┐
         │               │ products.json   │
         │               │ (filtered by    │
         │               │  published:true)│
         │               └─────────────────┘
         │
         ▼
┌──────────────────┐     ┌─────────────────┐
│ Product Detail   │────▶│  Backend API    │
│ /products/[slug]│     │  GET /products  │
└────────┬─────────┘     └─────────────────┘
         │
         │ (点击"获取报价")
         ▼
┌──────────────────┐
│  Contact Form    │
│  EmailJS         │
└──────────────────┘

┌──────────────────────────────────────────────────────────────────────────────┐
│                           管理员操作流程                                      │
└──────────────────────────────────────────────────────────────────────────────┘

[管理员登录]
       │
       ▼
┌──────────────────┐
│  Admin Login     │
│  POST /login    │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Dashboard       │
│  /admin         │
└────────┬─────────┘
         │
         ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                        Admin CMS                                          │
│  ┌──────────────────┐          ┌──────────────────┐                      │
│  │  Products Mgmt   │          │   Blog Mgmt      │                      │
│  │  /admin/products │          │  /admin/blog     │                      │
│  └────────┬─────────┘          └────────┬─────────┘                      │
│           │                               │                                │
│           │  ┌────────────────────────────┴────────────────────────────┐  │
│           │  │                    CRUD Operations                      │  │
│           │  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐   │  │
│           │  │  │  CREATE │  │  READ   │  │  UPDATE │  │ DELETE │   │  │
│           │  │  └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘   │  │
│           │  └────────┼───────────┼─────────────┼────────────┼────────┘  │
│           │           │           │             │            │           │
│           │           ▼           ▼             ▼            ▼           │
│           │  ┌─────────────────────────────────────────────────────┐     │
│           │  │              JSON File Storage                       │     │
│           │  │         data/products.json, data/blog.json          │     │
│           │  └─────────────────────────────────────────────────────┘     │
│           │                                                               │
│           │  [Translate Button]                                           │
│           │           │                                                   │
│           │           ▼                                                   │
│           │  ┌─────────────────┐     ┌─────────────────┐                 │
│           │  │ MyMemory API    │────▶│  Auto-fill      │                 │
│           │  │ POST /translate │     │  Other Langs    │                 │
│           │  └─────────────────┘     └─────────────────┘                 │
│           │                                                               │
│           │  [Upload Image]                                                │
│           │           │                                                   │
│           │           ▼                                                   │
│           │  ┌─────────────────┐     ┌─────────────────┐                 │
│           │  │ POST /upload    │────▶│  Save to        │                 │
│           │  │ multipart/form   │     │  public/images/ │                 │
│           │  └─────────────────┘     └─────────────────┘                 │
└───────────┴───────────────────────────────────────────────────────────────┘
```

---

## 3. API 接口详细说明

### 3.1 产品管理 API

#### GET /api/products
获取产品列表

**请求**
```
GET http://localhost:3001/api/products
```

**响应**
```json
{
  "success": true,
  "data": [
    {
      "id": "PA-3ARG",
      "slug": "pa-3arg",
      "image": "/images/products/PA-3ARG-A.jpg",
      "specs": {
        "en": [{"name": "Accuracy", "value": "0.1", "unit": "deg"}],
        "zh": [{"name": "精度", "value": "0.1", "unit": "度"}]
      },
      "published": true,
      "content": {
        "en": {"name": "PA-3ARG", "description": "..."},
        "zh": {"name": "PA-3ARG", "description": "..."}
      },
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2026-04-17T14:41:36.321Z"
    }
  ]
}
```

**调用时机**
- 前台产品列表页面加载时
- 前台产品详情页加载时

---

#### GET /api/products/[id]
获取单个产品

**请求**
```
GET http://localhost:3001/api/products/PA-3ARG
```

**响应**
```json
{
  "success": true,
  "data": {
    "id": "PA-3ARG",
    "slug": "pa-3arg",
    ...
  }
}
```

---

#### POST /api/products
创建产品

**请求**
```
POST http://localhost:3001/api/products
Content-Type: application/json

{
  "slug": "pa-3arg",
  "image": "/images/products/pa-3arg.jpg",
  "specs": {
    "en": [{"name": "Accuracy", "value": "0.1", "unit": "deg"}],
    "zh": [{"name": "精度", "value": "0.1", "unit": "度"}]
  },
  "published": true,
  "content": {
    "en": {"name": "PA-3ARG", "description": "..."},
    "zh": {"name": "PA-3ARG", "description": "..."}
  }
}
```

**调用时机**
- 后台产品管理点击"保存"按钮时（新建）

---

#### PUT /api/products/[id]
更新产品

**请求**
```
PUT http://localhost:3001/api/products/PA-3ARG
Content-Type: application/json

{
  "slug": "pa-3arg-updated",
  "image": "/images/products/pa-3arg-new.jpg",
  "specs": {...},
  "published": true,
  "content": {...}
}
```

**调用时机**
- 后台产品管理点击"保存"按钮时（编辑）

---

#### DELETE /api/products/[id]
删除产品

**请求**
```
DELETE http://localhost:3001/api/products/PA-3ARG
```

**调用时机**
- 后台产品管理点击"删除"按钮并确认

---

### 3.2 博客管理 API

#### GET /api/blog
获取博客文章列表

**请求**
```
GET http://localhost:3001/api/blog
```

**响应**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid-xxx",
      "slug": "precision-navigation-systems-2024",
      "coverImage": "/images/products/PA-GS.jpg",
      "tags": ["Navigation", "AHRS", "Technology"],
      "author": "MMES-MCTI",
      "date": "2024-03-15",
      "readTime": "8 min read",
      "published": true,
      "content": {
        "en": {
          "title": "Precision Navigation Systems in 2024",
          "excerpt": "...",
          "content": "# Markdown Content..."
        }
      },
      "createdAt": "2026-04-17T15:03:28.561Z",
      "updatedAt": "2026-04-17T15:03:28.561Z"
    }
  ]
}
```

**调用时机**
- 前台博客列表页面加载时
- 前台博客文章页面加载时

---

#### POST /api/blog
创建博客文章

**请求**
```
POST http://localhost:3001/api/blog
Content-Type: application/json

{
  "slug": "new-blog-post",
  "coverImage": "/images/products/cover.jpg",
  "tags": ["Technology"],
  "author": "Admin",
  "date": "2024-03-15",
  "readTime": "5 min",
  "published": false,
  "content": {
    "en": {"title": "", "excerpt": "", "content": ""},
    "zh": {"title": "", "excerpt": "", "content": ""}
  }
}
```

**调用时机**
- 后台博客管理点击"保存"按钮时（新建）

---

#### PUT /api/blog/[id]
更新博客文章

**调用时机**
- 后台博客管理点击"保存"按钮时（编辑）

---

#### DELETE /api/blog/[id]
删除博客文章

**调用时机**
- 后台博客管理点击"删除"按钮并确认

---

### 3.3 翻译 API

#### POST /api/translate
翻译产品或博客内容

**请求**
```
POST http://localhost:3001/api/translate
Content-Type: application/json

{
  "type": "product",
  "sourceLang": "zh",
  "targetLangs": ["en", "ru", "ar", "fa", "la"],
  "content": {
    "zh": {"name": "产品名称", "description": "产品描述"}
  },
  "specs": {
    "zh": [{"name": "精度", "value": "0.1", "unit": "度"}]
  }
}
```

**响应**
```json
{
  "success": true,
  "data": {
    "content": {
      "en": {"name": "Product Name", "description": "Product description"},
      "ru": {"name": "Название продукта", "description": "Описание продукта"}
    },
    "specs": {
      "en": [{"name": "Accuracy", "value": "0.1", "unit": "deg"}],
      "ru": [{"name": "Точность", "value": "0.1", "unit": "градус"}]
    }
  }
}
```

**调用时机**
- 后台编辑产品/博客时，点击"翻译到其他语言"按钮

---

### 3.4 上传 API

#### POST /api/upload
上传产品图片

**请求**
```
POST http://localhost:3001/api/upload
Content-Type: multipart/form-data

file: [图片文件]
```

**响应**
```json
{
  "success": true,
  "url": "/images/products/filename.jpg"
}
```

**调用时机**
- 后台产品管理上传图片时

**限制**
- 最大文件大小: 10MB
- 存储位置: `backend/public/images/products/`

---

### 3.5 认证 API

#### POST /api/admin/login
管理员登录

**请求**
```
POST http://localhost:3001/api/admin/login
Content-Type: application/json

{
  "password": "admin123"
}
```

**响应**
```json
{
  "success": true,
  "message": "Login successful"
}
```

**调用时机**
- 管理员在登录页面提交表单时

---

## 4. 数据模型

### 4.1 产品 (Product)

```typescript
interface ProductSpec {
  name: string;      // 参数名称
  value: string;    // 参数值
  unit?: string;    // 单位 (可选)
}

interface ProductContent {
  name: string;        // 产品名称 (多语言)
  description: string; // 产品描述 (多语言)
}

interface Product {
  id: string;                              // 产品ID (如 "PA-3ARG")
  slug: string;                            // URL slug (如 "pa-3arg")
  image: string;                           // 图片路径
  specs: Record<string, ProductSpec[]>;    // 每种语言的参数
  published: boolean;                       // 是否发布
  content: Record<string, ProductContent>;  // 每种语言的内容
  createdAt: string;                        // 创建时间
  updatedAt: string;                        // 更新时间
}
```

### 4.2 博客文章 (BlogPost)

```typescript
interface BlogContent {
  title: string;     // 标题
  excerpt: string;  // 摘要
  content: string;  // Markdown 正文
}

interface BlogPost {
  id: string;                              // 唯一ID (UUID)
  slug: string;                            // URL slug
  coverImage: string;                      // 封面图片路径
  tags: string[];                          // 标签数组
  author: string;                          // 作者
  date: string;                            // 日期
  readTime: string;                        // 阅读时间 (如 "8 min read")
  published: boolean;                       // 是否发布
  content: Record<string, BlogContent>;     // 每种语言的内容
  createdAt: string;                        // 创建时间
  updatedAt: string;                        // 更新时间
}
```

---

## 5. 国际化 (i18n)

### 5.1 支持的语言

| 代码 | 语言 | 方向 | 状态 |
|------|------|------|------|
| en | English | LTR | 活跃 |
| zh | 中文 | LTR | 活跃 |
| ru | Русский | LTR | 活跃 |
| ar | العربية | RTL | 活跃 |
| fa | فارسی | RTL | 活跃 |
| la | Latina | LTR | 活跃 |

### 5.2 翻译文件结构

```
project/src/messages/
├── en.json    # 英文翻译
├── zh.json    # 中文翻译
├── ru.json    # 俄文翻译
├── ar.json    # 阿拉伯文翻译
├── fa.json    # 波斯文翻译
└── la.json    # 拉丁文翻译
```

### 5.3 URL 路由

- `/en/products` - 英文产品页
- `/zh/products` - 中文产品页
- `/ar/products` - 阿拉伯文产品页 (RTL)

---

## 6. 前台页面结构

```
/                           # 首页
├── /products               # 产品列表
│   └── /products/[slug]   # 产品详情
├── /blog                  # 博客列表
│   └── /blog/[slug]       # 博客文章
├── /about                 # 关于我们
└── /contact               # 联系页面
```

### 6.1 首页 (/)

**功能**
- Hero 区域：大图背景 + 公司 slogan + CTA
- 特色产品展示
- 公司优势介绍
- 页脚：导航链接、版权信息

**数据源**
```typescript
// 组件内部调用
const res = await fetch("http://localhost:3001/api/products");
const products = (await res.json()).data.filter(p => p.published);
```

---

### 6.2 产品列表 (/products)

**功能**
- 网格展示所有已发布产品
- 产品卡片：图片、名称、描述摘要

**数据源**
```typescript
fetch("http://localhost:3001/api/products")
  .then(res => res.json())
  .then(data => data.data.filter((p: Product) => p.published))
```

---

### 6.3 产品详情 (/products/[slug])

**功能**
- 产品大图展示
- 多语言参数表格
- 询价 CTA 按钮
- 分享按钮

**数据源**
```typescript
// 前台详情页获取产品列表后用 slug 过滤
const found = products.find((p: Product) => p.slug.toLowerCase() === slug.toLowerCase());
```

---

### 6.4 博客列表 (/blog)

**功能**
- 特色文章 (第一篇大图展示)
- 博客网格列表
- Newsletter CTA

**数据源**
```typescript
fetch("http://localhost:3001/api/blog")
  .then(res => res.json())
  .then(data => data.data.filter((p: BlogPost) => p.published))
```

---

### 6.5 博客详情 (/blog/[slug])

**功能**
- 文章封面大图
- Markdown 内容渲染
- 相关文章推荐
- 分享按钮
- 询价 CTA

**数据源**
```typescript
// 获取所有文章后用 slug 过滤
const found = posts.find((p: BlogPost) => p.slug.toLowerCase() === slug.toLowerCase());
```

---

## 7. 后台管理结构

### 7.1 页面路由

```
/admin/login           # 登录页
/admin                 # 管理后台首页 (仪表盘)
/admin/products        # 产品管理
/admin/blog           # 博客管理
```

### 7.2 产品管理功能

| 功能 | 说明 |
|------|------|
| 产品列表 | DataTable 展示，支持搜索、状态筛选 |
| 新建产品 | 打开 Modal 表单 |
| 编辑产品 | 打开 Modal 表单（预填充数据） |
| 删除产品 | 确认后删除 |
| 图片上传 | 调 API 上传，返回 URL |
| 多语言编辑 | LanguageTabs 切换语言 |
| 翻译按钮 | 调翻译 API，填充其他语言 |
| 发布状态 | Toggle 开关 |

### 7.3 博客管理功能

| 功能 | 说明 |
|------|------|
| 文章列表 | DataTable 展示，支持搜索、状态筛选 |
| 新建文章 | 打开 Modal 表单 |
| 编辑文章 | 打开 Modal 表单（预填充数据） |
| 删除文章 | 确认后删除 |
| 封面图上传 | 调 API 上传，返回 URL |
| 多语言编辑 | LanguageTabs 切换语言 |
| 翻译按钮 | 调翻译 API，填充其他语言 |
| 发布状态 | Toggle 开关 |
| 标签管理 | 输入框添加标签 |

---

## 8. 组件库

### 8.1 前台组件 (project/src/components/)

| 组件 | 文件 | 说明 |
|------|------|------|
| Header | Header.tsx | 导航栏 + 语言切换 |
| Footer | Footer.tsx | 页脚 |
| SEO | SEO.tsx | Meta 标签管理 |
| GA4 | GA4.tsx | Google Analytics |
| ShareButtons | ShareButtons.tsx | 社交分享 |

### 8.2 后台组件 (backend/components/)

| 组件 | 文件 | 说明 |
|------|------|------|
| AdminHeader | AdminHeader.tsx | 后台顶部栏 |
| AdminSidebar | AdminSidebar.tsx | 后台侧边栏 |
| Button | Button.tsx | 按钮组件 |
| Input | Input.tsx | 输入框组件 |
| Select | Select.tsx | 下拉选择 |
| DataTable | DataTable.tsx | 数据表格 |
| Modal | Modal.tsx | 模态框 |
| StatusBadge | StatusBadge.tsx | 状态徽章 |
| ImageUpload | ImageUpload.tsx | 图片上传 |
| ParameterTable | ParameterTable.tsx | 产品参数表格 |
| LanguageTabs | LanguageTabs.tsx | 语言切换标签 |

---

## 9. 环境变量

### 9.1 前台环境变量 (.env)

```env
# EmailJS 配置
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

### 9.2 后台环境变量 (.env)

```env
# 管理员密码
ADMIN_PASSWORD=admin123

# 翻译 API (可选，使用默认值)
TRANSLATION_API_URL=https://api.mymemory.translated.net/get
```

---

## 10. 部署架构

### 10.1 当前架构 (开发环境)

```
用户浏览器
    │
    ▼
┌─────────────┐     ┌─────────────┐
│  Frontend  │────▶│  Backend    │
│  :3000     │◀────│  :3001     │
└─────────────┘     └─────────────┘
                         │
                         ▼
                  ┌─────────────┐
                  │ JSON Files  │
                  │ + Images    │
                  └─────────────┘
```

### 10.2 目标架构 (Cloudflare)

```
用户浏览器
    │
    ├──────────────────────────────┐
    │                              │
    ▼                              ▼
┌─────────────┐              ┌─────────────┐
│ Cloudflare │              │ Cloudflare  │
│  Pages     │              │  Workers    │
│ (Frontend) │              │  (API)      │
└─────────────┘              └─────────────┘
                                  │
                                  ▼
                           ┌─────────────┐
                           │ Cloudflare   │
                           │  R2 / KV     │
                           │ (Data + CDN) │
                           └─────────────┘
```

---

*文档版本: 1.0*
*最后更新: 2026-04-18*

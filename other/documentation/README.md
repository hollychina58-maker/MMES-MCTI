# MMES-MCTI 外贸B2B网站

## 项目概述

科技感十足的**外贸B2B展示型网站**，支持6种语言（含RTL），集成SEO、博客、管理后台、EmailJS询价等功能。

## 技术栈

- **框架**: Next.js 16.2.4 (App Router)
- **语言**: TypeScript
- **样式**: TailwindCSS v4
- **动画**: Framer Motion
- **多语种**: next-intl
- **邮件**: EmailJS
- **部署**: Vercel (推荐)

## 目录结构

```
/project
├── /src
│   ├── /app                    # Next.js App Router
│   │   ├── /[locale]           # 多语言路由
│   │   │   ├── page.tsx        # 首页
│   │   │   ├── /products       # 产品页
│   │   │   ├── /about          # 关于我们
│   │   │   ├── /contact        # 联系页面
│   │   │   ├── /blog           # 博客列表
│   │   │   └── /blog/[slug]    # 博客文章
│   │   ├── /admin              # 管理后台
│   │   ├── sitemap.ts          # SEO sitemap
│   │   └── robots.ts           # SEO robots
│   ├── /components             # 可复用组件
│   ├── /i18n                  # i18n配置
│   └── /messages              # 翻译文件
├── /images                    # 产品图片
└── /public                   # 静态资源
```

## 多语言支持

- **英文** (en)
- **俄文** (ru)
- **阿拉伯文** (ar) - RTL
- **中文** (zh)
- **波斯文** (fa) - RTL
- **拉丁文** (la)

## 功能模块

1. **首页** - Hero、产品展示、特性、CTA
2. **产品页** - 产品列表、详情（含社交分享）
3. **博客系统** - 文章列表、管理后台
4. **联系表单** - EmailJS集成
5. **SEO** - sitemap、robots.txt、GA4、结构化数据

## 开发

```bash
cd project
npm install
npm run dev
```

## 部署

```bash
npm run build
vercel --prod
```

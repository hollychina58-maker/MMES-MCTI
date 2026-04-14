# MEMS-MCTI 网站 UI 设计规范

## 1. 概述

### 1.1 设计定位
本规范面向测控与导航专业公司网站，采用苹果官网科技感设计风格，结合现代商务科技模板美学，打造专业、高端、可信的企业形象。

### 1.2 设计愿景
- 传达高精度科技产品的可靠性与专业性
- 通过简洁现代的视觉语言展现企业技术实力
- 提供流畅的用户体验，支持8种语言

### 1.3 设计参考
- Apple.com - 极简布局、留白、清晰层次
- 现代科技企业官网 - 渐变背景、微交互、卡片式布局

---

## 2. 色彩系统

### 2.1 主色板 (Primary Palette)

| 名称 | 色值 | 用途 |
|------|------|------|
| Primary Blue | `#0066CC` | 主按钮、链接、强调元素 |
| Primary Dark | `#004999` | 按钮悬停、深色主题背景 |
| Primary Light | `#E6F0FA` | 浅色背景、分隔线 |
| Primary Glow | `rgba(0, 102, 204, 0.15)` | 发光效果、选中状态 |

### 2.2 辅助色板 (Secondary Palette)

| 名称 | 色值 | 用途 |
|------|------|------|
| Steel Gray | `#6B7280` | 正文文字、次要元素 |
| Dark Slate | `#374151` | 标题文字 |
| Cool Gray | `#9CA3AF` | 占位符、禁用状态 |
| Light Gray | `#F3F4F6` | 背景、卡片边框 |
| White | `#FFFFFF` | 主背景 |
| Pure Black | `#111827` | 深色主题背景 |

### 2.3 强调色板 (Accent Palette)

| 名称 | 色值 | 用途 |
|------|------|------|
| Tech Cyan | `#00D4FF` | 高亮、科技效果、数据可视化 |
| Success Green | `#10B981` | 成功状态、正面指标 |
| Warning Amber | `#F59E0B` | 警告状态 |
| Error Red | `#EF4444` | 错误状态、紧急提示 |

### 2.4 背景渐变

```css
/* Hero 区域背景渐变 */
--gradient-hero: linear-gradient(135deg, #0A1628 0%, #1E3A5F 50%, #0A1628 100%);

/* 科技感网格背景 */
--gradient-tech-grid: linear-gradient(90deg, rgba(0, 102, 204, 0.03) 1px, transparent 1px),
                      linear-gradient(rgba(0, 102, 204, 0.03) 1px, transparent 1px);

/* 卡片悬浮渐变 */
--gradient-card-hover: linear-gradient(180deg, rgba(0, 102, 204, 0.05) 0%, rgba(0, 102, 204, 0.02) 100%);
```

---

## 3. 字体系统

### 3.1 字体族

```css
/* 中文字体栈 */
--font-zh: "PingFang SC", "Microsoft YaHei", "Hiragino Sans GB", "WenQuanYi Micro Hei", sans-serif;

/* 英文字体栈 */
--font-en: "SF Pro Display", "Inter", "Helvetica Neue", Arial, sans-serif;

/* 俄文字体栈 */
--font-ru: "SF Pro Display", "Inter", "Arial", sans-serif;

/* 阿拉伯文/波斯文字体栈 */
--font-ar: "Noto Sans Arabic", "Arabic Typesetting", "Traditional Arabic", sans-serif;

/* 乌兹别克文字体栈 */
--font-uz: "Noto Sans", "Verdana", sans-serif;

/* 土耳其文字体栈 */
--font-tr: "SF Pro Display", "Inter", Arial, sans-serif;

/* 拉丁文字体栈 */
--font-la: "SF Pro Display", "Inter", "Times New Roman", serif;
```

### 3.2 字体尺寸 (Typographic Scale)

| 名称 | 尺寸 | 行高 | 用途 |
|------|------|------|------|
| Display XL | 3.5rem (56px) | 1.1 | Hero 标题 |
| Display L | 2.5rem (40px) | 1.15 | 页面主标题 |
| Display M | 1.75rem (28px) | 1.2 | 区块标题 |
| Heading 1 | 1.5rem (24px) | 1.3 | 产品名称 |
| Heading 2 | 1.25rem (20px) | 1.35 | 卡片标题 |
| Body L | 1.125rem (18px) | 1.6 | 重要正文 |
| Body | 1rem (16px) | 1.6 | 正文内容 |
| Body S | 0.875rem (14px) | 1.5 | 次要文字 |
| Caption | 0.75rem (12px) | 1.4 | 标签、注释 |

### 3.3 字体权重

| 名称 | 字重 | 用途 |
|------|------|------|
| Thin | 100 | 装饰性文字 |
| Light | 300 | 辅助说明 |
| Regular | 400 | 正文内容 |
| Medium | 500 | 次要标题 |
| Semibold | 600 | 主要标题、按钮 |
| Bold | 700 | 强调内容 |

---

## 4. 间距系统

### 4.1 基础间距单位
```css
--space-unit: 8px;
```

### 4.2 间距层级

| 名称 | 值 | 用途 |
|------|------|------|
| space-xs | 4px | 图标与文字间距 |
| space-sm | 8px | 紧凑元素间距 |
| space-md | 16px | 常规元素间距 |
| space-lg | 24px | 区块内部间距 |
| space-xl | 32px | 区块间距 |
| space-2xl | 48px | 大区块间距 |
| space-3xl | 64px | 页面顶部/底部间距 |
| space-4xl | 96px | Hero 区域间距 |

### 4.3 容器宽度

| 断点 | 最大宽度 | 内边距 |
|------|----------|--------|
| < 576px | 100% | 16px |
| 576-991px | 720px | 24px |
| 992-1199px | 960px | 32px |
| >= 1200px | 1200px | 48px |

---

## 5. 圆角与阴影

### 5.1 圆角系统

```css
--radius-sm: 4px;    /* 输入框、标签 */
--radius-md: 8px;    /* 按钮、卡片 */
--radius-lg: 12px;   /* 模态框、大型卡片 */
--radius-xl: 16px;   /* 特色区块 */
--radius-full: 9999px; /* 圆形按钮、头像 */
```

### 5.2 阴影系统

```css
/* 卡片阴影 */
--shadow-card: 0 2px 8px rgba(0, 0, 0, 0.06);
--shadow-card-hover: 0 8px 24px rgba(0, 102, 204, 0.12);
--shadow-card-active: 0 2px 4px rgba(0, 0, 0, 0.08);

/* 按钮阴影 */
--shadow-button: 0 2px 8px rgba(0, 102, 204, 0.25);
--shadow-button-hover: 0 4px 16px rgba(0, 102, 204, 0.35);

/* 导航栏阴影 */
--shadow-nav: 0 1px 3px rgba(0, 0, 0, 0.08);

/* 悬浮层阴影 */
--shadow-dropdown: 0 10px 40px rgba(0, 0, 0, 0.12);

/* 发光效果 */
--glow-primary: 0 0 20px rgba(0, 102, 204, 0.3);
--glow-tech: 0 0 30px rgba(0, 212, 255, 0.2);
```

---

## 6. 布局结构

### 6.1 页面整体架构

```
+----------------------------------------------------------+
|  [Logo]        导航菜单                    [语言切换] [联系] |  <- 固定顶部导航
+----------------------------------------------------------+
|                                                              |
|  +--------------------------------------------------------+  |
|  |                     HERO SECTION                        |  |  <- 视差背景
|  |         科技感渐变 + 网格 + 产品slogan                   |  |
|  |              [了解更多] [联系我们]                        |  |
|  +--------------------------------------------------------+  |
|                                                              |
|  +--------------------------------------------------------+  |
|  |                   产品分类导航                          |  |  <- 水平滚动标签
|  |   [IMU] [AHRS] [航空设备] [加速度计] [GPS系统] [电源]     |  |
|  +--------------------------------------------------------+  |
|                                                              |
|  +--------------------------------------------------------+  |
|  |                    产品展示网格                          |  |  <- 响应式卡片
|  |   +-------+  +-------+  +-------+  +-------+            |  |
|  |   |       |  |       |  |       |  |       |            |  |
|  |   | 产品  |  | 产品  |  | 产品  |  | 产品  |            |  |
|  |   | 卡片  |  | 卡片  |  | 卡片  |  | 卡片  |            |  |
|  |   +-------+  +-------+  +-------+  +-------+            |  |
|  +--------------------------------------------------------+  |
|                                                              |
|  +--------------------------------------------------------+  |
|  |                    技术优势                              |  |  <- 三列图标+文字
|  |      [图标]          [图标]          [图标]              |  |
|  |     高精度           小体积         低功耗              |  |
|  +--------------------------------------------------------+  |
|                                                              |
|  +--------------------------------------------------------+  |
|  |                    应用领域                              |  |  <- 六边形象征
|  |   航空  航天  船舶  车辆  无人机  测绘                   |  |
|  +--------------------------------------------------------+  |
|                                                              |
|  +--------------------------------------------------------+  |
|  |                    关于我们                              |  |  <- 左图右文
|  |   [图片]  公司介绍文字                                    |  |
|  +--------------------------------------------------------+  |
|                                                              |
|  +--------------------------------------------------------+  |
|  |                    页脚                                  |  |  <- 深色背景
|  |   产品导航 | 公司信息 | 联系方式 | 社交媒体               |  |
|  +--------------------------------------------------------+  |
+----------------------------------------------------------+
```

### 6.2 栅格系统

```css
/* 桌面: 12列 */
--grid-columns: 12;
--grid-gutter: 24px;

/* 平板: 8列 */
--grid-columns-tablet: 8;

/* 手机: 4列 */
--grid-columns-mobile: 4;
```

### 6.3 响应式断点

| 名称 | 断点范围 | 列数 | 卡片数/行 |
|------|----------|------|-----------|
| 手机 | < 576px | 4 | 1 |
| 平板竖屏 | 576-767px | 8 | 2 |
| 平板横屏 | 768-991px | 8 | 2-3 |
| 桌面 | 992-1199px | 12 | 3 |
| 大桌面 | >= 1200px | 12 | 4 |

---

## 7. 组件设计

### 7.1 导航栏 (Navigation Bar)

```css
/* 基础样式 */
.nav {
  height: 64px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

/* 滚动后样式 */
.nav.scrolled {
  box-shadow: var(--shadow-nav);
}

/* 移动端菜单 */
.nav-mobile-toggle {
  display: none;
  width: 44px;
  height: 44px;
}

@media (max-width: 991px) {
  .nav-menu {
    position: fixed;
    top: 64px;
    left: 0;
    right: 0;
    background: white;
    flex-direction: column;
    padding: 24px;
    transform: translateY(-100%);
    opacity: 0;
    pointer-events: none;
    transition: all 0.3s ease;
  }

  .nav-menu.active {
    transform: translateY(0);
    opacity: 1;
    pointer-events: auto;
  }
}
```

### 7.2 语言切换器

```css
.lang-switcher {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
}

.lang-switcher-btn {
  padding: 8px 12px;
  border-radius: var(--radius-md);
  background: transparent;
  border: 1px solid var(--color-light-gray);
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
}

.lang-switcher-btn:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.lang-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 4px;
  background: white;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-dropdown);
  min-width: 160px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-8px);
  transition: all 0.2s ease;
  z-index: 1000;
}

.lang-switcher:hover .lang-dropdown {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.lang-option {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  cursor: pointer;
  transition: background 0.15s ease;
}

.lang-option:hover {
  background: var(--color-primary-light);
}

.lang-option.active {
  color: var(--color-primary);
  font-weight: 600;
}
```

### 7.3 按钮 (Buttons)

```css
/* 主要按钮 */
.btn-primary {
  padding: 12px 28px;
  background: var(--color-primary);
  color: white;
  border-radius: var(--radius-md);
  font-weight: 600;
  font-size: 16px;
  border: none;
  cursor: pointer;
  box-shadow: var(--shadow-button);
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-primary:hover {
  background: var(--color-primary-dark);
  box-shadow: var(--shadow-button-hover);
  transform: translateY(-2px);
}

.btn-primary:active {
  transform: translateY(0);
  box-shadow: var(--shadow-button);
}

/* 次要按钮 */
.btn-secondary {
  padding: 12px 28px;
  background: transparent;
  color: var(--color-primary);
  border: 2px solid var(--color-primary);
  border-radius: var(--radius-md);
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.25s ease;
}

.btn-secondary:hover {
  background: var(--color-primary);
  color: white;
}

/* 幽灵按钮 */
.btn-ghost {
  padding: 12px 28px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: var(--radius-md);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.25s ease;
}

.btn-ghost:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.5);
}

/* 禁用状态 */
.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none !important;
}
```

### 7.4 卡片 (Cards)

```css
/* 产品卡片 */
.product-card {
  background: white;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-card);
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.product-card:hover {
  box-shadow: var(--shadow-card-hover);
  transform: translateY(-8px);
}

.product-card-image {
  width: 100%;
  aspect-ratio: 4/3;
  object-fit: cover;
  background: var(--color-light-gray);
}

.product-card-content {
  padding: 20px;
}

.product-card-category {
  font-size: 12px;
  color: var(--color-primary);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 8px;
}

.product-card-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--color-dark-slate);
  margin-bottom: 8px;
}

.product-card-desc {
  font-size: 14px;
  color: var(--color-steel-gray);
  line-height: 1.5;
}

/* 特色卡片 */
.feature-card {
  padding: 32px;
  background: white;
  border-radius: var(--radius-xl);
  text-align: center;
  transition: all 0.3s ease;
}

.feature-card:hover {
  background: var(--gradient-card-hover);
  transform: translateY(-4px);
}

.feature-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-primary-light);
  border-radius: var(--radius-lg);
  color: var(--color-primary);
}

/* 应用领域卡片 */
.application-card {
  position: relative;
  aspect-ratio: 1;
  background: linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary) 100%);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 18px;
  font-weight: 600;
  overflow: hidden;
}

.application-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.1) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.application-card:hover::before {
  opacity: 1;
}
```

### 7.5 模态框 (Modal)

```css
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

.modal-overlay.active {
  opacity: 1;
  visibility: visible;
}

.modal {
  background: white;
  border-radius: var(--radius-xl);
  max-width: 90vw;
  max-height: 90vh;
  overflow: auto;
  transform: scale(0.9) translateY(20px);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-overlay.active .modal {
  transform: scale(1) translateY(0);
}

.modal-close {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-full);
  background: var(--color-light-gray);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;
}

.modal-close:hover {
  background: var(--color-steel-gray);
  color: white;
}
```

### 7.6 表单元素 (Forms)

```css
.input {
  width: 100%;
  padding: 14px 16px;
  border: 1px solid var(--color-light-gray);
  border-radius: var(--radius-md);
  font-size: 16px;
  transition: all 0.2s ease;
}

.input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px var(--color-primary-glow);
}

.input::placeholder {
  color: var(--color-cool-gray);
}

.input.error {
  border-color: var(--color-error);
}

.textarea {
  min-height: 120px;
  resize: vertical;
}

.select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding-right: 40px;
}
```

### 7.7 标签页 (Tabs)

```css
.tabs {
  display: flex;
  gap: 4px;
  border-bottom: 1px solid var(--color-light-gray);
  overflow-x: auto;
}

.tab {
  padding: 12px 24px;
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  font-size: 15px;
  font-weight: 500;
  color: var(--color-steel-gray);
  white-space: nowrap;
  transition: all 0.2s ease;
}

.tab:hover {
  color: var(--color-primary);
}

.tab.active {
  color: var(--color-primary);
  border-bottom-color: var(--color-primary);
}
```

---

## 8. 动效系统

### 8.1 滚动渐现效果 (Fade-in)

```css
/* 基础渐现动画 */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* 向上渐现 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 向左渐现 */
@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* 向右渐现 */
@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* 缩放渐现 */
@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* 应用类 */
.fade-in {
  opacity: 0;
  transition: opacity 0.6s ease;
}

.fade-in.visible {
  animation: fadeIn 0.6s ease forwards;
}

.fade-in-up {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.fade-in-up.visible {
  animation: fadeInUp 0.6s ease forwards;
}
```

### 8.2 悬浮上浮效果 (Slide-up)

```css
/* 卡片悬浮上浮 */
.slide-up-hover {
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.35s ease;
}

.slide-up-hover:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-card-hover);
}

/* 按钮悬浮上浮 */
.btn-slide-up {
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.25s ease;
}

.btn-slide-up:hover {
  transform: translateY(-2px);
}

/* 图片放大效果 */
.img-zoom-hover {
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.img-zoom-hover:hover {
  transform: scale(1.05);
}
```

### 8.3 视差效果 (Parallax)

```css
/* Hero 视差背景 */
.parallax-hero {
  position: relative;
  overflow: hidden;
}

.parallax-bg {
  position: absolute;
  inset: -20%;
  background: var(--gradient-hero);
  will-change: transform;
}

/* 滚动触发视差 */
.parallax-element {
  will-change: transform;
  transition: transform 0.1s linear;
}

/* 多层视差 */
.parallax-layers {
  position: relative;
}

.parallax-layer {
  position: absolute;
  inset: 0;
}

.parallax-layer-1 {
  z-index: 1;
}

.parallax-layer-2 {
  z-index: 2;
}

.parallax-layer-3 {
  z-index: 3;
}

/* JavaScript 视差实现参考 */
 /*
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax-bg');
    parallaxElements.forEach(el => {
      const speed = 0.5;
      el.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });
 */
```

### 8.4 微交互动效

```css
/* 链接下划线动画 */
.link-underline {
  position: relative;
  text-decoration: none;
}

.link-underline::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1px;
  background: currentColor;
  transition: width 0.3s ease;
}

.link-underline:hover::after {
  width: 100%;
}

/* 图标旋转 */
.icon-rotate {
  transition: transform 0.3s ease;
}

.icon-rotate:hover {
  transform: rotate(15deg);
}

/* 加载动画 */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.loading-pulse {
  animation: pulse 1.5s ease-in-out infinite;
}

/* 骨架屏动画 */
@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}
```

### 8.5 页面切换过渡

```css
/* 页面加载动画 */
.page-transition {
  animation: pageEnter 0.5s ease forwards;
}

@keyframes pageEnter {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 路由切换动画 */
.page-exit {
  animation: pageExit 0.3s ease forwards;
}

@keyframes pageExit {
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
}
```

---

## 9. RTL 适配方案

### 9.1 RTL 基础设置

```css
/* 文档方向 */
html[dir="rtl"] {
  direction: rtl;
}

/* 阿拉伯文基础字体 */
html[lang="ar"],
html[lang="fa"] {
  font-family: var(--font-ar);
}

/* 文本对齐重置 */
[dir="rtl"] .text-left {
  text-align: right;
}

[dir="rtl"] .text-right {
  text-align: left;
}

/* 水平方向翻转 */
[dir="rtl"] .flip-rtl {
  transform: scaleX(-1);
}
```

### 9.2 导航栏 RTL 适配

```css
[dir="rtl"] .nav {
  /* 移动端菜单位置 */
}

[dir="rtl"] .nav-menu {
  left: auto;
  right: 0;
}

[dir="rtl"] .nav-logo {
  margin-right: 0;
  margin-left: auto;
}

/* 语言切换器位置 */
[dir="rtl"] .lang-dropdown {
  right: auto;
  left: 0;
}
```

### 9.3 布局 RTL 适配

```css
/* 栅格系统 */
[dir="rtl"] .row {
  direction: rtl;
}

/* Flex 布局方向 */
[dir="rtl"] .flex-row {
  flex-direction: row-reverse;
}

/* 水平间距 */
[dir="rtl"] .ml-auto { margin-left: 0; margin-right: auto; }
[dir="rtl"] .mr-auto { margin-right: 0; margin-left: auto; }

/* 水平padding重置 */
[dir="rtl"] .pl-4 { padding-left: 0; padding-right: 1rem; }
[dir="rtl"] .pr-4 { padding-right: 0; padding-left: 1rem; }
```

### 9.4 组件 RTL 适配

```css
/* 图标方向 */
[dir="rtl"] .icon-arrow-next { transform: scaleX(-1); }
[dir="rtl"] .icon-arrow-prev { transform: scaleX(-1); }
[dir="rtl"] .icon-chevron-right { transform: scaleX(-1); }
[dir="rtl"] .icon-chevron-left { transform: scaleX(-1); }

/* 面包屑导航 */
[dir="rtl"] .breadcrumb {
  flex-direction: row-reverse;
}

/* 进度条 */
[dir="rtl"] .progress-bar {
  transform-origin: right;
}

/* 轮播箭头 */
[dir="rtl"] .carousel-prev {
  left: auto;
  right: 16px;
}

[dir="rtl"] .carousel-next {
  right: auto;
  left: 16px;
}
```

### 9.5 滚动条 RTL

```css
[dir="rtl"] ::-webkit-scrollbar {
  /* 滚动条位置 */
}
```

---

## 10. 多语言适配

### 10.1 语言列表

| 语言代码 | 语言名称 | 方向 | 字体 |
|----------|----------|------|------|
| zh | 中文 | LTR | PingFang SC / Microsoft YaHei |
| en | English | LTR | SF Pro Display / Inter |
| ru | Русский | LTR | SF Pro Display / Arial |
| ar | العربية | RTL | Noto Sans Arabic |
| uz | O'zbek | LTR | Noto Sans |
| fa | فارسی | RTL | Noto Sans Arabic |
| tr | Türkçe | LTR | SF Pro Display / Inter |
| la | Latina | LTR | SF Pro Display / Times New Roman |

### 10.2 语言文件结构

```
/locales
  /zh
    common.json
    products.json
  /en
    common.json
    products.json
  /ru
    common.json
    products.json
  /ar
    common.json
    products.json
  /uz
    common.json
    products.json
  /fa
    common.json
    products.json
  /tr
    common.json
    products.json
  /la
    common.json
    products.json
```

### 10.3 语言切换实现

```javascript
// 语言切换函数
function switchLanguage(langCode) {
  // 1. 更新 HTML lang 属性
  document.documentElement.lang = langCode;

  // 2. 设置 RTL/LTR
  const rtlLanguages = ['ar', 'fa'];
  document.documentElement.dir = rtlLanguages.includes(langCode) ? 'rtl' : 'ltr';

  // 3. 加载语言文件
  loadLocaleFile(langCode).then(translations => {
    // 4. 更新页面文本
    updatePageTranslations(translations);
  });

  // 5. 保存偏好
  localStorage.setItem('preferredLanguage', langCode);
}
```

---

## 11. 响应式设计

### 11.1 媒体查询断点

```css
/* 手机 */
@media (max-width: 575.98px) {
  .container {
    max-width: 100%;
    padding: 0 16px;
  }

  .hero-title {
    font-size: 2rem;
  }

  .product-grid {
    grid-template-columns: 1fr;
  }

  .feature-grid {
    grid-template-columns: 1fr;
  }

  .nav {
    height: 56px;
  }

  .nav-menu {
    top: 56px;
  }
}

/* 平板 */
@media (min-width: 576px) and (max-width: 991.98px) {
  .container {
    max-width: 720px;
  }

  .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .feature-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* 桌面 */
@media (min-width: 992px) and (max-width: 1199.98px) {
  .container {
    max-width: 960px;
  }

  .product-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .feature-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* 大桌面 */
@media (min-width: 1200px) {
  .container {
    max-width: 1200px;
  }

  .product-grid {
    grid-template-columns: repeat(4, 1fr);
  }

  .feature-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

### 11.2 移动端优化

```css
/* 触摸友好的点击区域 */
@media (max-width: 991.98px) {
  .btn {
    min-height: 44px;
    min-width: 44px;
  }

  .nav-link {
    padding: 16px;
  }

  /* 移除桌面端悬停效果 */
  .slide-up-hover:hover {
    transform: none;
  }
}

/* 移动端图片优化 */
@media (max-width: 575.98px) {
  img {
    max-width: 100%;
    height: auto;
  }
}
```

### 11.3 横屏适配

```css
@media (orientation: landscape) and (max-height: 500px) {
  .hero {
    min-height: 80vh;
  }

  .hero-title {
    font-size: 2.5rem;
  }
}
```

---

## 12. 图片规范

### 12.1 图片目录
```
D:\projects\MEMS-MCTI\images\
```

### 12.2 产品图片清单 (21张)

| 文件名 | 产品 | 用途 |
|--------|------|------|
| PA-3ARG-A.JPG | 三轴一体化导航系统 | 产品展示 |
| PA-3ARG-D.JPG | 三轴一体化导航系统 | 产品展示 |
| PA-AHRS01.jpg | 姿态航向参考系统 | 产品展示 |
| PA-ARG-A.JPG | 应变式加速度计 | 产品展示 |
| PA-ARG-D.JPG | 应变式加速度计 | 产品展示 |
| PA-GS.JPG | 定位测姿系统 | 产品展示 |
| PA-GS01.JPG | GPS定位测姿系统 | 产品展示 |
| PA-GS02.JPG | 双天线GPS定位测姿系统 | 产品展示 |
| PA-GSAUTO.JPG | 车载GPS定位测姿系统 | 产品展示 |
| PA-GSFA1.jpg | 车载GPS定位测姿系统 | 产品展示 |
| PA-IMU-01D.jpg | 惯性测量单元 | 产品展示 |
| PA-IMU-01G.jpg | 惯性测量单元 | 产品展示 |
| PA-IMU-02D03D.jpg | 双轴光纤陀螺仪 | 产品展示 |
| PA-LAMIII-D.JPG | (文件名可能有误) | 产品展示 |
| PA-LASI-A.JPG | 激光捷联惯性导航系统 | 产品展示 |
| PA-LASIII-A.JPG | 激光捷联惯性导航系统 | 产品展示 |
| PA-VG11.JPG | 垂直陀螺仪 | 产品展示 |
| PM-C3000.jpg | 电源模块 | 产品展示 |
| PM-TS-VG.jpg | 电源模块 | 产品展示 |

### 12.3 图片加载策略

```css
/* 懒加载 */
img[lazy] {
  opacity: 0;
  transition: opacity 0.3s ease;
}

img[lazy].loaded {
  opacity: 1;
}

/* 响应式图片 */
.product-image {
  srcset="
    /images/product-400.jpg 400w,
    /images/product-800.jpg 800w,
    /images/product-1200.jpg 1200w
  ";
  sizes="(max-width: 576px) 100vw, (max-width: 992px) 50vw, 25vw";
}
```

---

## 13. 辅助类 (Utility Classes)

```css
/* 文本 */
.text-center { text-align: center; }
.text-left { text-align: left; }
.text-right { text-align: right; }
.text-primary { color: var(--color-primary); }
.text-secondary { color: var(--color-steel-gray); }

/* 背景 */
.bg-white { background-color: white; }
.bg-light { background-color: var(--color-light-gray); }
.bg-dark { background-color: var(--color-dark); }
.bg-gradient { background: var(--gradient-hero); }

/* 间距 */
.m-0 { margin: 0; }
.mt-4 { margin-top: 16px; }
.mb-4 { margin-bottom: 16px; }
.p-4 { padding: 16px; }

/* 圆角 */
.rounded { border-radius: var(--radius-md); }
.rounded-lg { border-radius: var(--radius-lg); }
.rounded-full { border-radius: var(--radius-full); }

/* 阴影 */
.shadow { box-shadow: var(--shadow-card); }
.shadow-lg { box-shadow: var(--shadow-dropdown); }

/* 显示 */
.hidden { display: none; }
.block { display: block; }
.inline-block { display: inline-block; }
.flex { display: flex; }
.grid { display: grid; }

/* 定位 */
.relative { position: relative; }
.absolute { position: absolute; }
.fixed { position: fixed; }
.sticky { position: sticky; }

/* 溢出 */
.overflow-hidden { overflow: hidden; }
.overflow-auto { overflow: auto; }

/* 动画 */
.transition { transition: all 0.3s ease; }
.transition-fast { transition: all 0.15s ease; }
.transition-slow { transition: all 0.5s ease; }
```

---

## 14. 浏览器兼容

### 14.1 支持的浏览器

| 浏览器 | 最低版本 |
|--------|----------|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |
| iOS Safari | 14+ |
| Chrome Android | 90+ |

### 14.2 兼容策略

```css
/* Safari backdrop-filter 兼容 */
@supports (-webkit-backdrop-filter: none) {
  .nav {
    -webkit-backdrop-filter: blur(20px);
  }
}

/* 旧版浏览器回退 */
@supports not (backdrop-filter: blur(20px)) {
  .nav {
    background: rgba(255, 255, 255, 0.98);
  }
}

/* CSS 变量回退 */
.button {
  background: var(--color-primary, #0066CC);
}
```

---

## 15. 验收标准

### 15.1 设计验收

- [ ] 色彩系统覆盖所有状态
- [ ] 字体层级清晰可辨
- [ ] 间距系统保持一致性
- [ ] 动效流畅无卡顿
- [ ] RTL 布局完整适配

### 15.2 响应式验收

- [ ] 手机端 (< 576px) 正常显示
- [ ] 平板端 (576-991px) 正常显示
- [ ] 桌面端 (992-1199px) 正常显示
- [ ] 大桌面端 (>= 1200px) 正常显示
- [ ] 触控操作友好

### 15.3 多语言验收

- [ ] 8种语言切换正常
- [ ] 阿拉伯文/波斯文 RTL 布局正确
- [ ] 语言切换器位置符合规范

---

*文档版本: 1.0*
*创建日期: 2026-04-08*
*设计参考: Apple.com / WordPress 现代科技模板*

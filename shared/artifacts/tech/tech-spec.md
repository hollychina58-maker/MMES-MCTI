# MEMS-MCTI 网站技术规范

## 1. 项目概述

### 1.1 项目背景

测控与导航专业公司网站是一个面向高精度导航技术产品展示的企业官网，采用纯静态HTML技术栈，支持8种语言切换，为航空、航天、船舶、车辆等领域的客户提供专业的产品信息和技术解决方案。

### 1.2 项目目标

- 打造专业、高端、可信的企业形象
- 提供多语言支持（zh/en/ru/ar/uz/fa/tr/la）
- 实现响应式布局，适配各种设备
- 支持产品展示、表单咨询、社交分享等功能

### 1.3 技术选型原则

| 原则 | 说明 |
|------|------|
| 简洁高效 | 纯静态网站，无需后端服务器，降低部署复杂度 |
| 性能优先 | Vanilla JS，无框架依赖，首屏加载快 |
| 国际化 | i18n.js实现8种语言支持，含RTL适配 |
| 可维护性 | CSS模块化，组件化设计，代码结构清晰 |

---

## 2. 技术栈选型

### 2.1 核心技术

| 技术 | 版本 | 用途 |
|------|------|------|
| HTML5 | 语义化 | 页面结构 |
| CSS3 | 模块化 | 样式管理，含CSS变量系统 |
| Vanilla ES6+ | 纯净 | 交互逻辑，无框架依赖 |
| i18n.js | 自定义 | 多语言切换 |
| EmailJS | 3.x | 表单提交 |
| Font Awesome | 6.x | 图标库 |

### 2.2 外部资源

```html
<!-- Font Awesome -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">

<!-- Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```

### 2.3 技术选型理由

**为什么选择纯静态网站？**
- 公司产品信息相对稳定，无需频繁更新
- 降低服务器成本和运维复杂度
- 更快的页面加载速度
- 便于CDN加速和全球部署

**为什么选择Vanilla JS？**
- 无框架依赖，包体积为零
- 对于本项目功能需求，框架是过度设计
- 更精细的DOM控制
- 更容易学习和维护

---

## 3. 架构设计

### 3.1 整体架构

```
+-------------------+     +-------------------+     +-------------------+
|   Browser Client  |     |   Browser Client  |     |   Browser Client  |
|   (zh-CN)         |     |   (ar-SA)         |     |   (en-US)         |
+--------+----------+     +--------+----------+     +--------+----------+
         |                         |                         |
         v                         v                         v
+--------+----------+     +--------+----------+     +--------+----------+
|   HTML + CSS + JS |     |   HTML + CSS + JS |     |   HTML + CSS + JS |
|   (same files)    |     |   (same files)    |     |   (same files)    |
+--------+----------+     +--------+----------+     +--------+----------+
         |                         |                         |
         +-------------------------+-------------------------+
                                   |
                                   v
                    +---------------------------+
                    |   Local Storage          |
                    |   (language preference)  |
                    +---------------------------+
```

### 3.2 模块划分

| 模块 | 职责 | 文件 |
|------|------|------|
| 样式系统 | CSS变量、重置、基础组件、布局、动效 | css/*.css |
| 国际化 | 语言切换、文本替换、RTL适配 | js/i18n.js |
| 交互逻辑 | 导航、表单、滚动效果、分享 | js/main.js |
| 滚动动效 | Intersection Observer 动画触发 | js/scroll-effects.js |
| 表单处理 | EmailJS 集成、表单验证 | js/form.js |
| 分享功能 | 社交媒体链接生成 | js/sharing.js |

### 3.3 数据流

```
用户操作 (点击语言切换)
        │
        v
loadLocaleFile(langCode) ──> /locales/{lang}/common.json
        │
        v
updatePageTranslations() ──> 替换所有 data-i18n 属性元素
        │
        v
localStorage.setItem() ──> 保存用户偏好
        │
        v
document.documentElement.lang/dir ──> 更新HTML属性
```

---

## 4. 目录结构

### 4.1 完整目录树

```
D:\projects\MEMS-MCTI\
├── index.html                      # 首页
├── products\
│   ├── index.html                  # 产品列表页
│   ├── ahrs.html                    # AHRS系列
│   ├── imu.html                     # IMU系列
│   ├── arg.html                     # ARG系列
│   ├── gs.html                      # GS系列
│   ├── vg.html                      # VG系列
│   ├── las-lam.html                 # LAS/LAM系列
│   └── c3000.html                   # C3000系列
├── css\
│   ├── variables.css                # CSS变量定义
│   ├── reset.css                    # 浏览器重置
│   ├── base.css                     # 基础元素样式
│   ├── components.css               # 组件样式
│   ├── layout.css                   # 布局样式
│   ├── animations.css               # 动画定义
│   ├── rtl.css                      # RTL适配
│   ├── pages.css                    # 页面特定样式
│   └── main.css                     # 主入口文件
├── js\
│   ├── main.js                      # 主入口
│   ├── i18n.js                      # 国际化
│   ├── sharing.js                   # 分享功能
│   ├── form.js                      # 表单处理
│   └── scroll-effects.js            # 滚动动效
├── locales\
│   ├── zh\
│   │   ├── common.json              # 通用翻译
│   │   └── products.json            # 产品翻译
│   ├── en\
│   │   ├── common.json
│   │   └── products.json
│   ├── ru\
│   │   ├── common.json
│   │   └── products.json
│   ├── ar\
│   │   ├── common.json
│   │   └── products.json
│   ├── uz\
│   │   ├── common.json
│   │   └── products.json
│   ├── fa\
│   │   ├── common.json
│   │   └── products.json
│   ├── tr\
│   │   ├── common.json
│   │   └── products.json
│   └── la\
│       ├── common.json
│       └── products.json
├── images\                          # 产品图片
│   ├── products\                    # 产品图片
│   └── icons\                       # 图标资源
└── shared\                          # 共享资源
    └── artifacts\                   # 文档产物
        ├── ui\                      # UI设计文档
        ├── tech\                    # 技术文档
        ├── test\                    # 测试报告
        └── resources\              # 资源文件
```

### 4.2 路径规范

| 类型 | 路径格式 | 示例 |
|------|----------|------|
| 页面文件 | `/` 根目录或 `/products/` | `index.html`, `products/imu.html` |
| CSS文件 | `/css/` | `/css/main.css` |
| JS文件 | `/js/` | `/js/main.js` |
| 语言文件 | `/locales/{lang}/` | `/locales/zh/common.json` |
| 产品图片 | `/images/products/` | `/images/products/PA-IMU-01D.jpg` |

---

## 5. 代码规范

### 5.1 HTML规范

**语义化标签**
```html
<!-- 使用语义化标签 -->
<header>...</header>
<nav>...</nav>
<main>
  <section>...</section>
  <article>...</article>
</main>
<footer>...</footer>

<!-- 避免使用无语义标签 -->
<div class="container"></div>  <!-- 仅当无语义可用时才用 -->
```

**i18n属性**
```html
<!-- data-i18n 属性用于标记需要翻译的元素 -->
<h1 data-i18n="home.hero.title">Welcome</h1>
<p data-i18n="home.hero.subtitle">Subtitle text</p>

<!-- 占位符翻译 -->
<input type="text" data-i18n-placeholder="contact.form.name">

<!-- 图片alt翻译 -->
<img src="..." alt="Product" data-i18n-alt="products.imu.alt">
```

**命名规范**
- 类名：kebab-case (如 `.product-card`)
- ID：camelCase (如 `#productDetail`)
- 属性：data-* 自定义属性

### 5.2 CSS规范

**CSS变量命名**
```css
/* 颜色 */
--color-primary: #0066CC;
--color-primary-dark: #004999;
--color-primary-light: #E6F0FA;
--color-primary-glow: rgba(0, 102, 204, 0.15);

/* 字体 */
--font-zh: "PingFang SC", "Microsoft YaHei", sans-serif;
--font-en: "SF Pro Display", "Inter", Arial, sans-serif;
--font-ar: "Noto Sans Arabic", "Arabic Typesetting", sans-serif;

/* 间距 */
--space-unit: 8px;
--space-xs: 4px;
--space-sm: 8px;
--space-md: 16px;
--space-lg: 24px;
--space-xl: 32px;
--space-2xl: 48px;
--space-3xl: 64px;
--space-4xl: 96px;

/* 圆角 */
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-xl: 16px;
--radius-full: 9999px;

/* 阴影 */
--shadow-card: 0 2px 8px rgba(0, 0, 0, 0.06);
--shadow-card-hover: 0 8px 24px rgba(0, 102, 204, 0.12);
--shadow-button: 0 2px 8px rgba(0, 102, 204, 0.25);
--shadow-button-hover: 0 4px 16px rgba(0, 102, 204, 0.35);
```

**选择器规范**
```css
/* 模块化选择器前缀 */
.nav { }
.nav-menu { }
.nav-link { }
.nav-logo { }

.product-card { }
.product-card-image { }
.product-card-title { }

/* 状态类 */
.btn-primary { }
.btn-primary:hover { }
.btn-primary:disabled { }
.btn-primary.active { }
```

**嵌套规范**
```css
/* 最大嵌套层级：3层 */
.card { }
.card-header { }
.card-header-title { }

/* 避免过度嵌套 */
.nav ul li a { }          /* 深层嵌套 - 避免 */
.nav-link { }             /* 直接类名 - 推荐 */
```

**注释规范**
```css
/* ========================================
   导航栏组件
   ======================================== */
.nav { }

/* --- 子组件 --- */
.nav-menu { }

/* 状态 */
.nav-menu.active { }
```

### 5.3 JavaScript规范

**模块结构**
```javascript
// i18n.js
const I18n = {
  currentLang: 'zh',
  translations: {},

  async init() { },
  async loadLocale(langCode) { },
  updatePage() { },
  setDirection() { }
};

// 导出
export default I18n;
```

**函数命名**
```javascript
// 驼峰命名
function switchLanguage() { }
function updatePageTranslations() { }
function handleFormSubmit() { }
function initScrollEffects() { }
```

**事件处理**
```javascript
// 使用箭头函数保持this引用
document.querySelectorAll('.lang-option').forEach(el => {
  el.addEventListener('click', (e) => {
    const langCode = e.target.dataset.lang;
    I18n.switchLanguage(langCode);
  });
});
```

**DOM操作**
```javascript
// 使用querySelector
const element = document.querySelector('.my-element');

// 批量操作使用DocumentFragment
const fragment = document.createDocumentFragment();
items.forEach(item => fragment.appendChild(createItem(item)));
container.appendChild(fragment);
```

**常量定义**
```javascript
const RTL_LANGUAGES = ['ar', 'fa'];
const SUPPORTED_LANGUAGES = ['zh', 'en', 'ru', 'ar', 'uz', 'fa', 'tr', 'la'];
const EMAILJS_SERVICE_ID = 'service_mems_mcti';
const EMAILJS_TEMPLATE_ID = 'template_contact';
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
```

### 5.4 文件组织

**CSS文件加载顺序**
```html
<!-- 必须按此顺序加载 -->
<link rel="stylesheet" href="css/variables.css">
<link rel="stylesheet" href="css/reset.css">
<link rel="stylesheet" href="css/base.css">
<link rel="stylesheet" href="css/components.css">
<link rel="stylesheet" href="css/layout.css">
<link rel="stylesheet" href="css/animations.css">
<link rel="stylesheet" href="css/rtl.css">
<link rel="stylesheet" href="css/pages.css">
<link rel="stylesheet" href="css/main.css">
```

**JS文件加载顺序**
```html
<!-- 必须按此顺序加载 -->
<script type="module" src="js/i18n.js"></script>
<script type="module" src="js/sharing.js"></script>
<script type="module" src="js/form.js"></script>
<script type="module" src="js/scroll-effects.js"></script>
<script type="module" src="js/main.js"></script>
```

---

## 6. 多语言实现

### 6.1 支持的语言

| 代码 | 语言 | 方向 | 字体 |
|------|------|------|------|
| zh | 中文 | LTR | PingFang SC |
| en | English | LTR | Inter |
| ru | Русский | LTR | Inter |
| ar | العربية | RTL | Noto Sans Arabic |
| uz | O'zbek | LTR | Noto Sans |
| fa | فارسی | RTL | Noto Sans Arabic |
| tr | Türkçe | LTR | Inter |
| la | Latina | LTR | Times New Roman |

### 6.2 语言文件结构

**common.json 示例**
```json
{
  "nav": {
    "home": "首页",
    "products": "产品中心",
    "about": "关于我们",
    "contact": "联系我们"
  },
  "hero": {
    "title": "精密测控与导航",
    "subtitle": "为航空、航天、船舶、车辆等领域提供高品质惯性导航产品"
  },
  "footer": {
    "copyright": "© 2024 测控与导航专业公司 版权所有"
  }
}
```

### 6.3 i18n.js API

```javascript
class I18n {
  // 初始化
  async init()

  // 切换语言
  async switchLanguage(langCode)

  // 加载语言文件
  async loadLocaleFile(langCode)

  // 更新页面所有翻译
  updatePageTranslations(translations)

  // 设置RTL/LTR
  setDirection(langCode)

  // 获取当前语言
  getCurrentLang()

  // 从localStorage恢复偏好
  restorePreference()
}
```

### 6.4 RTL适配

**RTL语言检测**
```javascript
const RTL_LANGUAGES = ['ar', 'fa'];

function isRTL(langCode) {
  return RTL_LANGUAGES.includes(langCode);
}
```

**HTML属性更新**
```javascript
function updateDirection(langCode) {
  const html = document.documentElement;
  html.lang = langCode;
  html.dir = isRTL(langCode) ? 'rtl' : 'ltr';
}
```

---

## 7. 分享功能

### 7.1 分享链接格式

| 平台 | URL模板 |
|------|---------|
| Facebook | `https://www.facebook.com/sharer/sharer.php?u={url}` |
| Twitter | `https://twitter.com/intent/tweet?url={url}&text={title}` |
| LinkedIn | `https://www.linkedin.com/shareArticle?url={url}&title={title}` |
| WhatsApp | `https://wa.me/?text={title}%20{url}` |
| Pinterest | `https://pinterest.com/pin/create/button/?url={url}&description={title}` |
| Email | `mailto:?subject={title}&body={url}` |

### 7.2 sharing.js API

```javascript
const Sharing = {
  // 分享到指定平台
  shareToFacebook(url, title)
  shareToTwitter(url, title)
  shareToLinkedIn(url, title)
  shareToWhatsApp(url, title)
  shareToPinterest(url, title)
  shareToEmail(url, title)

  // 获取当前页面信息
  getPageInfo()

  // 打开分享窗口
  openShareWindow(url, width, height)
}
```

### 7.3 HTML使用

```html
<div class="share-buttons">
  <button class="share-btn" data-share="facebook" aria-label="Share on Facebook">
    <i class="fab fa-facebook-f"></i>
  </button>
  <button class="share-btn" data-share="twitter" aria-label="Share on Twitter">
    <i class="fab fa-twitter"></i>
  </button>
  <button class="share-btn" data-share="linkedin" aria-label="Share on LinkedIn">
    <i class="fab fa-linkedin-in"></i>
  </button>
  <button class="share-btn" data-share="whatsapp" aria-label="Share on WhatsApp">
    <i class="fab fa-whatsapp"></i>
  </button>
  <button class="share-btn" data-share="pinterest" aria-label="Share on Pinterest">
    <i class="fab fa-pinterest-p"></i>
  </button>
  <button class="share-btn" data-share="email" aria-label="Share via Email">
    <i class="fas fa-envelope"></i>
  </button>
</div>
```

---

## 8. 表单集成

### 8.1 EmailJS配置

```javascript
// form.js
const FormConfig = {
  serviceId: 'service_mems_mcti',
  templateId: 'template_contact',
  publicKey: 'YOUR_PUBLIC_KEY',
  recipientEmail: 'hollychina58@gmail.com'
};
```

### 8.2 表单字段

| 字段名 | 类型 | 必填 | 验证 |
|--------|------|------|------|
| name | text | 是 | 最少2个字符 |
| email | email | 是 | 有效邮箱格式 |
| product | select | 是 | 选择产品类别 |
| message | textarea | 是 | 最少10个字符 |

### 8.3 表单验证

```javascript
const FormValidator = {
  validateName(value) {
    if (!value || value.length < 2) {
      return { valid: false, message: 'name_error' };
    }
    return { valid: true };
  },

  validateEmail(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return { valid: false, message: 'email_error' };
    }
    return { valid: true };
  },

  validateMessage(value) {
    if (!value || value.length < 10) {
      return { valid: false, message: 'message_error' };
    }
    return { valid: true };
  }
};
```

### 8.4 提交流程

```javascript
async function handleSubmit(event) {
  event.preventDefault();

  // 1. 验证表单
  const formData = getFormData();
  if (!validateForm(formData)) {
    showError('validation_failed');
    return;
  }

  // 2. 显示加载状态
  setLoadingState(true);

  // 3. 发送邮件
  try {
    await emailjs.send(
      FormConfig.serviceId,
      FormConfig.templateId,
      formData
    );
    showSuccess('submit_success');
    resetForm();
  } catch (error) {
    showError('submit_failed');
    console.error('EmailJS Error:', error);
  } finally {
    setLoadingState(false);
  }
}
```

---

## 9. 动效实现

### 9.1 Intersection Observer配置

```javascript
// scroll-effects.js
const ScrollEffects = {
  init() {
    const options = {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver(
      this.handleIntersection.bind(this),
      options
    );

    // 观察所有动效元素
    document.querySelectorAll('.fade-in, .fade-in-up, .fade-in-left, .fade-in-right').forEach(el => {
      observer.observe(el);
    });
  },

  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // 动画完成后停止观察
        // observer.unobserve(entry.target);
      }
    });
  }
};
```

### 9.2 动效类

| 类名 | 效果 | CSS属性 |
|------|------|---------|
| `.fade-in` | 渐现 | opacity: 0 → 1 |
| `.fade-in-up` | 向上渐现 | opacity: 0, translateY: 30px → 1, translateY: 0 |
| `.fade-in-left` | 向左渐现 | opacity: 0, translateX: -30px → 1, translateX: 0 |
| `.fade-in-right` | 向右渐现 | opacity: 0, translateX: 30px → 1, translateX: 0 |
| `.parallax` | 视差 | translateY 跟随滚动 |

### 9.3 视差效果

```javascript
// 简单的视差实现
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll('.parallax');

  parallaxElements.forEach(el => {
    const speed = el.dataset.parallaxSpeed || 0.5;
    el.style.transform = `translateY(${scrolled * speed}px)`;
  });
});
```

### 9.4 动效时长配置

```css
/* 基础动效 */
.fade-in,
.fade-in-up,
.fade-in-left,
.fade-in-right {
  transition-duration: 0.6s;
  transition-timing-function: ease;
}

/* 快速动效 */
.transition-fast {
  transition-duration: 0.15s;
}

/* 慢速动效 */
.transition-slow {
  transition-duration: 0.5s;
}

/* 弹性动效 */
.transition-bounce {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
```

---

## 10. 响应式设计

### 10.1 断点定义

| 名称 | 断点范围 | 容器宽度 | 内边距 |
|------|----------|----------|--------|
| xs | < 576px | 100% | 16px |
| sm | 576-767px | 720px | 24px |
| md | 768-991px | 960px | 32px |
| lg | 992-1199px | 960px | 32px |
| xl | >= 1200px | 1200px | 48px |

### 10.2 响应式容器

```css
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-lg);
}

@media (max-width: 575.98px) {
  .container {
    padding: 0 var(--space-md);
  }
}

@media (min-width: 1200px) {
  .container {
    padding: 0 var(--space-2xl);
  }
}
```

### 10.3 产品网格响应式

```css
.product-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-lg);
}

@media (max-width: 1199.98px) {
  .product-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 991.98px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 575.98px) {
  .product-grid {
    grid-template-columns: 1fr;
  }
}
```

### 10.4 移动端优化

```css
/* 触摸友好的点击区域 */
@media (max-width: 991.98px) {
  .btn {
    min-height: 44px;
    min-width: 44px;
  }

  .nav-link {
    padding: var(--space-md);
  }
}

/* 移除桌面端悬停效果 */
@media (max-width: 991.98px) {
  .slide-up-hover:hover {
    transform: none;
  }
}
```

---

## 11. 浏览器兼容

### 11.1 支持的浏览器

| 浏览器 | 最低版本 |
|--------|----------|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |
| iOS Safari | 14+ |
| Chrome Android | 90+ |

### 11.2 兼容性处理

```css
/* Safari backdrop-filter */
@supports (-webkit-backdrop-filter: none) {
  .nav {
    -webkit-backdrop-filter: blur(20px);
  }
}

@supports not (backdrop-filter: blur(20px)) {
  .nav {
    background: rgba(255, 255, 255, 0.98);
  }
}

/* CSS变量回退 */
.button {
  background: var(--color-primary, #0066CC);
}
```

```javascript
// Intersection Observer 降级
if (!('IntersectionObserver' in window)) {
  // 显示所有动效元素
  document.querySelectorAll('.fade-in, .fade-in-up').forEach(el => {
    el.classList.add('visible');
  });
}
```

---

## 12. 性能优化

### 12.1 图片优化

```html
<!-- 懒加载 -->
<img src="placeholder.jpg" data-src="actual-image.jpg" class="lazy" alt="...">

<!-- 响应式图片 -->
<img srcset="
  /images/product-400.jpg 400w,
  /images/product-800.jpg 800w,
  /images/product-1200.jpg 1200w
" sizes="(max-width: 576px) 100vw, (max-width: 992px) 50vw, 25vw" alt="...">
```

### 12.2 CSS优化

```css
/* 使用will-change提示浏览器 */
.parallax-bg {
  will-change: transform;
}

/* 避免重排重绘 */
.animation {
  transform: translateX(0);
  opacity: 1;
  transition: transform 0.3s, opacity 0.3s;
}
```

### 12.3 JavaScript优化

```javascript
// 防抖
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// 节流
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
```

---

## 13. 安装与运行

### 13.1 本地开发

**前置条件**
- 现代浏览器（Chrome 90+ / Firefox 88+ / Safari 14+）
- 代码编辑器（VS Code推荐）

**步骤**
```bash
# 1. 克隆/下载项目
git clone <repository-url>
cd MEMS-MCTI

# 2. 使用任意HTTP服务器
# 方法1: Python
python -m http.server 8080

# 方法2: Node.js (npx)
npx serve

# 方法3: VS Code Live Server插件

# 3. 浏览器访问
http://localhost:8080
```

### 13.2 目录结构确认

```
MEMS-MCTI/
├── index.html
├── products/
├── css/
├── js/
├── locales/
├── images/
└── shared/
```

---

## 14. 部署说明

### 14.1 静态部署

本项目为纯静态网站，可部署到任何静态托管服务：

| 服务 | 部署方式 |
|------|----------|
| GitHub Pages | Push到gh-pages分支 |
| Vercel | `vercel deploy` |
| Netlify | 拖拽或Git集成 |
| 阿里云OSS | 上传文件即可 |
| 腾讯云COS | 上传文件即可 |

### 14.2 部署检查清单

- [ ] 所有HTML文件完整
- [ ] CSS/JS文件路径正确
- [ ] 语言文件JSON格式正确
- [ ] 产品图片存在且路径正确
- [ ] EmailJS密钥已配置
- [ ] 浏览器兼容性测试通过

### 14.3 CDN配置

建议使用CDN加速静态资源：

```html
<!-- 使用CDN的外部库 -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">

<script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/js/all.min.js"></script>
```

---

## 15. 文件清单

### 15.1 必需文件

| 文件 | 说明 |
|------|------|
| index.html | 首页 |
| products/index.html | 产品列表 |
| css/*.css | 9个CSS模块文件 |
| js/*.js | 5个JS模块文件 |
| locales/*/common.json | 8个语言通用文件 |
| locales/*/products.json | 8个语言产品文件 |

### 15.2 产品页面映射

| 页面 | 产品系列 |
|------|----------|
| products/imu.html | IMU系列（PA-IMU-01D, PA-IMU-01G, PA-IMU-02D03D） |
| products/ahrs.html | AHRS系列（PA-AHRS01） |
| products/vg.html | VG系列（PA-VG11） |
| products/las-lam.html | LAS/LAM系列（PA-LASI-A, PA-LASIII-A） |
| products/arg.html | ARG系列（PA-ARG-A, PA-ARG-D, PA-3ARG-A, PA-3ARG-D） |
| products/gs.html | GS系列（PA-GS, PA-GS01, PA-GS02, PA-GSAUTO, PA-GSFA1） |
| products/c3000.html | C3000系列（PM-C3000, PM-TS-VG） |

---

*文档版本: 1.0*
*创建日期: 2026-04-08*
*最后更新: 2026-04-08*

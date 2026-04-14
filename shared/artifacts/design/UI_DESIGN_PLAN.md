# MEMS-MCTI 网站 UI 风格设计规划

## 一、项目概述

### 1.1 项目背景
MEMS-MCTI 是测控与导航专业公司的惯性导航产品展示网站，主要产品包括 IMU、AHRS、VG、LAS/LAM、ARG、GS、C3000 等高精度惯性导航设备。

### 1.2 设计目标
- 打造极具科技感的视觉体验，传达产品的高精度、高可靠性特质
- 实现流畅的页面滚动动效，增强用户沉浸感
- 优化内容密度，减少产品详情页留白
- 支持 8 种语言（含阿拉伯语、波斯语 RTL 布局）

### 1.3 现有设计问题分析
| 问题 | 现状 | 改进方向 |
|------|------|----------|
| 科技感不足 | 风格偏 Apple 简洁风，缺乏行业特色 | 融入更多科技元素 |
| 留白过多 | 产品详情页大量空白 | 紧凑布局，信息密度提升 |
| 动效单调 | 基础 fade-in 效果 | 增加粒子、渐变、数据可视化动效 |
| 视觉冲击力弱 | 配色保守 | 大胆使用深色背景+霓虹强调色 |

---

## 二、风格方案总览

本设计规划提供 **3 个风格方案** 供选择：

| 方案 | 名称 | 风格定位 | 核心配色 | 推荐指数 |
|------|------|----------|----------|----------|
| 方案 A | 深空科技风 | Deep Space Tech | 深空蓝 + 霓虹青 | ★★★★☆ |
| 方案 B | 工业精密风 | Industrial Precision | 暗金属 + 能量橙 | ★★★★★ |
| 方案 C | 赛博极客风 | Cyber Minimal | 纯黑 + 霓虹紫青 | ★★★★☆ |

---

## 三、方案 A：深空科技风 (Deep Space Tech)

### 3.1 概念描述
灵感来源于太空探索与深海潜航，将导航设备的神秘、高科技特质通过视觉语言传达。整体氛围如同置身于卫星控制中心，深邃的背景配合流动的数据光纹，传递出"精准掌控一切"的感觉。

### 3.2 色彩系统

```css
:root {
  /* 主背景色 - 深空蓝黑 */
  --bg-primary: #050B18;
  --bg-secondary: #0A1628;
  --bg-tertiary: #111B30;
  --bg-card: #0D1F38;

  /* 霓虹强调色 - 科技青 */
  --accent-primary: #00E5FF;
  --accent-secondary: #00B8D4;
  --accent-glow: rgba(0, 229, 255, 0.4);
  --accent-subtle: rgba(0, 229, 255, 0.1);

  /* 辅助强调 - 深空紫 */
  --accent-purple: #7C3AED;
  --accent-purple-glow: rgba(124, 58, 237, 0.3);

  /* 文字色 */
  --text-primary: #FFFFFF;
  --text-secondary: #94A3B8;
  --text-muted: #64748B;

  /* 状态色 */
  --success: #10B981;
  --warning: #F59E0B;
  --error: #EF4444;

  /* 边框/分隔线 */
  --border-color: rgba(0, 229, 255, 0.15);
  --border-hover: rgba(0, 229, 255, 0.4);
}
```

### 3.3 排版布局

**页面结构示意：**
```
+----------------------------------------------------------+
|  [Logo]    产品中心  关于我们  联系我们      [语言] [询价] |  <- 玻璃态导航栏
+----------------------------------------------------------+
|                                                              |
|  +--------------------------------------------------------+  |
|  |              深空背景 + 渐变光效 + 流动网格              |  |
|  |                                                          |  |
|  |           精密测控与导航系统                              |  |
|  |    高精度惯性测量  |  稳定可靠  |  广泛应用              |  |
|  |                                                          |  |
|  |              [探索产品]  [技术参数]                      |  |
|  +--------------------------------------------------------+  |
|                                                              |
|  +--------------------------------------------------------+  |
|  |  技术优势                                                |  |
|  |  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  |  |
|  |  │ 高精度    │  │ 小体积   │  │ 低功耗   │  │ 高可靠   │  |  |
|  |  │ [数据流]  │  │ [微型化] │  │ [节能]   │  │ [盾牌]   │  |  |
|  |  └──────────┘  └──────────┘  └──────────┘  └──────────┘  |  |
|  +--------------------------------------------------------+  |
|                                                              |
|  +--------------------------------------------------------+  |
|  |  产品中心                                                |  |
|  |  ══════════════════════════════════════════════════════ |  |
|  |  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐        |  |
|  |  │ [产品图]    │ │ [产品图]    │ │ [产品图]    │        |  |
|  |  │ IMU系列     │ │ AHRS系列    │ │ VG系列      │        |  |
|  |  │ ──────────  │ │ ──────────  │ │ ──────────  │        |  |
|  |  │ 高精度MEMS  │ │ GPS集成    │ │ 三轴稳定   │        |  |
|  |  │ [查看详情→] │ │ [查看详情→] │ │ [查看详情→] │        |  |
|  |  └─────────────┘ └─────────────┘ └─────────────┘        |  |
|  +--------------------------------------------------------+  |
|                                                              |
+----------------------------------------------------------+
```

### 3.4 动画效果设计

| 动效名称 | 实现方式 | 触发时机 |
|----------|----------|----------|
| 星空背景 | Canvas 粒子系统，缓慢漂移 | 页面加载时 |
| 网格流动 | SVG path 动画 + CSS | 滚动时 |
| 卡片入场 | 渐入 + 向上位移 40px，stagger 100ms | 滚动到视口 |
| 悬停光效 | 边框渐变发光 + 阴影扩散 | 鼠标悬停 |
| 数字跳动 | 数字递增动画，模拟数据加载 | 视口进入 |
| 扫描线 | 伪元素水平扫描动画 | 悬停时 |

**关键技术实现：**
```css
/* 星空粒子效果 */
@keyframes starfield {
  from { transform: translateY(0); }
  to { transform: translateY(-100px); }
}

/* 卡片悬停发光边框 */
.card:hover {
  box-shadow: 
    0 0 30px var(--accent-glow),
    inset 0 0 30px var(--accent-subtle);
  border-color: var(--accent-primary);
}

/* 扫描线效果 */
.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--accent-primary), transparent);
  transition: left 0.5s ease;
}
.card:hover::before {
  left: 100%;
}

/* 滚动触发动画 */
.scroll-reveal {
  opacity: 0;
  transform: translateY(40px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}
.scroll-reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
```

### 3.5 产品卡片设计

```css
/* 深空科技风产品卡片 */
.product-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.product-card::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(0, 229, 255, 0.1) 0%,
    transparent 50%,
    rgba(124, 58, 237, 0.05) 100%
  );
  opacity: 0;
  transition: opacity 0.4s ease;
}

.product-card:hover {
  transform: translateY(-8px);
  border-color: var(--accent-primary);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.4),
    0 0 40px var(--accent-glow);
}

.product-card:hover::after {
  opacity: 1;
}

/* 产品图片区域 */
.product-card-image {
  aspect-ratio: 4/3;
  background: linear-gradient(135deg, var(--bg-tertiary), var(--bg-secondary));
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

/* 科技网格背景 */
.product-card-image::before {
  content: '';
  position: absolute;
  inset: 0;
  background: 
    linear-gradient(90deg, var(--border-color) 1px, transparent 1px),
    linear-gradient(var(--border-color) 1px, transparent 1px);
  background-size: 20px 20px;
  opacity: 0.5;
}

.product-card-content {
  padding: 20px;
  position: relative;
  z-index: 1;
}

.product-card-category {
  font-size: 12px;
  color: var(--accent-primary);
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 8px;
}

.product-card-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.product-card-desc {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.6;
}

.product-card-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--accent-primary);
  font-size: 14px;
  margin-top: 12px;
  transition: gap 0.3s ease;
}

.product-card:hover .product-card-link {
  gap: 12px;
}
```

### 3.6 产品详情页布局

```css
/* 紧凑型详情页布局 */
.product-detail {
  padding: 40px 0 80px;
}

.product-detail-grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 40px;
}

/* 左侧图片画廊 */
.product-gallery {
  position: relative;
}

.product-main-image {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  background: var(--bg-tertiary);
}

.product-thumbnails {
  display: flex;
  gap: 12px;
  margin-top: 16px;
}

.product-thumbnail {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.3s ease;
}

.product-thumbnail:hover,
.product-thumbnail.active {
  border-color: var(--accent-primary);
  box-shadow: 0 0 15px var(--accent-glow);
}

/* 右侧产品信息 */
.product-info {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.product-category {
  font-size: 12px;
  color: var(--accent-primary);
  text-transform: uppercase;
  letter-spacing: 2px;
}

.product-name {
  font-size: 32px;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.2;
}

.product-name-en {
  font-size: 16px;
  color: var(--text-muted);
  font-style: italic;
}

.product-description {
  font-size: 15px;
  color: var(--text-secondary);
  line-height: 1.8;
  padding: 20px;
  background: var(--bg-card);
  border-left: 3px solid var(--accent-primary);
  border-radius: 0 8px 8px 0;
}

/* 特性列表 */
.product-features {
  background: var(--bg-card);
  border-radius: 12px;
  padding: 24px;
  border: 1px solid var(--border-color);
}

.product-features h4 {
  font-size: 14px;
  color: var(--accent-primary);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 16px;
}

.product-features ul {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.product-features li {
  position: relative;
  padding-left: 20px;
  font-size: 14px;
  color: var(--text-secondary);
}

.product-features li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 6px;
  width: 8px;
  height: 8px;
  background: var(--accent-primary);
  border-radius: 50%;
  box-shadow: 0 0 8px var(--accent-glow);
}

/* 技术参数表格 */
.specs-table {
  width: 100%;
  border-collapse: collapse;
}

.specs-table tr {
  border-bottom: 1px solid var(--border-color);
}

.specs-table tr:last-child {
  border-bottom: none;
}

.specs-table th {
  padding: 12px 0;
  font-size: 13px;
  color: var(--text-muted);
  text-align: left;
  font-weight: 400;
}

.specs-table td {
  padding: 12px 0;
  font-size: 14px;
  color: var(--text-primary);
  text-align: right;
  font-weight: 500;
}

/* 操作按钮 */
.product-actions {
  display: flex;
  gap: 16px;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid var(--border-color);
}

.btn-primary {
  padding: 14px 32px;
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
  color: var(--bg-primary);
  border-radius: 8px;
  font-weight: 600;
  font-size: 15px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px var(--accent-glow);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px var(--accent-glow);
}
```

---

## 四、方案 B：工业精密风 (Industrial Precision) 【推荐方案】

### 4.1 概念描述
灵感来源于精密仪器制造、航空航天控制舱和工业检测设备。将"精密"这一产品核心价值通过视觉语言发挥到极致：精密的网格系统、机械感的边框线条、能量感十足的橙色强调色，整体如同置身于高端精密仪器控制中心。

### 4.2 色彩系统

```css
:root {
  /* 主背景色 - 工业深灰黑 */
  --bg-primary: #0C0C0E;
  --bg-secondary: #141418;
  --bg-tertiary: #1A1A1F;
  --bg-card: #1E1E24;
  --bg-elevated: #252529;

  /* 能量强调色 - 工业橙 */
  --accent-primary: #FF6B00;
  --accent-secondary: #FF8534;
  --accent-glow: rgba(255, 107, 0, 0.4);
  --accent-subtle: rgba(255, 107, 0, 0.08);

  /* 精密辅助色 - 金属银 */
  --metal-light: #C0C0C8;
  --metal-medium: #808088;
  --metal-dark: #505058;

  /* 状态指示色 */
  --status-online: #00FF88;
  --status-warning: #FFB800;
  --status-error: #FF3344;

  /* 文字色 */
  --text-primary: #F0F0F4;
  --text-secondary: #A0A0A8;
  --text-muted: #606068;

  /* 边框/分隔线 - 精密线条 */
  --border-color: rgba(255, 107, 0, 0.2);
  --border-strong: rgba(255, 107, 0, 0.5);
  --grid-line: rgba(255, 107, 0, 0.08);
}
```

### 4.3 排版布局

**页面结构示意：**
```
+=============================================================================+
||  [Logo]        产品中心  |  关于我们  |  联系我们         [语言] [询价]  ||
+=============================================================================+
||                                                                          ||
||  +----------------------------------------------------------------------+ |
||  ||                                                                     || |
||  ||    工业金属纹理背景 + 精密网格 + 橙色能量光效                        || |
||  ||                                                                     || |
||  ||              精密测控与导航                                         || |
||  ||         ═══════════════════════════════                            || |
||  ||     高精度惯性导航系统  |  工业级可靠性  |  广泛应用领域            || |
||  ||                                                                     || |
||  ||              [探索产品]    [技术参数]    [在线咨询]                  || |
||  +----------------------------------------------------------------------+ |
||                                                                          ||
||  +----------------------------------------------------------------------+ |
||  ||  技术优势                                                          || |
||  ||  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐  || |
||  ||  │ ◆ 高精度   │  │ ◇ 小体积   │  │ ◇ 低功耗   │  │ ◆ 高可靠   │  || |
||  ||  │ <0.5°/h    │  │ <50g       │  │ <5W        │  │ IP67       │  || |
||  ||  └────────────┘  └────────────┘  └────────────┘  └────────────┘  || |
||  +----------------------------------------------------------------------+ |
||                                                                          ||
||  +----------------------------------------------------------------------+ |
||  ||  产品分类                                                           || |
||  ||  ─────────────────────────────────────────────────────────────────  || |
||  ||  [IMU] [AHRS] [VG] [LAS/LAM] [ARG] [GS] [C3000]                      || |
||  +----------------------------------------------------------------------+ |
||                                                                          ||
||  +----------------------------------------------------------------------+ |
||  ||  产品展示                                                           || |
||  ||  ┌────────────────┐ ┌────────────────┐ ┌────────────────┐          || |
||  ||  │ ╔════════════╗ │ ╔════════════╗ │ ╔════════════╗ │          || |
||  ||  │ ║  [产品图]   ║ │ ║  [产品图]   ║ │ ║  [产品图]   ║ │          || |
||  ||  │ ╚════════════╝ │ ╚════════════╝ │ ╚════════════╝ │          || |
||  ||  │ ────────────── │ ────────────── │ ────────────── │          || |
||  ||  │ PA-IMU-01D     │ PA-AHRS01      │ PA-VG11        │          || |
||  ||  │ 惯性测量单元   │ 姿态航向参考   │ 垂直陀螺仪     │          || |
||  ||  │ ────────────── │ ────────────── │ ────────────── │          || |
||  ||  │ • MEMS陀螺    │ • GPS集成     │ • 三轴稳定    │          || |
||  ||  │ • ±300°/s     │ • 100Hz       │ • 自动找北    │          || |
||  ||  │ [查看详情 →]   │ [查看详情 →]   │ [查看详情 →]   │          || |
||  ||  └────────────────┘ └────────────────┘ └────────────────┘          || |
||  +----------------------------------------------------------------------+ |
||                                                                          ||
+=============================================================================+
```

### 4.4 动画效果设计

| 动效名称 | 实现方式 | 触发时机 |
|----------|----------|----------|
| 精密网格背景 | CSS repeating-linear-gradient | 页面加载 |
| 能量脉冲 | CSS animation + box-shadow | 循环播放 |
| 设备启动序列 | Staggered opacity + transform | 页面加载 |
| 边框扫描 | 伪元素 + transform | 悬停时 |
| 数据流动画 | 渐变色位移 | 滚动时 |
| 悬停展开 | max-height transition | 悬停时 |

**关键技术实现：**
```css
/* 精密网格背景 */
.tech-grid-bg {
  background-image: 
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 49px,
      var(--grid-line) 49px,
      var(--grid-line) 50px
    ),
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent 49px,
      var(--grid-line) 49px,
      var(--grid-line) 50px
    );
}

/* 橙色能量脉冲 */
@keyframes energy-pulse {
  0%, 100% {
    box-shadow: 
      0 0 5px var(--accent-glow),
      0 0 10px var(--accent-subtle);
  }
  50% {
    box-shadow: 
      0 0 20px var(--accent-glow),
      0 0 40px var(--accent-subtle);
  }
}

/* 边框扫描动画 */
.border-scan::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--accent-primary), transparent);
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.border-scan:hover::before {
  transform: translateX(100%);
}

/* 设备启动序列 */
.startup-sequence {
  animation: startup 0.8s ease forwards;
}

@keyframes startup {
  0% {
    opacity: 0;
    transform: scaleY(0);
    transform-origin: top;
  }
  50% {
    opacity: 1;
    transform: scaleY(1.1);
  }
  100% {
    transform: scaleY(1);
  }
}

/* 悬停金属光泽 */
.metal-hover {
  position: relative;
  overflow: hidden;
}

.metal-hover::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg,
    transparent 40%,
    rgba(255, 107, 0, 0.1) 45%,
    rgba(255, 107, 0, 0.2) 50%,
    rgba(255, 107, 0, 0.1) 55%,
    transparent 60%
  );
  transform: translateX(-100%);
  transition: transform 0.8s ease;
}

.metal-hover:hover::after {
  transform: translateX(100%);
}
```

### 4.5 产品卡片设计

```css
/* 工业精密风产品卡片 */
.product-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 4px;  /* 尖角设计 */
  overflow: hidden;
  position: relative;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 顶部装饰线条 */
.product-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary), var(--accent-primary));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.product-card:hover {
  border-color: var(--border-strong);
  transform: translateY(-6px);
  box-shadow: 
    0 15px 30px rgba(0, 0, 0, 0.4),
    0 0 30px var(--accent-subtle);
}

.product-card:hover::before {
  opacity: 1;
}

/* 产品图片区域 - 带精密边框 */
.product-card-image {
  aspect-ratio: 4/3;
  background: var(--bg-tertiary);
  position: relative;
  border-bottom: 1px solid var(--border-color);
}

/* 精密角标 */
.product-card-image::before,
.product-card-image::after {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  border: 2px solid var(--accent-primary);
  opacity: 0.5;
  transition: opacity 0.3s ease;
}

.product-card-image::before {
  top: 8px;
  left: 8px;
  border-right: none;
  border-bottom: none;
}

.product-card-image::after {
  bottom: 8px;
  right: 8px;
  border-left: none;
  border-top: none;
}

.product-card:hover .product-card-image::before,
.product-card:hover .product-card-image::after {
  opacity: 1;
}

.product-card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.product-card:hover .product-card-image img {
  transform: scale(1.05);
}

/* 产品内容区域 */
.product-card-content {
  padding: 20px;
}

.product-card-category {
  font-size: 11px;
  color: var(--accent-primary);
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 600;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.product-card-category::before {
  content: '◆';
  font-size: 8px;
}

.product-card-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 4px;
  font-family: var(--font-en);
}

.product-card-subtitle {
  font-size: 13px;
  color: var(--metal-medium);
  margin-bottom: 12px;
  font-style: italic;
}

/* 规格简表 */
.product-card-specs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}

.spec-tag {
  padding: 4px 10px;
  background: var(--bg-elevated);
  border-radius: 2px;
  font-size: 11px;
  color: var(--metal-light);
  border-left: 2px solid var(--accent-primary);
}

.product-card-desc {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 16px;
}

/* 底部操作栏 */
.product-card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid var(--border-color);
}

.product-card-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--accent-primary);
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
}

.product-card-link:hover {
  gap: 10px;
  color: var(--accent-secondary);
}

.product-card-link::after {
  content: '→';
  transition: transform 0.3s ease;
}

.product-card:hover .product-card-link::after {
  transform: translateX(4px);
}
```

### 4.6 产品详情页布局

```css
/* 工业精密风详情页 */
.product-detail {
  padding: 40px 0 80px;
  background: var(--bg-primary);
}

.product-detail-grid {
  display: grid;
  grid-template-columns: 1fr 1.3fr;
  gap: 40px;
  align-items: start;
}

/* 左侧固定画廊 */
.product-gallery {
  position: sticky;
  top: 100px;
}

.product-main-image {
  width: 100%;
  aspect-ratio: 1;
  border-radius: 4px;
  border: 1px solid var(--border-color);
  background: var(--bg-tertiary);
  position: relative;
}

/* 主图精密边框 */
.product-main-image::before {
  content: '';
  position: absolute;
  inset: -1px;
  border: 1px solid var(--accent-primary);
  border-radius: 4px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.product-main-image:hover::before {
  opacity: 0.5;
}

.product-thumbnails {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-top: 16px;
}

.product-thumbnail {
  aspect-ratio: 1;
  border-radius: 2px;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  background: var(--bg-tertiary);
}

.product-thumbnail:hover,
.product-thumbnail.active {
  border-color: var(--accent-primary);
}

/* 右侧信息面板 */
.product-info {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.product-header {
  padding-bottom: 24px;
  border-bottom: 1px solid var(--border-color);
}

.product-category {
  font-size: 12px;
  color: var(--accent-primary);
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.product-category::before {
  content: '■';
  font-size: 8px;
}

.product-name {
  font-size: 36px;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.1;
  margin-bottom: 8px;
}

.product-name-en {
  font-size: 16px;
  color: var(--metal-medium);
  font-style: italic;
}

/* 描述块 - 工业风格 */
.product-description {
  font-size: 15px;
  color: var(--text-secondary);
  line-height: 1.8;
  padding: 20px;
  background: var(--bg-card);
  border-left: 3px solid var(--accent-primary);
  border-radius: 0;
  position: relative;
}

.product-description::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, var(--accent-primary), transparent);
}

/* 特性块 */
.product-features {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  overflow: hidden;
}

.product-features-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background: var(--bg-elevated);
  border-bottom: 1px solid var(--border-color);
}

.product-features-header h4 {
  font-size: 13px;
  color: var(--accent-primary);
  text-transform: uppercase;
  letter-spacing: 2px;
  margin: 0;
}

.product-features-content {
  padding: 20px;
}

.product-features ul {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.product-features li {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  font-size: 14px;
  color: var(--text-secondary);
}

.product-features li::before {
  content: '▪';
  color: var(--accent-primary);
  font-size: 10px;
  margin-top: 4px;
}

/* 规格表 - 精密表格 */
.specs-section {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  overflow: hidden;
}

.specs-header {
  padding: 16px 20px;
  background: var(--bg-elevated);
  border-bottom: 1px solid var(--border-color);
}

.specs-header h4 {
  font-size: 13px;
  color: var(--accent-primary);
  text-transform: uppercase;
  letter-spacing: 2px;
  margin: 0;
}

.specs-table {
  width: 100%;
}

.specs-table tr {
  border-bottom: 1px solid var(--border-color);
  transition: background 0.2s ease;
}

.specs-table tr:hover {
  background: var(--bg-elevated);
}

.specs-table tr:last-child {
  border-bottom: none;
}

.specs-table th {
  padding: 14px 16px;
  font-size: 13px;
  color: var(--metal-medium);
  text-align: left;
  font-weight: 400;
  width: 50%;
}

.specs-table td {
  padding: 14px 16px;
  font-size: 14px;
  color: var(--text-primary);
  text-align: right;
  font-weight: 500;
  font-family: var(--font-en);
}

/* 操作区 */
.product-actions {
  display: flex;
  gap: 16px;
  padding: 24px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 4px;
}

.btn-primary {
  flex: 1;
  padding: 16px 32px;
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
  color: var(--bg-primary);
  border: none;
  border-radius: 2px;
  font-weight: 700;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.btn-primary::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, var(--accent-secondary), var(--accent-primary));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.btn-primary:hover::before {
  opacity: 1;
}

.btn-primary span {
  position: relative;
  z-index: 1;
}

.btn-secondary {
  padding: 16px 24px;
  background: transparent;
  color: var(--text-primary);
  border: 1px solid var(--border-strong);
  border-radius: 2px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: var(--bg-elevated);
  border-color: var(--accent-primary);
  color: var(--accent-primary);
}

/* 询价表单 */
.inquiry-form {
  margin-top: 60px;
  padding: 40px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  position: relative;
}

.inquiry-form::before {
  content: 'INQUIRY';
  position: absolute;
  top: -12px;
  left: 24px;
  padding: 4px 16px;
  background: var(--accent-primary);
  color: var(--bg-primary);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 2px;
}

.inquiry-form h3 {
  font-size: 20px;
  color: var(--text-primary);
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border-color);
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group.full-width {
  grid-column: span 2;
}

.form-label {
  font-size: 12px;
  color: var(--metal-light);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.form-input,
.form-select,
.form-textarea {
  padding: 14px 16px;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  border-radius: 2px;
  color: var(--text-primary);
  font-size: 14px;
  transition: all 0.3s ease;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 3px var(--accent-subtle);
}

.form-select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23FF6B00' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 16px center;
  cursor: pointer;
}

.form-textarea {
  min-height: 120px;
  resize: vertical;
}

.form-submit {
  margin-top: 8px;
}
```

---

## 五、方案 C：赛博极客风 (Cyber Minimal)

### 5.1 概念描述
极简主义与赛博朋克的融合。纯黑背景配合霓虹紫/青色渐变，动态粒子背景， glitches 故障效果，传达出"未来科技极客"的气质。适合吸引年轻工程师群体和科技爱好者。

### 5.2 色彩系统

```css
:root {
  /* 纯黑背景 */
  --bg-primary: #000000;
  --bg-secondary: #0A0A0F;
  --bg-tertiary: #121218;
  --bg-card: #1A1A22;

  /* 霓虹渐变 - 紫到青 */
  --neon-purple: #8B5CF6;
  --neon-cyan: #06B6D4;
  --neon-pink: #EC4899;
  --neon-gradient: linear-gradient(135deg, var(--neon-purple), var(--neon-cyan));
  --neon-glow: rgba(139, 92, 246, 0.4);

  /* 文字色 */
  --text-primary: #FFFFFF;
  --text-secondary: #A1A1AA;
  --text-muted: #52525B;

  /* 状态色 */
  --success: #10B981;
  --warning: #F59E0B;
  --error: #EF4444;
}
```

### 5.3 排版布局与动效

```css
/* 动态粒子背景 */
.cyber-particles {
  position: fixed;
  inset: 0;
  z-index: -1;
  background: var(--bg-primary);
}

.cyber-particles::before {
  content: '';
  position: absolute;
  inset: 0;
  background: 
    radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(6, 182, 212, 0.1) 0%, transparent 50%);
}

/* Glitch 效果 */
@keyframes glitch {
  0%, 100% {
    transform: translate(0);
    filter: none;
  }
  20% {
    transform: translate(-2px, 2px);
    filter: hue-rotate(90deg);
  }
  40% {
    transform: translate(2px, -2px);
    filter: hue-rotate(-90deg);
  }
  60% {
    transform: translate(-1px, -1px);
  }
  80% {
    transform: translate(1px, 1px);
  }
}

/* 霓虹发光文字 */
.neon-text {
  color: var(--text-primary);
  text-shadow: 
    0 0 10px var(--neon-glow),
    0 0 20px var(--neon-glow),
    0 0 40px var(--neon-glow);
}

/* 渐变边框 */
.gradient-border {
  position: relative;
}

.gradient-border::before {
  content: '';
  position: absolute;
  inset: 0;
  padding: 1px;
  background: var(--neon-gradient);
  border-radius: inherit;
  mask: 
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  mask-composite: exclude;
  -webkit-mask: 
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
}
```

### 5.4 产品卡片设计

```css
/* 赛博极客风产品卡片 */
.product-card {
  background: var(--bg-card);
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.product-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--neon-gradient);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.product-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.5),
    0 0 60px var(--neon-glow);
}

.product-card:hover::before {
  opacity: 0.1;
}

.product-card-image {
  aspect-ratio: 4/3;
  position: relative;
  overflow: hidden;
}

.product-card-image::after {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--neon-gradient);
  opacity: 0;
  mix-blend-mode: overlay;
  transition: opacity 0.4s ease;
}

.product-card:hover .product-card-image::after {
  opacity: 0.3;
}
```

### 5.5 产品详情页布局

```css
/* 赛博极客风详情页 */
.product-detail-grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 60px;
}

.product-gallery {
  position: relative;
}

.product-main-image {
  width: 100%;
  aspect-ratio: 1;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
}

.product-main-image::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--neon-gradient);
  opacity: 0.05;
}

.product-info {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.product-name {
  font-size: 48px;
  font-weight: 700;
  background: var(--neon-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.btn-primary {
  padding: 18px 40px;
  background: var(--neon-gradient);
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px var(--neon-glow);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px var(--neon-glow);
}
```

---

## 六、询价表单与联系我们表单设计

### 6.1 询价表单设计要点

所有风格方案的表单设计均遵循以下原则：

| 方案 | 表单风格 | 边框效果 | 按钮风格 |
|------|----------|----------|----------|
| 方案 A | 玻璃态背景 | 霓虹青发光边框 | 渐变发光按钮 |
| 方案 B | 工业深色卡片 | 橙色强调线条 | 能量渐变按钮 |
| 方案 C | 纯黑背景 | 霓虹紫/青渐变边框 | 霓虹渐变按钮 |

**表单通用布局：**
```css
/* 表单布局 - 网格系统 */
.inquiry-form {
  max-width: 900px;
  margin: 0 auto;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group.full-width {
  grid-column: span 2;
}

/* 表单元素通用样式 */
.form-label {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  font-weight: 500;
}

.form-input,
.form-select,
.form-textarea {
  padding: 16px;
  border-radius: 4px;
  font-size: 15px;
  transition: all 0.3s ease;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  outline: none;
  transform: translateY(-2px);
}

/* 提交按钮 */
.form-submit {
  display: flex;
  justify-content: center;
  margin-top: 24px;
}
```

### 6.2 联系我们表单设计要点

```css
/* 联系我们独立区块 */
.contact-section {
  padding: 80px 0;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
}

/* 联系信息 */
.contact-info {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 16px;
}

.contact-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
}

/* 表单区域 */
.contact-form {
  padding: 40px;
  border-radius: 8px;
}
```

---

## 七、关键技术实现建议

### 7.1 性能优化

| 技术 | 应用场景 | 实现方式 |
|------|----------|----------|
| CSS 变量 | 主题切换 | `:root { --accent: #xxx; }` |
| will-change | 动画元素 | `will-change: transform, opacity;` |
| requestAnimationFrame | 滚动动画 | JS 动画库或原生 |
| Intersection Observer | 滚动触发 | `threshold: 0.1` |
| CSS containment | 大型列表 | `contain: layout style` |

### 7.2 动画性能建议

```css
/* 优先使用 transform 和 opacity */
.performance-anim {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

/* 避免动画属性 */
.performance-avoid {
  /* 不要使用 */
  /* width, height, margin, padding, top, left */
}

/* GPU 加速 */
.gpu-accelerate {
  transform: translateZ(0);
  backface-visibility: hidden;
}
```

### 7.3 响应式断点

| 断点 | 设备 | 布局调整 |
|------|------|----------|
| < 576px | 手机 | 单列布局，卡片全宽 |
| 576-991px | 平板 | 双列网格，表单单列 |
| 992-1199px | 桌面 | 三列网格，侧边栏 |
| >= 1200px | 大桌面 | 四列网格，最大宽度 1400px |

---

## 八、推荐方案

### 8.1 综合推荐：方案 B - 工业精密风

**推荐理由：**

| 维度 | 得分 | 说明 |
|------|------|------|
| 科技感 | ★★★★★ | 精密网格、能量橙强调色、机械感边框 |
| 内容密度 | ★★★★★ | 紧凑布局，适合产品展示，减少留白 |
| 品牌形象匹配 | ★★★★★ | 工业精密风格与惯性导航产品高度契合 |
| 用户体验 | ★★★★☆ | 信息层次清晰，导航直观 |
| 开发成本 | ★★★★☆ | 纯 CSS 实现，无需额外依赖 |
| 多语言支持 | ★★★★★ | LTR/RTL 布局兼容性好 |

### 8.2 备选方案

- **方案 A（深空科技风）**：适合竞争对手较少、追求差异化视觉的场景
- **方案 C（赛博极客风）**：适合面向年轻工程师、科技爱好者群体的推广

### 8.3 实施方案建议

建议采用 **渐进式改造** 策略：

1. **第一阶段**：应用方案 B 的色彩系统和基础布局
2. **第二阶段**：添加滚动动效和交互反馈
3. **第三阶段**：优化产品详情页，加入更多技术参数展示
4. **第四阶段**：细节打磨，添加粒子/网格背景等增强效果

---

## 九、附录

### 9.1 文件结构

```
/shared/artifacts/design/
├── UI_DESIGN_PLAN.md          # 本文档
├── scheme-a-deep-space.md     # 方案 A 详细规范
├── scheme-b-industrial.md      # 方案 B 详细规范
└── scheme-c-cyber-minimal.md   # 方案 C 详细规范
```

### 9.2 设计资源清单

| 资源类型 | 来源 | 说明 |
|----------|------|------|
| 字体 | Google Fonts | Inter, JetBrains Mono |
| 图标 | Font Awesome 6 | 科技感图标 |
| 动效库 | 原生 CSS/JS | 无依赖 |
| 背景素材 | CSS 生成 | 网格、渐变、粒子 |

### 9.3 验收清单

- [ ] 主页 Hero 区域科技感达标
- [ ] 产品卡片布局紧凑无过多留白
- [ ] 产品详情页信息密度适中
- [ ] 滚动动画流畅无卡顿
- [ ] 8 种语言切换正常
- [ ] RTL 布局（阿拉伯语、波斯语）正确
- [ ] 表单提交功能正常
- [ ] 响应式布局覆盖所有断点

---

*文档版本: 1.0*
*创建日期: 2026-04-08*
*适用范围: MEMS-MCTI 网站 UI 风格设计*

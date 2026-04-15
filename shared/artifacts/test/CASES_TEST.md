# 测试用例 - MEMS-MCTI Phase 2+3 SEO 更改

## 测试环境
- **浏览器**: Chrome/Edge (最新版本)
- **分辨率**: 1920x1080 (桌面)
- **操作系统**: Windows 11
- **Node.js**: v24.14.0
- **测试类型**: 自动化脚本验证

---

## Phase 2+3 SEO 测试用例

### T1: FAQ 可见部分添加到产品页

| 用例ID | 描述 | 验证方法 | 预期结果 | 实际结果 | 状态 |
|--------|------|----------|----------|----------|------|
| T1-1 | imu.html 有 FAQ accordion | grep class="faq-accordion" | 找到 | 找到 | PASS |
| T1-2 | ahrs.html 有 FAQ accordion | grep class="faq-accordion" | 找到 | 找到 | PASS |
| T1-3 | vg.html 有 FAQ accordion | grep class="faq-accordion" | 找到 | 找到 | PASS |
| T1-4 | las-lam.html 有 FAQ accordion | grep class="faq-accordion" | 找到 | 找到 | PASS |
| T1-5 | arg.html 有 FAQ accordion | grep class="faq-accordion" | 找到 | 找到 | PASS |
| T1-6 | gs.html 有 FAQ accordion | grep class="faq-accordion" | 找到 | 找到 | PASS |
| T1-7 | c3000.html 有 FAQ accordion | grep class="faq-accordion" | 找到 | 找到 | PASS |

---

### T2: FAQ Accordion JS 功能

| 用例ID | 描述 | 验证方法 | 预期结果 | 实际结果 | 状态 |
|--------|------|----------|----------|----------|------|
| T2-1 | imu.html 有 FAQ JS | grep document.querySelectorAll('.faq-question') | 找到 | 未找到 | FAIL |
| T2-2 | ahrs.html 有 FAQ JS | grep document.querySelectorAll('.faq-question') | 找到 | 未找到 | FAIL |
| T2-3 | vg.html 有 FAQ JS | grep document.querySelectorAll('.faq-question') | 找到 | 未找到 | FAIL |
| T2-4 | las-lam.html 有 FAQ JS | grep document.querySelectorAll('.faq-question') | 找到 | 未找到 | FAIL |
| T2-5 | arg.html 有 FAQ JS | grep document.querySelectorAll('.faq-question') | 找到 | 未找到 | FAIL |
| T2-6 | gs.html 有 FAQ JS | grep document.querySelectorAll('.faq-question') | 找到 | 未找到 | FAIL |
| T2-7 | c3000.html 有 FAQ JS | grep document.querySelectorAll('.faq-question') | 找到 | 未找到 | FAIL |

---

### T3: FAQ CSS 添加

| 用例ID | 描述 | 验证方法 | 预期结果 | 实际结果 | 状态 |
|--------|------|----------|----------|----------|------|
| T3-1 | imu.html 有 FAQ CSS | grep .faq-accordion { | 找到 | 未找到 | FAIL |
| T3-2 | ahrs.html 有 FAQ CSS | grep .faq-accordion { | 找到 | 未找到 | FAIL |
| T3-3 | vg.html 有 FAQ CSS | grep .faq-accordion { | 找到 | 未找到 | FAIL |
| T3-4 | las-lam.html 有 FAQ CSS | grep .faq-accordion { | 找到 | 未找到 | FAIL |
| T3-5 | arg.html 有 FAQ CSS | grep .faq-accordion { | 找到 | 未找到 | FAIL |
| T3-6 | gs.html 有 FAQ CSS | grep .faq-accordion { | 找到 | 未找到 | FAIL |
| T3-7 | c3000.html 有 FAQ CSS | grep .faq-accordion { | 找到 | 未找到 | FAIL |

---

### T4: FAQPage Schema Questions 都有 acceptedAnswer

| 用例ID | 描述 | 验证方法 | 预期结果 | 实际结果 | 状态 |
|--------|------|----------|----------|----------|------|
| T4-1 | imu.html FAQPage | JSON-LD 解析 | 5 Questions, 5 Answers | 5, 5 | PASS |
| T4-2 | ahrs.html FAQPage | JSON-LD 解析 | 5 Questions, 5 Answers | 5, 5 | PASS |
| T4-3 | vg.html FAQPage | JSON-LD 解析 | 5 Questions, 5 Answers | 5, 5 | PASS |
| T4-4 | las-lam.html FAQPage | JSON-LD 解析 | 5 Questions, 5 Answers | 5, 5 | PASS |
| T4-5 | arg.html FAQPage | JSON-LD 解析 | 5 Questions, 5 Answers | 5, 5 | PASS |
| T4-6 | gs.html FAQPage | JSON-LD 解析 | 5 Questions, 5 Answers | 5, 5 | PASS |
| T4-7 | c3000.html FAQPage | JSON-LD 解析 | 5 Questions, 5 Answers | 5, 5 | PASS |

---

### T5: BlogListing Schema in blog/index.html

| 用例ID | 描述 | 验证方法 | 预期结果 | 实际结果 | 状态 |
|--------|------|----------|----------|----------|------|
| T5-1 | BlogListing schema | grep "@type": "Blog" | 找到 | 找到 | PASS |

---

### T6: SiteNavigationElement in index.html

| 用例ID | 描述 | 验证方法 | 预期结果 | 实际结果 | 状态 |
|--------|------|----------|----------|----------|------|
| T6-1 | SiteNavigationElement | grep SiteNavigationElement | 找到 | 找到 | PASS |

---

### T7: 所有 locale JSON 文件有效

| 用例ID | 文件 | 验证方法 | 预期结果 | 实际结果 | 状态 |
|--------|------|----------|----------|----------|------|
| T7-1 | locales/en/products.json | JSON.parse | Valid | Valid | PASS |
| T7-2 | locales/zh/products.json | JSON.parse | Valid | Valid | PASS |
| T7-3 | locales/ru/products.json | JSON.parse | Valid | Valid | PASS |
| T7-4 | locales/tr/products.json | JSON.parse | Valid | Valid | PASS |
| T7-5 | locales/fa/products.json | JSON.parse | Valid | Valid | PASS |
| T7-6 | locales/uz/products.json | JSON.parse | Valid | Valid | PASS |
| T7-7 | locales/la/products.json | JSON.parse | Valid | Valid | PASS |
| T7-8 | locales/ar/products.json | JSON.parse | Valid | Valid | PASS |
| T7-9 | locales/en/common.json | JSON.parse | Valid | Valid | PASS |
| T7-10 | locales/zh/common.json | JSON.parse | Valid | Valid | PASS |
| T7-11 | locales/ru/common.json | JSON.parse | Valid | Valid | PASS |
| T7-12 | locales/tr/common.json | JSON.parse | Valid | Valid | PASS |
| T7-13 | locales/fa/common.json | JSON.parse | Valid | Valid | PASS |
| T7-14 | locales/uz/common.json | JSON.parse | Valid | Valid | PASS |
| T7-15 | locales/la/common.json | JSON.parse | Valid | Valid | PASS |
| T7-16 | locales/ar/common.json | JSON.parse | Valid | Valid | PASS |

---

## 测试汇总

| 测试 | 通过 | 失败 |
|------|------|------|
| T1: FAQ 可见部分 | 7 | 0 |
| T2: FAQ Accordion JS | 0 | 7 |
| T3: FAQ CSS | 0 | 7 |
| T4: FAQPage Schema | 7 | 0 |
| T5: BlogListing | 1 | 0 |
| T6: SiteNavigationElement | 1 | 0 |
| T7: Locale JSON | 16 | 0 |
| **总计** | **32** | **14** |

---

## Bug 汇总

| Bug ID | 严重度 | 描述 | 位置 |
|--------|--------|------|------|
| BUG-T2-01 | Medium | FAQ Accordion JS 未插入 | phase2-3.js 第 206 行 |
| BUG-T3-01 | Medium | FAQ CSS 未插入 | phase2-3.js 第 202 行 |

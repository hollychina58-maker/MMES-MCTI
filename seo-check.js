const fs = require('fs');
const path = require('path');

const BASE = 'd:/projects/MEMS-MCTI';

// All 14 HTML files to check
const HTML_FILES = [
  'index.html',
  'products/index.html',
  'products/imu.html',
  'products/ahrs.html',
  'products/vg.html',
  'products/las-lam.html',
  'products/arg.html',
  'products/gs.html',
  'products/c3000.html',
  'blog/index.html',
  'blog/articles/imu-selection-guide.html',
  'blog/articles/imu-vs-ahrs-gps-ins.html',
  'blog/articles/rtk-gps-principles.html',
  '404.html'
];

const PRODUCT_FILES = [
  'products/index.html',
  'products/imu.html',
  'products/ahrs.html',
  'products/vg.html',
  'products/las-lam.html',
  'products/arg.html',
  'products/gs.html',
  'products/c3000.html'
];

const BLOG_FILES = [
  'blog/articles/imu-selection-guide.html',
  'blog/articles/imu-vs-ahrs-gps-ins.html',
  'blog/articles/rtk-gps-principles.html'
];

const LOCALE_FILES = [
  'locales/en/products.json',
  'locales/zh/products.json',
  'locales/fa/products.json',
  'locales/ru/products.json',
  'locales/tr/products.json',
  'locales/uz/products.json',
  'locales/ar/products.json',
  'locales/la/products.json',
  'locales/zh/common.json',
  'locales/en/common.json',
  'locales/uz/common.json',
  'locales/tr/common.json',
  'locales/fa/common.json',
  'locales/ru/common.json',
  'locales/la/common.json',
  'locales/ar/common.json'
];

const GA4_ID = 'G-YVBQSN4KSR';

// Helper: read file
function readFile(filepath) {
  try {
    return fs.readFileSync(path.join(BASE, filepath), 'utf8');
  } catch (e) {
    return null;
  }
}

// ========== R1: Image width/height ==========
function checkR1() {
  let totalImgs = 0;
  let missingDims = 0;
  let details = [];

  for (const file of HTML_FILES) {
    const content = readFile(file);
    if (!content) continue;

    // Count img tags
    const imgMatches = content.match(/<img[^>]*>/gi) || [];
    totalImgs += imgMatches.length;

    // Check each img for width/height
    for (const img of imgMatches) {
      const hasWidth = /width=["']?\d+/i.test(img);
      const hasHeight = /height=["']?\d+/i.test(img);
      if (!hasWidth || !hasHeight) {
        missingDims++;
        if (details.length < 10) {
          details.push(`${file}: ${img.substring(0, 80)}`);
        }
      }
    }
  }

  return {
    pass: missingDims === 0,
    total: totalImgs,
    missing: missingDims,
    details: details
  };
}

// ========== R2: 404.html quality ==========
function checkR2() {
  const content = readFile('404.html');
  if (!content) return { pass: false, reason: 'File not found' };

  const checks = {
    hasNav: /<nav/i.test(content),
    has404Display: /404/i.test(content),
    hasIndexLink: /href=["']index\.html["']/.test(content),
    hasProductsLink: /href=["']products[/"]/.test(content),
    hasBlogLink: /href=["']blog[/"]/.test(content),
    hasFooter: /<footer/i.test(content),
    hasGA4: content.includes('G-YVBQSN4KSR'),
    hasNoindex: /noindex/i.test(content)
  };

  const allPass = Object.values(checks).every(v => v);
  return { pass: allPass, checks };
}

// ========== R3: GA4 on all pages ==========
function checkR3() {
  const results = {};
  for (const file of HTML_FILES) {
    const content = readFile(file);
    results[file] = content ? content.includes(GA4_ID) : false;
  }
  const allPass = Object.values(results).every(v => v);
  return { pass: allPass, results };
}

// ========== R4: BreadcrumbList schema ==========
function checkR4() {
  const results = {};
  for (const file of HTML_FILES) {
    const content = readFile(file);
    results[file] = content ? /BreadcrumbList/i.test(content) : false;
  }
  const allPass = Object.values(results).every(v => v);
  return { pass: allPass, results };
}

// ========== R5: twitter:image on all pages ==========
function checkR5() {
  const results = {};
  for (const file of HTML_FILES) {
    const content = readFile(file);
    results[file] = content ? /<meta name=["']twitter:image["'][^>]*>/i.test(content) : false;
  }
  const allPass = Object.values(results).every(v => v);
  return { pass: allPass, results };
}

// ========== R6: hreflang tags ==========
function checkR6() {
  const results = {};
  for (const file of HTML_FILES) {
    const content = readFile(file);
    if (!content) { results[file] = false; continue; }
    const hasZh = /hreflang=["']zh["']/i.test(content);
    const hasEn = /hreflang=["']en["']/i.test(content);
    results[file] = hasZh && hasEn;
  }
  const allPass = Object.values(results).every(v => v);
  return { pass: allPass, results };
}

// ========== R7: Blog Article schema ==========
function checkR7() {
  const results = {};
  for (const file of BLOG_FILES) {
    const content = readFile(file);
    if (!content) { results[file] = false; continue; }
    // Check for "@type": "Article" (NOT TechArticle)
    const hasArticle = /"@type"\s*:\s*"Article"/i.test(content);
    const hasTechArticle = /"@type"\s*:\s*"TechArticle"/i.test(content);
    results[file] = hasArticle && !hasTechArticle;
  }
  const allPass = Object.values(results).every(v => v);
  return { pass: allPass, results };
}

// ========== R8: Product schema on product pages ==========
function checkR8() {
  const results = {};
  for (const file of PRODUCT_FILES) {
    const content = readFile(file);
    results[file] = content ? /"@type"\s*:\s*"Product"/i.test(content) : false;
  }
  const allPass = Object.values(results).every(v => v);
  return { pass: allPass, results };
}

// ========== R9: FAQPage schema ==========
function checkR9() {
  const contentIdx = readFile('index.html');
  const contentImu = readFile('products/imu.html');
  const hasIdx = contentIdx ? /"@type"\s*:\s*"FAQPage"/i.test(contentIdx) : false;
  const hasImu = contentImu ? /"@type"\s*:\s*"FAQPage"/i.test(contentImu) : false;
  return { pass: hasIdx && hasImu, hasIndex: hasIdx, hasImu: hasImu };
}

// ========== R10: Organization schema ==========
function checkR10() {
  const content = readFile('index.html');
  return { pass: content ? /"@type"\s*:\s*"Organization"/i.test(content) : false };
}

// ========== R11: sitemap.xml includes 404.html ==========
function checkR11() {
  const content = readFile('sitemap.xml');
  return { pass: content ? /404\.html/i.test(content) : false };
}

// ========== R12: robots.txt mentions 404 ==========
function checkR12() {
  const content = readFile('robots.txt');
  if (!content) return { pass: false };
  // Check for Allow: /404.html or similar
  const has404 = /Allow:\s*\/404\.html/i.test(content) || /Disallow:\s*\/404\.html/i.test(content);
  // Also accept if it's mentioned in sitemap
  const hasSitemapRef = /sitemap.*404/i.test(content);
  return { pass: has404 || hasSitemapRef, content: content ? content.substring(0, 500) : null };
}

// ========== R13: No broken internal links ==========
function checkR13() {
  // Check product pages link to all 7 products
  const productLinks = [
    'imu.html', 'ahrs.html', 'vg.html', 'las-lam.html', 'arg.html', 'gs.html', 'c3000.html'
  ];

  const productPageResults = {};
  for (const file of PRODUCT_FILES) {
    const content = readFile(file);
    if (!content) { productPageResults[file] = false; continue; }
    const missing = productLinks.filter(pl => !content.includes(pl));
    productPageResults[file] = missing.length === 0;
  }

  // Check blog articles link to related articles
  const blogResults = {};
  for (const file of BLOG_FILES) {
    const content = readFile(file);
    if (!content) { blogResults[file] = false; continue; }
    // Check for links to other blog articles
    const hasLinks = /href=["'][^"']*imu-selection-guide[^"']*["']/.test(content) ||
                     /href=["'][^"']*imu-vs-ahrs[^"']*["']/.test(content) ||
                     /href=["'][^"']*rtk-gps[^"']*["']/.test(content);
    blogResults[file] = hasLinks;
  }

  const allPass = Object.values(productPageResults).every(v => v) &&
                  Object.values(blogResults).every(v => v);
  return {
    pass: allPass,
    productPages: productPageResults,
    blogPages: blogResults
  };
}

// ========== R14: OG tags complete ==========
function checkR14() {
  const results = {};
  for (const file of HTML_FILES) {
    const content = readFile(file);
    if (!content) { results[file] = false; continue; }
    const hasOgTitle = /<meta property=["']og:title["'][^>]*>/i.test(content);
    const hasOgDesc = /<meta property=["']og:description["'][^>]*>/i.test(content);
    const hasOgImage = /<meta property=["']og:image["'][^>]*>/i.test(content);
    const hasOgUrl = /<meta property=["']og:url["'][^>]*>/i.test(content);
    results[file] = hasOgTitle && hasOgDesc && hasOgImage && hasOgUrl;
  }
  const allPass = Object.values(results).every(v => v);
  return { pass: allPass, results };
}

// ========== R15: Locale JSON still valid ==========
function checkR15() {
  const results = {};
  for (const file of LOCALE_FILES) {
    const content = readFile(file);
    if (!content) { results[file] = 'FILE_NOT_FOUND'; continue; }
    try {
      JSON.parse(content);
      results[file] = true;
    } catch (e) {
      results[file] = 'PARSE_ERROR: ' + e.message;
    }
  }
  const allPass = Object.values(results).every(v => v === true);
  return { pass: allPass, results };
}

// Run all checks
console.log('=== MEMS-MCTI SEO Review ===\n');

console.log('R1: Image width/height');
const r1 = checkR1();
console.log(`Result: ${r1.pass ? 'PASS' : 'FAIL'}`);
console.log(`Evidence: ${r1.total} total images, ${r1.missing} missing dimensions`);
if (r1.details.length) console.log(`Details: ${r1.details.join('; ')}`);

console.log('\nR2: 404.html quality');
const r2 = checkR2();
console.log(`Result: ${r2.pass ? 'PASS' : 'FAIL'}`);
console.log(`Evidence: ${JSON.stringify(r2.checks)}`);

console.log('\nR3: GA4 on all pages');
const r3 = checkR3();
console.log(`Result: ${r3.pass ? 'PASS' : 'FAIL'}`);
const failed3 = Object.entries(r3.results).filter(([k,v]) => !v).map(kv => kv[0]);
if (failed3.length) console.log(`Missing GA4: ${failed3.join(', ')}`);

console.log('\nR4: BreadcrumbList schema');
const r4 = checkR4();
console.log(`Result: ${r4.pass ? 'PASS' : 'FAIL'}`);
const failed4 = Object.entries(r4.results).filter(([k,v]) => !v).map(kv => kv[0]);
if (failed4.length) console.log(`Missing BreadcrumbList: ${failed4.join(', ')}`);

console.log('\nR5: twitter:image on all pages');
const r5 = checkR5();
console.log(`Result: ${r5.pass ? 'PASS' : 'FAIL'}`);
const failed5 = Object.entries(r5.results).filter(([k,v]) => !v).map(kv => kv[0]);
if (failed5.length) console.log(`Missing twitter:image: ${failed5.join(', ')}`);

console.log('\nR6: hreflang tags');
const r6 = checkR6();
console.log(`Result: ${r6.pass ? 'PASS' : 'FAIL'}`);
const failed6 = Object.entries(r6.results).filter(([k,v]) => !v).map(kv => kv[0]);
if (failed6.length) console.log(`Missing hreflang: ${failed6.join(', ')}`);

console.log('\nR7: Blog Article schema');
const r7 = checkR7();
console.log(`Result: ${r7.pass ? 'PASS' : 'FAIL'}`);
console.log(`Evidence: ${JSON.stringify(r7.results)}`);

console.log('\nR8: Product schema');
const r8 = checkR8();
console.log(`Result: ${r8.pass ? 'PASS' : 'FAIL'}`);
const failed8 = Object.entries(r8.results).filter(([k,v]) => !v).map(kv => kv[0]);
if (failed8.length) console.log(`Missing Product schema: ${failed8.join(', ')}`);

console.log('\nR9: FAQPage schema');
const r9 = checkR9();
console.log(`Result: ${r9.pass ? 'PASS' : 'FAIL'}`);
console.log(`Evidence: index.html=${r9.hasIndex}, imu.html=${r9.hasImu}`);

console.log('\nR10: Organization schema');
const r10 = checkR10();
console.log(`Result: ${r10.pass ? 'PASS' : 'FAIL'}`);

console.log('\nR11: sitemap.xml includes 404.html');
const r11 = checkR11();
console.log(`Result: ${r11.pass ? 'PASS' : 'FAIL'}`);

console.log('\nR12: robots.txt mentions 404');
const r12 = checkR12();
console.log(`Result: ${r12.pass ? 'PASS' : 'FAIL'}`);
if (r12.content) console.log(`Content preview: ${r12.content}`);

console.log('\nR13: No broken internal links');
const r13 = checkR13();
console.log(`Result: ${r13.pass ? 'PASS' : 'FAIL'}`);

console.log('\nR14: OG tags complete');
const r14 = checkR14();
console.log(`Result: ${r14.pass ? 'PASS' : 'FAIL'}`);
const failed14 = Object.entries(r14.results).filter(([k,v]) => !v).map(kv => kv[0]);
if (failed14.length) console.log(`Missing OG tags: ${failed14.join(', ')}`);

console.log('\nR15: Locale JSON still valid');
const r15 = checkR15();
console.log(`Result: ${r15.pass ? 'PASS' : 'FAIL'}`);
const failed15 = Object.entries(r15.results).filter(([k,v]) => v !== true).map(kv => `${kv[0]}: ${kv[1]}`);
if (failed15.length) console.log(`Issues: ${failed15.join('; ')}`);

console.log('\n=== FINAL: ' + (r1.pass && r2.pass && r3.pass && r4.pass && r5.pass && r6.pass && r7.pass && r8.pass && r9.pass && r10.pass && r11.pass && r12.pass && r13.pass && r14.pass && r15.pass ? 'PASS' : 'FAIL') + ' ===');
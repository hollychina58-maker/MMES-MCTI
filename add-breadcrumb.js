const fs = require('fs');

const breadcrumbTemplates = {
  'index.html': {
    items: [
      { name: 'nav.home', item: 'https://mmes-mcti.hollychina58.workers.dev' }
    ]
  },
  'products/index.html': {
    items: [
      { name: 'nav.home', item: 'https://mmes-mcti.hollychina58.workers.dev' },
      { name: 'products.title', item: 'https://mmes-mcti.hollychina58.workers.dev/products/index.html' }
    ]
  },
  'products/imu.html': {
    items: [
      { name: 'nav.home', item: 'https://mmes-mcti.hollychina58.workers.dev' },
      { name: 'products.title', item: 'https://mmes-mcti.hollychina58.workers.dev/products/index.html' },
      { name: 'productNames.imu', item: 'https://mmes-mcti.hollychina58.workers.dev/products/imu.html' }
    ]
  },
  'products/ahrs.html': {
    items: [
      { name: 'nav.home', item: 'https://mmes-mcti.hollychina58.workers.dev' },
      { name: 'products.title', item: 'https://mmes-mcti.hollychina58.workers.dev/products/index.html' },
      { name: 'productNames.ahrs', item: 'https://mmes-mcti.hollychina58.workers.dev/products/ahrs.html' }
    ]
  },
  'products/vg.html': {
    items: [
      { name: 'nav.home', item: 'https://mmes-mcti.hollychina58.workers.dev' },
      { name: 'products.title', item: 'https://mmes-mcti.hollychina58.workers.dev/products/index.html' },
      { name: 'productNames.vg', item: 'https://mmes-mcti.hollychina58.workers.dev/products/vg.html' }
    ]
  },
  'products/las-lam.html': {
    items: [
      { name: 'nav.home', item: 'https://mmes-mcti.hollychina58.workers.dev' },
      { name: 'products.title', item: 'https://mmes-mcti.hollychina58.workers.dev/products/index.html' },
      { name: 'productNames.las_lam', item: 'https://mmes-mcti.hollychina58.workers.dev/products/las-lam.html' }
    ]
  },
  'products/arg.html': {
    items: [
      { name: 'nav.home', item: 'https://mmes-mcti.hollychina58.workers.dev' },
      { name: 'products.title', item: 'https://mmes-mcti.hollychina58.workers.dev/products/index.html' },
      { name: 'productNames.arg', item: 'https://mmes-mcti.hollychina58.workers.dev/products/arg.html' }
    ]
  },
  'products/gs.html': {
    items: [
      { name: 'nav.home', item: 'https://mmes-mcti.hollychina58.workers.dev' },
      { name: 'products.title', item: 'https://mmes-mcti.hollychina58.workers.dev/products/index.html' },
      { name: 'productNames.gs', item: 'https://mmes-mcti.hollychina58.workers.dev/products/gs.html' }
    ]
  },
  'products/c3000.html': {
    items: [
      { name: 'nav.home', item: 'https://mmes-mcti.hollychina58.workers.dev' },
      { name: 'products.title', item: 'https://mmes-mcti.hollychina58.workers.dev/products/index.html' },
      { name: 'productNames.c3000', item: 'https://mmes-mcti.hollychina58.workers.dev/products/c3000.html' }
    ]
  },
  'blog/index.html': {
    items: [
      { name: 'nav.home', item: 'https://mmes-mcti.hollychina58.workers.dev' },
      { name: 'nav.blog', item: 'https://mmes-mcti.hollychina58.workers.dev/blog/index.html' }
    ]
  },
  'blog/articles/imu-selection-guide.html': {
    items: [
      { name: 'nav.home', item: 'https://mmes-mcti.hollychina58.workers.dev' },
      { name: 'nav.blog', item: 'https://mmes-mcti.hollychina58.workers.dev/blog/index.html' },
      { name: 'articles.imu-selection.breadcrumb', item: 'https://mmes-mcti.hollychina58.workers.dev/blog/articles/imu-selection-guide.html' }
    ]
  },
  'blog/articles/imu-vs-ahrs-gps-ins.html': {
    items: [
      { name: 'nav.home', item: 'https://mmes-mcti.hollychina58.workers.dev' },
      { name: 'nav.blog', item: 'https://mmes-mcti.hollychina58.workers.dev/blog/index.html' },
      { name: 'articles.imu-vs-ahrs.breadcrumb', item: 'https://mmes-mcti.hollychina58.workers.dev/blog/articles/imu-vs-ahrs-gps-ins.html' }
    ]
  },
  'blog/articles/rtk-gps-principles.html': {
    items: [
      { name: 'nav.home', item: 'https://mmes-mcti.hollychina58.workers.dev' },
      { name: 'nav.blog', item: 'https://mmes-mcti.hollychina58.workers.dev/blog/index.html' },
      { name: 'articles.rtk-gps.breadcrumb', item: 'https://mmes-mcti.hollychina58.workers.dev/blog/articles/rtk-gps-principles.html' }
    ]
  }
};

function buildBreadcrumbSchema(items) {
  const itemListElement = items.map((item, i) => ({
    "@type": "ListItem",
    "position": i + 1,
    "name": item.name,
    "item": item.item
  }));

  return `<!-- BreadcrumbList Structured Data -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": ${JSON.stringify(itemListElement, null, 2)}
}
</script>`;
}

Object.entries(breadcrumbTemplates).forEach(([file, tmpl]) => {
  let html = fs.readFileSync(file, 'utf8');

  // Remove existing BreadcrumbList schema if present
  html = html.replace(/<!-- BreadcrumbList Structured Data -->[\s\S]*?<\/script>\s*<\/script>\s*/g, '');

  // Insert before </head>
  const schema = buildBreadcrumbSchema(tmpl.items);
  html = html.replace('</head>', schema + '\n</head>');

  fs.writeFileSync(file, html);
  console.log('BreadcrumbList added to: ' + file);
});

const fs = require('fs');

// Add missing product links to footer of each product page
const productFiles = [
  'products/imu.html',
  'products/ahrs.html',
  'products/vg.html',
  'products/las-lam.html',
  'products/arg.html',
  'products/gs.html',
  'products/c3000.html'
];

productFiles.forEach(f => {
  let html = fs.readFileSync(f, 'utf8');

  // Find each missing product link and insert it
  const missingLinks = [
    { href: 'vg.html', key: 'productNames.vg', text: '垂直陀螺仪' },
    { href: 'las-lam.html', key: 'productNames.las_lam', text: '激光捷联惯性导航' },
    { href: 'arg.html', key: 'productNames.arg', text: '加速度计' },
    { href: 'c3000.html', key: 'productNames.c3000', text: '电源模块' }
  ];

  missingLinks.forEach(link => {
    // Only add if not already linked
    if (!html.includes('href="' + link.href + '" class="footer-link"')) {
      // Find the last footer-link (c3000 or gs) and add after
      const pattern = new RegExp('(href=\"' + link.href.replace('.', '\\.') + '\"[^>]*>[^<]*</a>)', 'g');
      if (!pattern.test(html)) {
        html = html.replace(
          '<a href="gs.html" class="footer-link" data-i18n="productNames.gs">定位测姿系统</a>',
          '<a href="gs.html" class="footer-link" data-i18n="productNames.gs">定位测姿系统</a>\n            <a href="' + link.href + '" class="footer-link" data-i18n="' + link.key + '">' + link.text + '</a>'
        );
      }
    }
  });

  fs.writeFileSync(f, html);
  console.log('Updated: ' + f);
});

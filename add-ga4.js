const fs = require('fs');

const ga4code = `<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-YVBQSN4KSR"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag("js", new Date());
  gtag("config", "G-YVBQSN4KSR");
</script>`;

const allFiles = [
  'index.html','products/index.html','products/imu.html','products/ahrs.html','products/vg.html',
  'products/las-lam.html','products/arg.html','products/gs.html','products/c3000.html',
  'blog/index.html','blog/articles/imu-selection-guide.html','blog/articles/imu-vs-ahrs-gps-ins.html','blog/articles/rtk-gps-principles.html'
];

allFiles.forEach(f => {
  let html = fs.readFileSync(f, 'utf8');
  if (html.includes('G-YVBQSN4KSR')) {
    console.log(f + ': already has GA4');
    return;
  }
  // Insert before </head>
  html = html.replace('</head>', ga4code + '\n</head>');
  fs.writeFileSync(f, html);
  console.log(f + ': GA4 added');
});

const http = require('http');

const TARGET_DOMAIN = 'https://mmes-mcti.com';

const server = http.createServer((req, res) => {
  const targetUrl = TARGET_DOMAIN + req.url;
  res.writeHead(301, {
    Location: targetUrl,
    'Cache-Control': 'max-age=86400',
  });
  res.end(`Redirecting to ${targetUrl}\n`);
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Redirect server listening on port ${port}`);
});

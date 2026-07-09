const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 3000;
const page = fs.readFileSync(path.join(__dirname, 'index.html'));

http.createServer((req, res) => {
  if (req.url === '/healthz') { res.writeHead(200); res.end('ok'); return; }
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(page);
}).listen(port, () => console.log(`MOO Build Form running on port ${port}`));

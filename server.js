const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 3000;
const page = fs.readFileSync(path.join(__dirname, 'index.html'));

const assets = { '/handheld.jpg': 'image/jpeg' };

http.createServer((req, res) => {
  if (req.url === '/healthz') { res.writeHead(200); res.end('ok'); return; }
  const clean = req.url.split('?')[0];
  const file = path.join(__dirname, clean);
  if (assets[clean] && fs.existsSync(file)) {
    res.writeHead(200, { 'Content-Type': assets[clean], 'Cache-Control': 'public, max-age=86400' });
    res.end(fs.readFileSync(file));
    return;
  }
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(page);
}).listen(port, () => console.log(`MOO Build Form running on port ${port}`));

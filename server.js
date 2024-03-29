const express = require('express');
const path = require('path');
const port = process.env.PORT || 3000;
const app = express();

// serve static assets normally
app.use(express.static(path.join(__dirname, 'dist')));

// send all requests to index.html
app.get('*', function(req, res) {
  res.header(
    'Cache-Control',
    'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0'
  );
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.get(/\/(quiz|results).*$/, function(req, res) {
  return res.redirect(301, `http://${req.headers.host}/`);
});

app.listen(port);
console.log('server started on port ' + port);

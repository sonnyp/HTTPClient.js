'use strict';

var http = require('http');

var server = http.createServer();

server.on('request', function(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') {
    res.writeHead(200, {
      'Access-Control-Allow-Headers': 'x-powered-by'
    });
    return res.end();
  }

  var body = {
    headers: req.headers,
    method: req.method,
    path: req.url
  };
  body = new Buffer(JSON.stringify(body));
  res.writeHead(200, {
    'content-type': 'application/json',
    'content-length': body.length
  });
  res.end(body);
});

server.listen(8080, function() {
  console.log('Listening on 8080');
});

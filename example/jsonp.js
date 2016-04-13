;(function(global) {
  'use strict'

  var httpclient

  // Node.js, browserify, ...
  if (typeof module !== 'undefined' && module.exports) {
    httpclient = require('..')
  // browsers
  } else {
    httpclient = global.HTTPClient
  }

  var options = {
    hostname: 'localhost',
    path: '/jsonrpc',
    port: 6800,
    secure: false,
    jsonp: 'jsoncallback',
    query: {
      id: 'foo',
      method: 'aria2.getVersion'
    }
  }

  httpclient(options, function(err, res, body) {
    console.log(err || body)
  })
})(this)

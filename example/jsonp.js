(function(global) {

  'use strict';

  var httpclient;

  //node.js
  if (typeof module !== 'undefined' && module.exports)
    httpclient = require('../index');
  //browsers
  else
    httpclient = global.HTTPClient;

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
  };

  httpclient(options, function(err, res) {
    console.log(res.body);
  });

})(this);
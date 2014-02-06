(function(global) {

  'use strict';

  var HTTPClient;

  //node.js
  if (typeof module !== 'undefined' && module.exports)
    HTTPClient = require('..');
  //browsers
  else
    HTTPClient = global.HTTPClient;

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

  HTTPClient(options, function(err, res) {
    console.log(res.body);
  });

})(this);
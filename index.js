(function(global) {

  'use strict';

  var HTTPRequest;

  if (typeof module !== 'undefined' && module.exports)
    HTTPRequest = require('./lib/node');
  else
    HTTPRequest = global.HTTPRequest;

  var test = function(options, callback) {
    if (!callback)
      return new HTTPRequest(options);

    var req = new HTTPRequest(options);
    req.onerror = function(err) {
      callback(err);
    };
    var res;
    req.onresponse = function(response) {
      res = response;
    };
    req.onend = function(body) {
      res = res || {};
      res.body = body;
      callback(null, res);
    };

    return req;
  };

  if (typeof module !== 'undefined' && module.exports)
    module.exports = test;
  else
    global.HTTPClient = test;

})(this);
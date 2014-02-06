(function(global) {

  'use strict';

  var HTTPClient;

  //node.js
  if (typeof module !== 'undefined' && module.exports)
    HTTPClient = require('..');
  //browsers
  else
    HTTPClient = global.HTTPClient;

  var httpclient = HTTPClient;

  var options = {
    hostname: 'localhost',
    method: 'post',
    path: '/echo',
    port: 9696,
    secure: false,
    headers: {
      'x-powered-by': 'HTTPClient.js'
    },
    body: 'hello'
  };

  /*
   * Example 1
   */
  var req = new HTTPClient(options);
  req.onerror = function(err) {
    console.log('Example 1');
    console.log(err);
  };
  req.onresponse = function(res) {
    console.log('Example 1');
    console.log('type: ' + res.type);
    console.log('status: ' + res.status);
    console.log('headers: ', res.headers);
  };
  req.onend = function(body) {
    console.log('Example 1');
    console.log('body: ');
    console.log(body.toString());
  };

  /*
   * Example 2
   */
  options.body = {
    greetings: 'hello'
  };
  options.query = {
    foo: 'bar'
  };
  httpclient(options, function(err, res) {
    if (err)
      return console.log(err);

    console.log('Example 2');
    console.log('type: ', res.type);
    console.log('status: ', res.status);
    console.log('headers: ', res.headers);
    console.log('body: ', res.body.toString());
  });

})(this);
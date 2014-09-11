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
    path: '/',
    port: 8080,
    secure: false,
    method: 'GET',
    headers: {
      'x-powered-by': 'HTTPClient.js'
    },
    body: 'hello'
  };

  console.log('options', options);

  /*
   * Example 1 - node style
   */
  var example1 = new HTTPClient(options);
  example1.request('/echo', function(err, res, body) {
    console.log('Example 1');
    console.log('error', err);
    console.log('response', res);
    console.log('body', body);
  });

  /*
   * Example 2 - old school
   */
  var example2 = new HTTPClient(options);
  var req = example2.request('/echo');
  console.log('Example 2');
  req.onerror = function(err) {
    console.log('error', err);
  };
  req.onresponse = function(res) {
    console.log('response', res);
    res.onend = function(body) {
      console.log('body', body);
    };
  };

  /*
   * Example 3 - promise
   */
   // TODO

   /*
    * Example 4 - test
    */
  var http = HTTPClient;
  http(options, function(err, res, body) {
    console.log('Example 4');
    console.log('error', err);
    console.log('response', res);
    console.log('body', body);
  });

  // req.onerror = function(err) {
  //   console.log('Example 1');
  //   console.log(err);
  // };
  // req.onresponse = function(res) {
  //   console.log('Example 1');
  //   console.log('type: ' + res.type);
  //   console.log('status: ' + res.status);
  //   console.log('headers: ', res.headers);
  // };
  // req.onend = function(body) {
  //   console.log('Example 1');
  //   console.log('body: ');
  //   console.log(body.toString());
  // };

  /*
   * Example 2
   */
  var httpclient = HTTPClient;
  // httpClient.
  // options.body = {
  //   greetings: 'hello'
  // };
  // options.query = {
  //   foo: 'bar'
  // };
  // httpclient(options, function(err, res) {
  //   if (err)
  //     return console.log(err);

  //   console.log('Example 2');
  //   console.log('type: ', res.type);
  //   console.log('status: ', res.status);
  //   console.log('headers: ', res.headers);
  //   console.log('body: ', res.body.toString());
  // });

})(this);
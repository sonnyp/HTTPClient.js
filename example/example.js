(function (global) {
  'use strict'

  var HTTPClient

  // Node.js
  if (typeof module !== 'undefined' && module.exports) {
    HTTPClient = require('..')
  // browsers
  } else {
    HTTPClient = global.HTTPClient
  }

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
  }

  console.log('options', options)

  /*
   * Example 1 - node style
   */
  var example1 = new HTTPClient(options)
  example1.request('/echo', function (err, res, body) {
    console.log('Example 1')
    console.log('error', err)
    console.log('response', res)
    console.log('body', body)
  })

  /*
   * Example 2 - old school
   */
  var example2 = new HTTPClient(options)
  var req = example2.request('/echo')
  console.log('Example 2')
  req.onerror = function (err) {
    console.log('error', err)
  }
  req.onresponse = function (res) {
    console.log('response', res)
    res.onend = function (body) {
      console.log('body', body)
    }
  }

  /*
   * Example 3 - promise
   */
   // TODO

   /*
    * Example 4 - test
    */
  var http = HTTPClient
  http(options, function (err, res, body) {
    console.log('Example 4')
    console.log('error', err)
    console.log('response', res)
    console.log('body', body)
  })
}(this))

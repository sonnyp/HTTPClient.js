(function(global) {

  'use strict';

  /* global suite, test */

  var assert;
  var HTTPClient;
  var utils;

  if (typeof module !== 'undefined' && module.exports) {
    HTTPClient = require('..');
    assert = require('assert');
    utils = require('../lib/utils');
  }
  else {
    HTTPClient = global.HTTPClient;
    assert = function assert(expr, msg) {
      if (!expr) throw new Error(msg || 'failed');
    };
    utils = HTTPClient.utils;
  }

  var Plan = function(count, done) {
    this.done = done;
    this.count = count;
  };

  Plan.prototype.ok = function(expression) {
    assert(expression);

    if (this.count === 0) {
      assert(false, 'Too many assertions called');
    }
    else {
      this.count--;
    }

    if (this.count === 0) {
      this.done();
    }
  };

  suite('methods', function() {

    suite('static', function() {

      suite('request', function() {

        test('is defined', function() {
          var p = HTTPClient.request({});
          assert(typeof p === 'object');
        });

        test('default options', function() {
          var req = HTTPClient.request();
          assert(req.method === 'GET');
          assert(req.host === 'localhost');
          assert(req.port === 80);
          assert(req.secure === false);
          assert(req.path === '/');
        });

        test('option is a string', function() {
          var req = HTTPClient.request('/foo');
          assert(req.path === '/foo');
        });

      });
      suite('http utils.methods', function() {

        suite('upper case', function() {

          test('check presence', function() {
            utils.methods.forEach(function(method) {
              assert(typeof HTTPClient[method] === 'function');
            });
          });

          test('overrides method', function() {
            var req = HTTPClient.request;
            utils.methods.forEach(function(method) {
              HTTPClient.request = function(opts) {
                assert(opts.method === method);
              };
              HTTPClient[method]({});
            });
            HTTPClient.request = req;
          });

          test('option is a string', function() {
            var req = HTTPClient.request;
            utils.methods.forEach(function(method) {
              HTTPClient.request = function(opts) {
                assert(opts.path === '/foobar');
              };
              HTTPClient[method]('/foobar');
            });
            HTTPClient.request = req;
          });

        });

        suite('lower case', function() {

          test('check presence', function() {
            utils.methods.forEach(function(method) {
              assert(typeof HTTPClient[method.toLowerCase()] === 'function');
            });
          });

          test('overrides method', function() {
            var req = HTTPClient.request;
            utils.methods.forEach(function(method) {
              HTTPClient.request = function(opts) {
                assert(opts.method === method);
              };
              HTTPClient[method.toLowerCase()]({});
            });
            HTTPClient.request = req;
          });

          test('option is a string', function() {
            var req = HTTPClient.request;
            utils.methods.forEach(function(method) {
              HTTPClient.request = function(opts) {
                assert(opts.path === '/foobar');
              };
              HTTPClient[method.toLowerCase()]('/foobar');
            });
            HTTPClient.request = req;
          });

        });

      });

    });

    suite('instance', function() {

      suite('request', function() {

        test('is defined', function() {
          var client = new HTTPClient({});
          var p = client.request({});
          assert(typeof p === 'object');
        });

        test('default options', function() {
          var client = new HTTPClient({});
          assert(client.method === 'GET');
          assert(client.host === 'localhost');
          assert(client.port === 80);
          assert(client.secure === false);
          assert(client.path === '/');
        });

        test('overrides options', function() {
          var client = new HTTPClient.request({
            host: 'example.com',
            secure: true,
            port: 443,
            headers: {
              'foo': 'bar'
            },
            path: '/foo/bar',
            query: {'foo': 'bar'},
            method: 'POST',
            username: 'foo',
            password: 'bar',
          });
          assert(client.host === 'example.com');
          assert(client.secure === true);
          assert(client.port === 443);
          assert(client.headers);
          assert(client.headers.foo === 'bar');
          assert(client.path === '/foo/bar');
          assert(client.query.foo === 'bar');
          assert(client.method === 'POST');
          assert(client.username === 'foo');
          assert(client.password === 'bar');
        });

        test('option is a string', function() {
          var client = new HTTPClient({});
          var req = client.request('/foo');
          assert(req.path === '/foo');
        });

      });

      suite('http utils.methods', function() {

        suite('upper cased', function() {

          test('check presence', function() {
            var client = new HTTPClient({});
            utils.methods.forEach(function(method) {
              assert(typeof client[method] === 'function');
            });
          });

          test('overrides method', function() {
            var client = new HTTPClient({});
            utils.methods.forEach(function(method) {
              client.request = function(opts) {
                assert(opts.method === method);
              };
              client[method]({});
            });
          });

          test('option is a string', function() {
            var client = new HTTPClient({});
            utils.methods.forEach(function(method) {
              client.request = function(opts) {
                assert(opts.path === '/foobar');
              };
              client[method]('/foobar');
            });
          });

        });

        suite('lower case', function() {

          test('check presence', function() {
            var client = new HTTPClient({});
            utils.methods.forEach(function(method) {
              assert(typeof client[method.toLowerCase()] === 'function');
            });
          });

          test('overrides method', function() {
            var client = new HTTPClient({});
            var req = HTTPClient.request;
            utils.methods.forEach(function(method) {
              client.request = function(opts) {
                assert(opts.method === method);
              };
              client[method.toLowerCase()]({});
            });
          });

          test('option is a string', function() {
            var client = new HTTPClient({});
            utils.methods.forEach(function(method) {
              client.request = function(opts) {
                assert(opts.path === '/foobar');
              };
              client[method.toLowerCase()]('/foobar');
            });
          });

        });

      });

    });

  });

})(this);
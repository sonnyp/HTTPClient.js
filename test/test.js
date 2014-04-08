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

      test('request', function() {
        var p = HTTPClient.request();
        assert(typeof p === 'object');
      });

      suite('http utils.methods', function() {

        suite('upper case', function() {

          test('check presence', function() {
            utils.methods.forEach(function(method) {
              assert(typeof HTTPClient[method] === 'function');
            });
          });

          test('overrides method', function(done) {
            var plan = new Plan(utils.methods.length, done);
            var req = HTTPClient.request;
            utils.methods.forEach(function(method) {
              HTTPClient.request = function(opts) {
                plan.ok(opts.method === method);
              };
              HTTPClient[method]({});
            });
          });

          test('option is a string', function(done) {
            var plan = new Plan(utils.methods.length, done);
            var req = HTTPClient.request;
            utils.methods.forEach(function(method) {
              HTTPClient.request = function(opts) {
                plan.ok(opts.path === '/foobar');
              };
              HTTPClient[method]('/foobar');
            });
          });

        });

        suite('lower case', function() {

          test('check presence', function() {
            utils.methods.forEach(function(method) {
              assert(typeof HTTPClient[method.toLowerCase()] === 'function');
            });
          });

          test('overrides method', function(done) {
            var plan = new Plan(utils.methods.length, done);
            var req = HTTPClient.request;
            utils.methods.forEach(function(method) {
              HTTPClient.request = function(opts) {
                plan.ok(opts.method === method);
              };
              HTTPClient[method.toLowerCase()]({});
            });
          });

          test('option is a string', function(done) {
            var plan = new Plan(utils.methods.length, done);
            var req = HTTPClient.request;
            utils.methods.forEach(function(method) {
              HTTPClient.request = function(opts) {
                plan.ok(opts.path === '/foobar');
              };
              HTTPClient[method.toLowerCase()]('/foobar');
            });
          });

        });

      });

    });

    suite('instance', function() {

      test('request', function() {
        var client = new HTTPClient({});
        var p = client.request();
        assert(typeof p === 'object');
      });

      suite('http utils.methods', function() {

        suite('upper cased', function() {

          test('check presence', function() {
            var client = new HTTPClient({});
            utils.methods.forEach(function(method) {
              assert(typeof client[method] === 'function');
            });
          });

          test('overrides method', function(done) {
            var plan = new Plan(utils.methods.length, done);
            var client = new HTTPClient({});
            utils.methods.forEach(function(method) {
              client.request = function(opts) {
                plan.ok(opts.method === method);
              };
              client[method]({});
            });
          });

          test('option is a string', function(done) {
            var plan = new Plan(utils.methods.length, done);
            var client = new HTTPClient({});
            utils.methods.forEach(function(method) {
              client.request = function(opts) {
                plan.ok(opts.path === '/foobar');
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

          test('overrides method', function(done) {
            var plan = new Plan(utils.methods.length, done);
            var client = new HTTPClient({});
            var req = HTTPClient.request;
            utils.methods.forEach(function(method) {
              client.request = function(opts) {
                plan.ok(opts.method === method);
              };
              client[method.toLowerCase()]({});
            });
          });

          test('option is a string', function(done) {
            var plan = new Plan(utils.methods.length, done);
            var client = new HTTPClient({});
            utils.methods.forEach(function(method) {
              client.request = function(opts) {
                plan.ok(opts.path === '/foobar');
              };
              client[method.toLowerCase()]('/foobar');
            });
          });

        });

      });

    });


  });





  // suite('method request', function() {

  //   test('instance', function() {
  //     assert(typeof HTTPClient.request === 'function');
  //   });

  //   test('constructorz', function() {
  //     var client = new HTTPClient();
  //     assert(typeof client.request === 'function');
  //   });

  // });

})(this);
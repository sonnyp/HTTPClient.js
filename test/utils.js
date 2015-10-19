/* global suite, test */

(function (global) {
  'use strict'

  var assert
  var HTTPClient
  var utils

  if (typeof module !== 'undefined' && module.exports) {
    HTTPClient = require('..')
    assert = require('chai').assert
    utils = require('../lib/utils')
  } else {
    HTTPClient = global.HTTPClient
    assert = global.chai.assert
    utils = HTTPClient.utils
  }

  suite('utils.joinPath', function () {
    var join = utils.joinPaths
    test('test', function () {
      assert.equal(join(['/foo/', '/bar']), '/foo/bar')
      assert.equal(join(['/foo', '/bar']), '/foo/bar')
      assert.equal(join(['/foo/', 'bar']), '/foo/bar')
      assert.equal(join(['/foo', 'bar']), '/foo/bar')

      assert.equal(join(['foo/', '/bar']), 'foo/bar')
      assert.equal(join(['foo/', 'bar']), 'foo/bar')
      assert.equal(join(['foo', '/bar']), 'foo/bar')
      assert.equal(join(['foo', 'bar']), 'foo/bar')

      assert.equal(join(['foo/', '/bar/']), 'foo/bar/')
      assert.equal(join(['foo/', 'bar/']), 'foo/bar/')
      assert.equal(join(['foo', '/bar/']), 'foo/bar/')
      assert.equal(join(['foo/', 'bar/']), 'foo/bar/')

      assert.equal(join('foo/bar'), 'foo/bar')
    })
  })

  suite('utils.handleOptions', function () {
    var go = utils.handleOptions

    test('absolute path', function () {
      var opts = utils.handleOptions({path: '/foo'}, {path: '/bar'})
      assert.equal(opts.path, '/bar/foo')
    })

    test('merge path', function () {
      var n = {path: 'foo'}
      var o = {path: '/bar/'}
      assert.equal(go(n, o).path, '/bar/foo')

      n.path = 'foo/'
      assert.equal(go(n, o).path, '/bar/foo/')

      n.path = '/foo/'
      assert(go(n, o).path === '/bar/foo/')
    })
  })
}(this))

'use strict';

var http = require('http');
var https = require('https');
var utils = require('./utils');
var querystring = require('querystring');

var dummy = function() {};

var HTTPRequest = function(opts) {
  var events = ['response', 'error', 'end'];
  for (var i = 0; i < events.length; i++)
    this['on' + events[i]] =  dummy;

  opts = utils.handleOptions(opts);

  opts.hostname = opts.host;
  delete opts.host;

  var qs = querystring.stringify(opts.query);
  if (qs)
    opts.path += '?' + qs;

  for (var j in opts)
    this[j] = opts[j];

  var h = this.secure ? https : http;

  var req = h.request(opts);

  req.on('error', (function(err) {
    this.onerror(err);
  }).bind(this));

  req.on('response', (function(res) {
    this.res = res;
    this.onresponse({
      headers: res.headers,
      status: res.statusCode,
      type: utils.getTypeFromHeaders(res.headers)
    });

    var chunks = [];

    res.on('data', (function(chunk) {
      chunks.push(chunk);
    }).bind(this));

    res.on('end', (function() {
      var body = Buffer.concat(chunks);
      this.onend(body);

    }).bind(this));


  }).bind(this));

  if (typeof opts.body === 'string')
    req.end(opts.body, 'utf8');
  else
    req.end(opts.body);

  this.req = req;
};

HTTPRequest.prototype.abort = function() {
  this.req.abort();
};

module.exports = HTTPRequest;
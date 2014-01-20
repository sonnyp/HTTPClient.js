(function(global) {

  'use strict';

  var base64;
  if (typeof Buffer !== 'undefined') {
    base64 = function(str) {
      return (new Buffer(str)).toString('base64');
    };
  }
  else {
    base64 = global.btoa;
  }

  var getPrototypeOf = function(obj) {
    if (Object.getPrototypeOf)
      return Object.getPrototypeOf(obj);
    else
      return obj.__proto__;
  };

  var prototypeOfObject = getPrototypeOf({});

  var handleOptions = function(opts) {

    var options = {};

    options.query = typeof opts.query === 'object' ? opts.query : {};
    options.secure = !!opts.secure || false;
    options.port = opts.port || (options.secure ? 443 : 80);
    options.host = opts.host || 'localhost';
    options.path = opts.path || '/';
    options.headers = typeof opts.headers === 'object' ? opts.headers : {};
    options.method = typeof opts.method === 'string' ? opts.method.toUpperCase() : 'GET';

    //to lower cases headers
    for (var i in options.headers) {
      var v = options.headers[i];
      delete options.headers[i];
      options.headers[i.toLowerCase()] = v;
    }

    //basic auth
    if (typeof opts.username === 'string' && typeof opts.password === 'string') {
      var creds = opts.username + ':' + opts.password;
      options.headers.authorization = 'Basic ' + base64(creds);
    }

    //json
    if (Array.isArray(opts.body) || (typeof opts.body == 'object' && getPrototypeOf(opts.body) === prototypeOfObject)) {
      options.body = JSON.stringify(opts.body);
      if (!options.headers['tontent-type'])
        options.headers['content-type'] = 'application/json; charset=utf-8';
    }
    //string
    else if (typeof opts.body === 'string') {
      options.body = opts.body;
      if (!options.headers['content-type'])
        options.headers['content-type'] = 'text/plain; charset=utf-8';
    }
    else if (opts.body !== undefined || opts.body !== null) {
      options.body = opts.body;
    }

    return options;
  };

  var getTypeFromHeaders = function(headers) {
    var type = '';
    if (typeof headers === 'object') {
      var contentType = headers['content-type'];
      if (contentType)
        type = contentType.split(';')[0];
    }
    return type;
  };

  var utils = {
    handleOptions: handleOptions,
    getTypeFromHeaders: getTypeFromHeaders,
    getPrototypeOf: getPrototypeOf
  };

  if (typeof module !== 'undefined' && module.exports)
    module.exports = utils;
  else
    global.HTTPClient.utils = utils;

})(this);
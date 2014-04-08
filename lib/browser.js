(function(global) {

  'use strict';

  var formatQuery = function(query, sep, eq) {
    //separator character
    sep = sep || '&';
    //assignement character
    eq = eq || '=';

    var querystring = '';
    if (typeof query === 'object') {
      for (var i in query) {
        querystring += i + eq + query[i] + sep;
      }

      if (querystring.length > 0)
        querystring = '?' + querystring.slice(0, -1);
    }
    return querystring;
  };

  var formatURL = function(obj, sep, eq) {

    var querystring = formatQuery(obj.query);

    return [
      obj.secure ? 'https' : 'http',
      '://',
      obj.host,
      obj.port ? ':' + obj.port : '',
      obj.path || '/',
      querystring,
      obj.hash || ''
    ].join('');
  };

  var XMLHttpRequest = global.XMLHttpRequest;
  var dummy = function() {};

  var jsonp = function(opts, fn) {
    var cb = opts.query[opts.jsonp];
    var url = formatURL(opts);

    var el = document.createElement('script');
    el.src = url;
    el.async = true;

    global[cb] = function(b) {
      fn(null, b);
      delete global[cb];
      delete el.onerror;
      el.parentNode.remove(el);
    };

    el.onerror = function(e) {
      fn(e);
      delete el.onerror;
      delete global[cb];
      el.parentNode.remove(el);
    };

    var head = document.head || document.getElementsByTagName('head')[0];
    head.appendChild(el);
  };

  var HTTPRequest = function(options) {
    var events = ['response', 'error', 'end'];
    for (var i = 0; i < events.length; i++)
      this['on' + events[i]] = dummy;

    var opts = HTTPClient.utils.handleOptions(options);

    for (var j in opts)
      this[j] = opts[j];

    //jsonp
    if (typeof opts.jsonp === 'string') {
      jsonp(opts, (function(err, body) {
        if (err)
          this.onerror(err);
        else
          this.onend(body);
      }).bind(this));
      return;
    }

    var req = new XMLHttpRequest();

    req.addEventListener('error', (function(err) {
      this.onerror(err);
    }).bind(this));

    req.addEventListener('readystatechange', (function() {
      //0   UNSENT  open()has not been called yet.
      //1   OPENED  send()has not been called yet.
      //2   HEADERS_RECEIVED  send() has been called, and headers and status are available.
      //3   LOADING   Downloading; responseText holds partial data.
      //4   DONE  The operation is complete.
      // if (req.readyState === 1) {
      //   this.onopen();
      // }
      if (req.readyState === 2) {
        var headers = {};
        var str = req.getAllResponseHeaders();
        if (str) {
          var lines = str.split('\n');
          for (var i = 0; i < lines.length; i++) {
            if (!lines[i])
              continue;

            var keyvalue = lines[i].split(':');
            headers[keyvalue[0].toLowerCase()] = keyvalue.slice(1).join().trim();
          }
        }

        var status = req.status;
        this.onresponse({
          headers: headers,
          status: status,
          type: HTTPClient.utils.getTypeFromHeaders(headers)
        });
      }
      else if (req.readyState === 4) {
        this.onend(req.response);
      }
    }).bind(this));

    // req.addEventListener('progress', (function(e) {
    //   var complete = e.lengthComputable ? e.loaded / e.total : null;
    //   this.ondownloadprogress(complete);
    // }).bind(this));

    // req.upload.addEventListener('progress', (function(e) {
    //   var complete = e.lengthComputable ? e.loaded / e.total : null;
    //   this.onuploadprogress(complete);
    // }).bind(this));

    req.open(opts.method, formatURL(opts), true);

    // if (this.responseType)
    //   req.responseType = this.responseType;

    for (var k in opts.headers) {
      req.setRequestHeader(k, opts.headers[k]);
    }

    req.send(opts.body);

    this.req = req;
  };
  HTTPRequest.prototype.abort = function() {
    this.req.abort();
  };

  global.HTTPClient.Request = HTTPRequest;

})(this);
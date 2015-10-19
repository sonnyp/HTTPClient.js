HTTPClient.js
=============

JavaScript HTTP client library for browsers and Node.js

[![build status](https://img.shields.io/travis/sonnyp/HTTPClient.js/master.svg?style=flat-square)](https://travis-ci.org/sonnyp/HTTPClient.js/branches)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](http://standardjs.com/)

```
npm install httpclient
```

## Browser

```xml
<script src="node_modules/httpclient/HTTPClient.js"></script>
```
```javascript
var HTTPClient = window.HTTPClient;
```

## Node.js

```javascript
var HTTPClient = require('HTTPClient');
```

## API

Default options are
```javascript
{
    query: {}, //{color: 'red'} for '?color=red'
    secure: false, //true to use https
    host: 'localhost',
    path: '/', //string or array, ['foo', 'bar/'] == '/foo/bar/'
    headers: {},
    method: 'GET',
    port: 80,
    jsonp: false, //browser only
    //HTTP Basic Auth
    username: '',
    password: ''
}
```

If a string or an array is passed to HTTPClient then it is considered as being the path so you can do
```javascript
HTTPClient('/hello', ...);
HTTPClient(['api', 'v3'], ...);
```

### As a function
```javascript
HTTPClient(options, function(err, response, body) {
  ...
});
HTTPClient.request(options, function(err, response, body) {
  ...
});
```

### As an instance
```javascript
var client = new HTTPClient(options);

client.request(options, function(err, response, body) {
  ...
});

//the following methods are supported both lowercase and UPPERCASE
//options, get, head, post, put, delete, trace, connect, patch
client.get(options, function(err, response, body) {
  ...
})
```

## Example
See [example.js](https://github.com/sonnyp/HTTPClient.js/blob/master/example/example.js)

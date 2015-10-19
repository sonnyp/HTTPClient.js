HTTPClient.js
=============

JavaScript HTTP client library for browsers and Node.js

[![Build Status](https://img.shields.io/travis/sonnyp/HTTPClient.js.svg?style=flat-square)](https://travis-ci.org/sonnyp/HTTPClient.js)

[![Dependency Status](https://img.shields.io/david/sonnyp/HTTPClient.js.svg?style=flat-square)](https://david-dm.org/sonnyp/HTTPClient.js)
[![devDependency Status](https://img.shields.io/david/dev/sonnyp/HTTPClient.js.svg?style=flat-square)](https://david-dm.org/sonnyp/HTTPClient.js#info=devDependencies)

Install ```httpclient``` via [Bowser](https://www.npmjs.com/) or [npm](https://www.npmjs.com/).

## Browser

#### Bower
```bower install httpclient```
```xml
<script src="bower_components/httpclient/HTTPClient.js"></script>
```

#### npm
```npm install httpclient```
```xml
<script src="node_modules/httpclient/HTTPClient.js"></script>
```

*****

```javascript
var HTTPClient = window.HTTPClient;
```

## Node.js
```
npm install httpclient
```
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

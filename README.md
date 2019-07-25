# express-simple-logger

[![npm version](https://img.shields.io/npm/v/express-simple-logger.svg?style=flat)](https://www.npmjs.com/package/express-simple-logger)
[![build status](https://img.shields.io/travis/nicholascao/express-simple-logger.svg?style=flat)](https://travis-ci.org/NicholasCao/express-simple-logger)

 A logger middleware for [express](https://github.com/expressjs/express).Similar with [koa-logger](https://github.com/koajs/logger).

```
[2019-7-22 17:24:30] <-- GET /
[2019-7-22 17:24:31] --> GET / 200 835ms
[2019-7-22 17:24:48] <-- GET /
[2019-7-22 17:24:49] --> GET / 200 960ms
[2019-7-22 17:25:27] <-- GET /api
[2019-7-22 17:25:28] --> GET /api 200 357ms
[2019-7-22 17:25:53] <-- GET /users?page=2
[2019-7-22 17:25:54] --> GET /users?page=2 200 466ms
```

## Installation

Install via [npm](https://npmjs.com) or [yarn](https://yarnpkg.com)

```bash
# Use npm
$ npm i express-simple-logger

# Use yarn
$ yarn add express-simple-logger
```

## Example

```js
const express = require('express')
const logger = require('express-simple-logger')

const app = express()

app.use(logger())
```

## Notes

  Recommended that you `.use()` this middleware near the top
  to "wrap" all subsequent middleware.

## Option

|params|type|required|default|description|
|---|---|---|---|---|
|unless|Array|false|[]|ignore path list|
|logTime|Boolean|false|true|whether to log time|
|logger|Function|false|--|custom logger  (str:String, args:Array)|

  Param `str` is output string, args.join(' ')
  Param `args` is a array by `[logTime, format, method, url, status, time]`, when opt.logTime is false, logTime = ''

```js
const http = require('http')

...
app.use(logger({
  unless: ['/ignorepath'],
  logTime: false,
  // custom logger
  // add short description of status code
  logger (str, args) {
    if (args.length === 6) {
      // response logger
      args[4] = args[4] + ' ' + http.STATUS_CODES[args[4]]
      console.log(...args)
    }
  }
}))
```

## License

  MIT

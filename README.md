# express-simple-logger

 a logger middleware for [express](https://github.com/expressjs/express).Similar with [koa-logger](https://github.com/koajs/logger)


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

```js
$ npm i express-simple-logger
```
or use yarn

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

## Use Config

```js
app.use(logger({
    unless: ['/frequentReq']
  }
}))
```
  so that the logger won't log the 'unless' path

## License

  MIT

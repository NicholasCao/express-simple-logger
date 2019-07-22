'use strict'

const log = console.log

const dateFormat = function () {
  const padStart = function (num) {
    return String(num).padStart(2, '0')
  }

  let now = new Date()
  let year = now.getFullYear(),
    month = padStart(now.getMonth() + 1),
    day = padStart(now.getDay()),
    hour = padStart(now.getHours()),
    minute = padStart(now.getMinutes()),
    second = padStart(now.getSeconds())

  return `${year}-${month}-${day} ${hour}:${minute}:${second}`
}


module.exports = function (opt) {
  return async function (req, res, next) {
    if (opt && opt.unless && opt.unless.indexOf(req.path) > -1) {
      return next()
    }
    let start = Date.now()

    log(`[${dateFormat()}] <-- ${req.method} ${req.path}`)

    try {
      await next()
    } catch (err) {
      throw err
    }

    log(`[${dateFormat()}] --> ${req.method} ${req.originalUrl} ${res.statusCode || 404} ${Date.now() - start}ms`)
  }
}

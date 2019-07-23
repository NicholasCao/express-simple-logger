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

  return `[${year}-${month}-${day} ${hour}:${minute}:${second}] `
}

const defaultOption = {
  unless: [],
  logTime: true
}

module.exports = function (opt = {}) {
  return function (req, res, next) {
    opt = { ...defaultOption, ...opt}

    if (opt.unless.indexOf(req.path) > -1) {
      return next()
    }

    let start = Date.now()

    log(`${opt.logTime ? dateFormat() : ''}<-- ${req.method} ${req.path}`)

    next()

    const onfinish = done.bind(null, 'finish')
    const onclose = done.bind(null, 'close')

    res.once('finish', onfinish)
    res.once('close', onclose)

    function done (event) {
      res.removeListener('finish', onfinish)
      res.removeListener('close', onclose)
      let upstream = event === 'close' ? '-x-' : '-->',
        delta = Date.now() - start,
        time = delta > 1000 ? Math.round(delta / 1000) + 's' : delta + 'ms'
      log(`${opt.logTime ? dateFormat() : ''}${upstream} ${req.method} ${req.originalUrl} ${res.statusCode || 404} ${time}`)
    }

  }
}

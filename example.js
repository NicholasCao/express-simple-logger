const express = require('express')
const app = express()

const logger = require('./index')

app.use(logger({
  unless: ['/ignorepath']
}))

app.use(function (req, res, next) {
  if (req.path === '/') res.send('Hello World!')
  else return next()
})

app.use(function (req, res, next) {
  if (req.path === '/ignorepath') res.send('/api')
})

app.listen(3000, () => console.log('server listening on port 3000!'))

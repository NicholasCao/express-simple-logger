'use strict'

/**
 * test server
 */

const express = require('express')

const logger = require('./index')


module.exports = function (opt) {
  const app = express()
  app.use(logger(opt))
  
  app.use(function (req, res, next) {
    if (req.path === '/200') res.send('hello world')
    else return next()
  })
  
  app.use(function (req, res, next) {
    if (req.path === '/301') res.sendStatus(301)
    else return next()
  })
  
  app.use(function (req, res, next) {
    if (req.path === '/304') res.sendStatus(304)
    else return next()
  })
  
  app.use(function (req, res, next) {
    if (req.path === '/404') res.status(404).send('not found')
    else return next()
  })
  
  app.use(function (req, res, next) {
    if (req.path === '/500') res.status(500).send('server error')
    else return next()
  })
  
  app.use(function (req, res, next) {
    if (req.path === '/ignorepath') res.send('ignorepath')
    return next()
  })

  return app
}

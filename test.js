'use strict'

// test tool
const chai = require('chai')
const request = require('supertest')
const sinon = require('sinon')
const sc = require('sinon-chai')
chai.use(sc)

const expect = chai.expect

let log, sandbox, app

/**
 * test cases
 */
describe('express-simple-logger', function () {
  before(function () {
    app = require('./test-server')()
  })

  beforeEach(function () {
    sandbox = sinon.createSandbox()
    log = sandbox.spy(console, 'log')
  })

  afterEach(function () {
    sandbox.restore()
  })

  it('should log a request', function (done) {
    request(app.listen()).get('/200').expect(200, 'hello world', function () {
      expect(log).to.have.been.calledTwice
      done()
    })
  })

  it('should log a request with correct method and url', function (done) {
    request(app.listen()).head('/200?logger=express-simple-logger').expect(200, function () {
      expect(log).to.have.been.calledWith(sinon.match.string, '<--', 'HEAD', '/200?logger=express-simple-logger')
      done()
    })
  })

  it('should log a response', function (done) {
    request(app.listen()).get('/200').expect(200, function () {
      expect(log).to.have.been.calledWith(sinon.match.string, '<--', 'GET' ,'/200')
      done()
    })
  })

  it('should log a 200 response', function (done) {
    request(app.listen()).get('/200').expect(200, function () {
      expect(log).to.have.been.calledWith(sinon.match.string, '-->', 'GET', '/200', 200, sinon.match.string)
      done()
    })
  })

  it('should log a 301 response', function (done) {
    request(app.listen()).get('/301').expect(301, function () {
      expect(log).to.have.been.calledWith(sinon.match.string, '-->', 'GET', '/301', 301, sinon.match.string)
      done()
    })
  })

  it('should log a 304 response', function (done) {
    request(app.listen()).get('/304').expect(304, function () {
      expect(log).to.have.been.calledWith(sinon.match.string, '-->', 'GET', '/304', 304, sinon.match.string)
      done()
    })
  })

  it('should log a 404 response', function (done) {
    request(app.listen()).get('/404').expect(404, function () {
      expect(log).to.have.been.calledWith(sinon.match.string, '-->', 'GET', '/404', 404, sinon.match.string)
      done()
    })
  })

  it('should log a 500 response', function (done) {
    request(app.listen()).get('/500').expect(500, function () {
      expect(log).to.have.been.calledWith(sinon.match.string, '-->', 'GET', '/500', 500, sinon.match.string)
      done()
    })
  })
})

describe('express-simple-logger with option', function () {
  before(function () {
    app = require('./test-server')({
      unless: ['/ignorepath'],
      logTime: false
    })
  })

  beforeEach(function () {
    sandbox = sinon.createSandbox()
    log = sandbox.spy(console, 'log')
  })

  afterEach(function () {
    sandbox.restore()
  })

  it('should log a response', function (done) {
    request(app.listen()).get('/200').expect(200, function () {
      expect(log).to.have.been.calledWith('', '<--', 'GET' ,'/200')
      expect(log).to.have.been.calledWith('', '-->', 'GET', '/200', 200, sinon.match.string)
      done()
    })
  })

  it('should not log', function (done) {
    request(app.listen()).get('/ignorepath').expect(200, 'ignorepath', function () {
      expect(log).to.have.callCount(0)
      done()
    })
  })
})

describe('express-simple-logger with custom logger', function () {
  let opt = {
    logger (str, args) {
      // do sth
    }
  }

  before(function () {
    app = require('./test-server')(opt)
  })

  beforeEach(function () {
    sandbox = sinon.createSandbox()
    log = sandbox.spy(opt, 'logger')
  })

  afterEach(function () {
    sandbox.restore()
  })

  it('should log with custom logger', function (done) {
    request(app.listen()).get('/200').expect(200, function () {
      let args = [sinon.match.string, '<--', 'GET' ,'/200']
      expect(log).to.have.been.calledWith(sinon.match.string, args)
      args = [sinon.match.string, '-->', 'GET' ,'/200', 200, sinon.match.string]
      expect(log).to.have.been.calledWith(sinon.match.string, args)
      done()
    })
  })
})

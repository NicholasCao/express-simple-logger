'use strict'

const chai = require('chai')
const request = require('supertest')
const sinon = require('sinon')
const sc = require('sinon-chai')
chai.use(sc)

const expect = chai.expect

let log, sandbox, app
describe('koa-logger', function () {
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
    request(app.listen()).get('/200').expect(200, function () {
      expect(log).to.have.been.calledTwice
      done()
    })
  })

  it('should log a request with correct method and url', function (done) {
    request(app.listen()).head('/200').expect(200, function () {
      expect(log).to.have.been.calledWith(sinon.match.any, '<--', 'HEAD', '/200')
      done()
    })
  })

  it('should log a response', function (done) {
    request(app.listen()).get('/200').expect(200, function () {
      expect(log).to.have.been.calledWith(sinon.match.any, '<--', 'GET' ,'/200')
      done()
    })
  })

  it('should log a 200 response', function (done) {
    request(app.listen()).get('/200').expect(200, function () {
      expect(log).to.have.been.calledWith(sinon.match.any, '-->', 'GET', '/200', 200, sinon.match.any)
      done()
    })
  })

  it('should log a 301 response', function (done) {
    request(app.listen()).get('/301').expect(301, function () {
      expect(log).to.have.been.calledWith(sinon.match.any, '-->', 'GET', '/301', 301, sinon.match.any)
      done()
    })
  })

  it('should log a 304 response', function (done) {
    request(app.listen()).get('/304').expect(304, function () {
      expect(log).to.have.been.calledWith(sinon.match.any, '-->', 'GET', '/304', 304, sinon.match.any)
      done()
    })
  })

  it('should log a 404 response', function (done) {
    request(app.listen()).get('/404').expect(404, function () {
      expect(log).to.have.been.calledWith(sinon.match.any, '-->', 'GET', '/404', 404, sinon.match.any)
      done()
    })
  })

  it('should log a 500 response', function (done) {
    request(app.listen()).get('/500').expect(500, function () {
      expect(log).to.have.been.calledWith(sinon.match.any, '-->', 'GET', '/500', 500, sinon.match.any)
      done()
    })
  })
})

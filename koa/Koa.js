const http = require('http')

const request = require('./request')
const response = require('./response')
const context = require('./context')

class Koa {
  constructor () {
    this.middlewares = []
    this.routes = {}
  }

  listen (...args) {
    http.createServer(async (req, res) => {
      this.ctx = this.createContext(req, res)
      // this.callback(this.ctx)
      const fn = this.compose(this.middlewares)
      await fn(this.ctx)
      this.routes[req.url](this.ctx)
      res.end(this.ctx.body)
    }).listen(...args)
  }

  use (callback) {
    // this.callback = callback
    this.middlewares.push(callback)
  }

  get (url, handle) {
    this.routes[url] = (ctx) => handle(ctx)
  }

  createContext (req, res) {
    const ctx = Object.create(context)
    ctx.request = Object.create(request)
    ctx.response = Object.create(response)

    ctx.req = ctx.request.req = req
    ctx.res = ctx.response.res = res

    return ctx
  }

  compose (middlewares) {
    return function (ctx) {
      return dispatch(0)

      function dispatch (i) {
        const fn = middlewares[i]

        if (typeof fn !== 'function') return Promise.resolve()

        return Promise.resolve(
          fn(ctx, function next () {
            return dispatch(i + 1)
          })
        ) 
      }
    }
  }
}


module.exports = Koa
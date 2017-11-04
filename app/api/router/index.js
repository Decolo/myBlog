class Router {
  constructor() {
    this.mapTable = {
      get: {},
      post: {}
    }
  }
  get(pathname, handler) {
    this.mapTable.get[pathname] = handler
  }
  post(pathname, handler) {
    this.mapTable.post[pathname] = handler
  }
  routes(context) {
    let { reqContext } = context
    let { pathname, method } = reqContext
    if (method === 'GET' || method === 'POST') {
      let handler = this.mapTable[method.toLowerCase()][pathname]
      if (handler) {
        return Promise.resolve(handler(context))
      } else {
        return Promise.resolve()
      }
    } else {
      Promise.resolve()
    }
  }
}

module.exports = Router
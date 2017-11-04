const router = require('./api')

module.exports = context => {
  let { resContext, reqContext, res } = context
  let { pathname, method } = reqContext
  return new Promise(resolve => {
    if (pathname.match('/api') && !pathname.match(/\./)) {
      router.routes(context)
        .then(ret => {
          resContext.body = JSON.stringify(ret)
        })
      resContext.headers = { 
        'Content-type': 'application/json',
        ...resContext.headers,
      }
      resolve()
    }
    resolve()
  })
}
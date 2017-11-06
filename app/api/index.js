const router = require('./api')
console.log('api')
module.exports = context => {
  let { resContext, reqContext, res } = context
  let { pathname, method } = reqContext
  return new Promise(resolve => {
    if (pathname.match('/api') && !pathname.match(/\./)) {
      console.log('api')
      router.routes(context)
        .then(ret => {
          resContext.body = JSON.stringify(ret)
          resContext.headers = { 
            ...resContext.headers,
            'Content-type': 'application/json',
          }
          resolve()
        })
    } else {
      resolve()
    }
  })
}
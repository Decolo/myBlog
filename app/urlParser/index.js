const urlParser = require('url').parse
let hasBody = req => {
  return 'transfer-encoding' in req.headers || 'content-length' in req.headers
}

module.exports = context => {
  let { reqContext, req } = context
  let { url, method } = req
  method = method.toUpperCase()
  Object.assign(reqContext, urlParser(url, true), { method })
  return Promise.resolve({
    then: resolve => {
      // 请求体中有数据，挂在req上
      if (hasBody(req)) {
        let buffers = []
        req.on('data', chunk => {
          buffers.push(chunk)
        })
        req.on('end', () => {
          reqContext.body = JSON.parse(Buffer.concat(buffers).toString())
          resolve()
        })
      } else {
        resolve()
      }
    }
  })
}


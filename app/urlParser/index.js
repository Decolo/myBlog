const urlParser = require('url').parse
let hasBody = req => {
  return 'transfer-encoding' in req.headers || 'content-length' in req.headers
}

module.exports = context => {
  let { reqContext, req } = context
  
  let { url, method } = req
  if (url === '/') url = '/index.html'
  method = method.toUpperCase()
  Object.assign(reqContext, urlParser(url, true), { method })
  return Promise.resolve({
    then: resolve => {
      // 请求体中有数据，挂在req上
      if (hasBody(req)) {
        let contentType = req.headers['content-type']
        let buffers = []
        req.on('data', chunk => {
          buffers.push(chunk)
        })
        req.on('end', () => {
          reqContext.body = handlePostBody(Buffer.concat(buffers).toString(), contentType)
          resolve()
        })
      } else {
        resolve()
      }
    }
  })
}

function handlePostBody (str, type){
  if (type.match('application/x-www-form-urlencoded')) {
    let arr = str.split('&')
    let body = {}
    arr.forEach(item => {
      let items = item.split('=')
      body[items[0]] = decodeURIComponent(items[1])
    })
    return body
  } else if (type.match('application/json')) {
    return JSON.parse(str)
  }
}
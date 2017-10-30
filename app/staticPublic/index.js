const fs = require('fs')
const path = require('path')
const staticPath = path.resolve(process.cwd(), './dist')

module.exports = context  => {
  let { url } = context.req
  let { resContext } = context
  // readFile第一个参数路径相对于process.cwd,即node进程执行所在目录
  return new Promise(resolve => {
    if (!url.match('/api')) {
      if (url === '/') {
        url = '/index.html'
      }
      const _path = path.resolve(staticPath, `.${url}`)
      fs.readFile(_path, (error, content) => {
        if (error) {
          resContext.body = `NOT FOUND${error}`
        } else {
          resContext.body = content
        }
        resolve()
      })
    } else {
      resolve()
    }
  })
}
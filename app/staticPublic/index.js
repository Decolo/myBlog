const fs = require('fs')
const path = require('path')
const staticPath = path.resolve(process.cwd(), './dist')

function staticPublic(url) {
  if (url === '/') {
    url = '/index.html'
  }
  const _path = path.resolve(staticPath, `.${url}`)
  // readFile第一个参数路径相对于process.cwd,即node进程执行所在目录
  return new Promise((resolve, reject) => {
    fs.readFile(_path, 'utf8', (error, content) => {
      if (error) {
        resolve(`NOT FOUND${error}`)
      }
      resolve(content)
    })
  })
}

module.exports = staticPublic
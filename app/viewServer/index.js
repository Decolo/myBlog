
// 映射表
// ejs动态渲染
const ejs = require('ejs')
const fs = require('fs')
const path = require('path')
const urlMap = require('./urlrewrite')

module.exports = context => {
  let { req, resContext } = context
  let { url } = req
  if (url === '/') {
    url = '/index'
  }
  return Promise.resolve({
    then: resolve => {
      if (url.match('/api') || url.match(/\./)) {
        resolve()
      } else {
        const viewPath = path.resolve(__dirname, 'ejs')
        let ejsName = urlMap[url]
        // 是否能匹配上html文件名
        if (ejsName) {
          let ejsPath = path.resolve(viewPath, ejsName + '.ejs')
          fs.readFile(ejsPath, {
            encoding: 'utf8',
            flag: 'r'
          }, (error, ejsStr) => {
            if (error) resolve(`NOT Found ${error.stack}`)
            let render = ejs.compile(ejsStr, {
              compileDebug: true
            })
            // render是函数，通过它填装数据
            resContext.body = render()
            resContext.headers = {
              'Content-Type': 'text/html',
              ...resContext.headers
            }
            resolve()
          })
        } else {
          resContext.statusCode = 302,
          resContext.statusMessage = 'redirect'
          resContext.headers = {
            'Location': '/',
            ...resContext.headers
          }
          resolve()
        }
      }
    }
  })
}
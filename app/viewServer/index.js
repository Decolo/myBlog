
// 映射表
// ejs动态渲染
const ejs = require('ejs')
const fs = require('fs')
const path = require('path')

module.exports = context => {
  let { req, resContext } = context
  let { url } = req
  if (url === '/') {
    url = '/index.html'
  }
  return Promise.resolve({
    then: resolve => {
      let urlMap = {
        '/index.html': {
          viewName: 'index.html'
        },
        '/about.html': {
          viewName: 'about.html'
        }
      }
      let viewPath = path.resolve(process.cwd(), 'dist')
      // 是否能匹配上html文件名
      if (urlMap[url]) {
        let { viewName } = urlMap[url]
        let htmlPath = path.resolve(viewPath, viewName)
        fs.readFile(htmlPath, {
          encoding: 'utf8',
          flag: 'r'
        }, (error, htmlStr) => {
          if (error) resolve(`NOT Found ${error.stack}`)
          let render = ejs.compile(htmlStr, {
            compileDebug: true
          })
          resContext.body = render()
          resolve()
        })
      } else {
        resolve()
      }
    }
  })
}
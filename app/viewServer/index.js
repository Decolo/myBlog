
// 映射表
// ejs动态渲染
const ejs = require('ejs')
const fs = require('fs')
const path = require('path')
const urlMap = require('./urlrewrite')

module.exports = context => {
  let { req, resContext, reqContext } = context
  let { pathname } = reqContext
  if (pathname === '/') {
    pathname = '/index'
  }
  return Promise.resolve({
    then: resolve => {
      if (pathname.match('/api') || pathname.match(/\./)) {
        resolve()
      } else {
        const viewPath = path.resolve(__dirname, 'ejs')
        let ejsName = urlMap[pathname]
        // 是否能匹配上html文件名
        if (ejsName) {
          let layoutPath = path.resolve(viewPath, 'layout.ejs')
          fs.readFile(layoutPath, {
            encoding: 'utf8',
            flag: 'r'
          }, (error, ejsStr) => {
            if (error) resolve(`NOT Found ${error.stack}`)
            let render = ejs.compile(ejsStr, {
              compileDebug: true,
              filename: layoutPath
            })
            // render是函数，通过它填装数据
            console.log(ejsName)
            resContext.body = render({
              template: './' + ejsName + '.ejs'
            })
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
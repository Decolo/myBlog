const fs = require('fs')
const path = require('path')
const staticPublic = require('./staticPublic')
const apiServer = require('./api/index')

class App{
  initServer() {
    return (req, res) => {
      let { url } = req
      // url中有api，就用api处理，若不是，则视为是静态资源
      let body = ''
      let headers = {}
      apiServer(url)
        .then(ret => {
          if (!ret) {
            // return a promise
            return staticPublic(url)
          } else {
            // return an array
            return ret
          }
        })
        .then(ret => {
          if (typeof ret === 'object') {
            body = JSON.stringify(ret)
            headers = {
              'Content-Type': 'application/json'
            }
            res.writeHeader(200, 'ok', headers)
            res.end(body)
          } else {
            body = ret
          }
          debugger
          console.log(typeof body)
          res.end(body)
        })
      
    }
  }
}


module.exports = App
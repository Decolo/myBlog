
class App{
  constructor() {
    this.middleWares = []
    this.middleWareChain = Promise.resolve()
  }
  // 用来添加中间件
  use(middleWare) {
    this.middleWares.push(middleWare)
  }

  // 每一个中间件只需要关注修改context， 主要关注于middleWare中间件
  composeMiddlWares(context) {
    for (let middleWare of this.middleWares) {
      this.middleWareChain = this.middleWareChain.then(() => {
        return middleWare(context)
      })
    }
    return this.middleWareChain
  }
  
  // initServer逻辑不怎么变化
  initServer() {
    return (req, res) => {
      let context = {
        req,
        reqContext: {
          body: '',
          query: {}
        },
        res,
        resContext: {
          headers: {},
          body: ''
        }
      }
      this.composeMiddlWares(context).then(() => {
        let { body, headers } = context.resContext
        res.writeHeader(200, 'ok', headers)
        res.end(body)  
      })
      // url中有api，就用api处理，若不是，则视为是静态资源
      // urlParser(context).then(() => {
      //   // ajax
      //   return apiServer(context)
      // }).then(() => {
      //   // static sources
      //   return staticPublic(context)
      // }).then(() => {
      //   let { body, headers } = context.resContext
      //   res.writeHeader(200, 'ok', headers)
      //   res.end(body)
      // })
      
    }
  }
}


module.exports = App
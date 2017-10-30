let apiMap = {
  '/article': [{
    id: 1,
    content: 'content1'
  }, {
    id: 2,
    content: 'content2'
  }, {
    id: 3,
    content: 'content3'
  }],
  '/designs': [{
    id: 1,
    url: 'url1'
  }, {
    id: 2,
    url: 'url2'
  }, {
    id: 3,
    url: 'url3'
  }]
}




module.exports = context => {
  let { method, url } = context.req
  let { resContext, reqContext, res } = context
  return new Promise(resolve => {
    if (url.match('/api')) {
      if (method.toUpperCase() === 'GET') {
        if (url.match('/article')) {
          resContext.body = JSON.stringify(apiMap['/article'])
        } else if (url.match('/designs')) {
          resContext.body = JSON.stringify(apiMap['/designs'])
        }
      } else {
        let { body } = reqContext
        resContext.body = JSON.stringify(body)
      }
      resContext.headers = { 
        'Content-type': 'application/json',
        ...resContext.headers,
      }
    }
    resolve()
  })
}
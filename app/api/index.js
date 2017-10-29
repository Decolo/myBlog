function apiServer(url) {
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
  
  return new Promise((resolve, reject) => {
    if (url.match('/article')) {
      resolve(apiMap['/article'])
    } else if (url.match('/designs')) {
      resolve(apiMap['/designs'])
    } else {
      resolve(undefined)
    }
  })
}

module.exports = apiServer
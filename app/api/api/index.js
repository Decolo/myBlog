let Router = require('../router')
let router = new Router()
let mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/blogDB')
let db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log('connnect successful')
})

// 采用mongoose处理ajax
router.get('/api/bloglist', context => {
  return {
    status: 1,
    message: 'success',
    data: [
      {
        blogId: 1,
        title: '你不知道的JS',
        brief: '这里是两行简介, 这里是两行简介, 这里是两行简介, 这里是两行简介',
        comments: '999',
        likes: '999',
        createDate: new Date().toLocaleString()
      },
      {
        blogId: 1,
        title: '你不知道的JS',
        brief: '这里是两行简介, 这里是两行简介, 这里是两行简介, 这里是两行简介',
        comments: '999',
        likes: '999',
        createDate: new Date().toLocaleString()
      },
      {
        blogId: 1,
        title: '你不知道的JS',
        brief: '这里是两行简介, 这里是两行简介, 这里是两行简介, 这里是两行简介',
        comments: '999',
        likes: '999',
        createDate: new Date().toLocaleString()
      },
      {
        blogId: 1,
        title: '你不知道的JS',
        brief: '这里是两行简介, 这里是两行简介, 这里是两行简介, 这里是两行简介',
        comments: '999',
        likes: '999',
        createDate: new Date().toLocaleString()
      },
      {
        blogId: 1,
        title: '你不知道的JS',
        brief: '这里是两行简介, 这里是两行简介, 这里是两行简介, 这里是两行简介',
        comments: '999',
        likes: '999',
        createDate: new Date().toLocaleString()
      },
      {
        blogId: 1,
        title: '你不知道的JS',
        brief: '这里是两行简介, 这里是两行简介, 这里是两行简介, 这里是两行简介',
        comments: '999',
        likes: '999',
        createDate: new Date().toLocaleString()
      }
    ]
  }
})
router.get('/api/blog/comments', context => {
  return '456'
})

router.get('/api/design/designList', context => {  
})

router.post('/api/postComts', context => {

})

module.exports = router
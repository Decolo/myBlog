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
router.get('/api/about', context => {
  return '123'
})
router.get('/api/articles', context => {
  return '123'
})
router.post('/api/articles', context => {
  return '456'
})
router.get('/api/designs', context => {
  
})

router.post('/api/publish', context => {

})

module.exports = router
let mongoose = require('mongoose')
let Router = require('../router')
let { getBlog, saveBlog, deleteBlog, updateBlog,  getBlogList} = require('./mongo/blogModel.js')
let router = new Router()
mongoose.Promise = global.Promise
// connect collection
mongoose.connect('mongodb://localhost/blogDB')

let db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log('connnect successful')
})

// 采用mongoose处理ajax
// 获取具体博文  blog detail
router.get('/api/blog', context => {
  let { reqContext } = context
  let { query } = reqContext
  let id = Object.keys(query)[0]
  return getBlog(id, context)
})

// 创建博文  create blog
router.post('/api/saveBlog', context => {
  let { reqContext } = context
  let { body } = reqContext
  return saveBlog(body, context)
})

// 更新博文 update blog
router.post('/api/updateBlog', context => {
  let { reqContext } = context
  let { body } = reqContext
  return updateBlog(body, context)
})

// 删除博文 delete blog
router.post('/api/deleteBlog', context => {
  let { reqContext } = context
  let { body } = reqContext
  let { blogId } = body
  return deleteBlog(blogId, context)
})

// 获取博文列表
router.get('/api/blogList', context => {
  let { reqContext } = context
  let { query } = reqContext
  return getBlogList(query, context)
})

// 点赞博文
router.post('/api/blog/likes', context => {
  return '456'
})

// 获取作品列表
router.get('/api/design/designList', context => {  
})

// 点赞作品
router.post('/api/design/designList', context => {  
})



module.exports = router
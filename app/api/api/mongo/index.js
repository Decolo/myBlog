// 创建model
const mongoose = require('mongoose')
const { blogSchema } = require('./schema.js')

const blogModel = mongoose.model('Blog', blogSchema)
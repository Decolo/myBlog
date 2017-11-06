// 创建schema
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const blogSchema = new Schema({
  title:  String,
  content: String, // html
  rawContent: String, // markdown
  likes: Number,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: () => new Date().toLocaleString() }
})

module.exports = {
  blogSchema
}
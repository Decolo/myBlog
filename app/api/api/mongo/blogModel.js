
const mongoose = require('mongoose')
const { blogSchema } = require('./schema.js')
const statusCodeMap = require('../../../utils/statusCodeMap')
const BlogModel = mongoose.model('Blog', blogSchema)

// create
const saveBlog = (blog, context) => {
  let newBlog = {
    ...blog,
    date: new Date().toLocaleDateString()
  }
  return BlogModel.create(newBlog)
    .then(blog => {
      if (blog) {
        return {
          status: 1,
          message: 'create success'
        }
      } else {
        context.resContext = {
          ...context.resContext,
          statusCode: 500,
          statusMessage: statusCodeMap(500)
        }
        return {
          status: 0,
          message: 'create failed'
        }
      }
    })
}
// read
const getBlog = (id, context) => {
  return BlogModel.findById(id)
    .exec()
    .then(blog => {
      if (blog) {
        return {
          status: 1,
          message: 'success',
          data: blog
        }
      } else {
        throw new Error('not found')
      }
    }).catch(error => {
        context.resContext = {
          ...context.resContext,
          statusCode: 400,
          statusMessage: statusCodeMap(400)
        }
        return {
          status: 0,
          message: error.message
        }
    })
}
// delete
const deleteBlog = (id, context) => {
  return BlogModel.findByIdAndRemove(id)
    .exec()
    .then(blog => {
      if (blog) {
        return {
          status: 1,
          message: 'success'
        }
      } else {
        return {
          status: 0,
          message: 'the target don"t exsit'
        }
      }
    })
}
// update
const updateBlog = (blog, context) => {
  let id = blog.blogId
  let { title, content, rawContent } = blog
  return BlogModel.findByIdAndUpdate(id, {
    title,
    content,
    rawContent
  }).then(ret => {
    if (ret) {
      return {
        status: 1,
        message: 'success'
      }
    } else {
      throw new Error('Not Found')
    }
  }).catch(error => {
    context.resContext = {
      ...context.resContext,
      statusCode: 404,
      statusMessage: statusCodeMap(404)
    }
    return {
      status: 0,
      message: error
    }
  })
}
// getBlogList
const getBlogList = (query, context) => {
  let { page, limit } = query
  let start = --page
  let end = start + limit
  return BlogModel.find({})
    .exec()
    .then(blogs => {
      if (blogs) {
        return {
          status: 1,
          datas: blogs.slice(start, end),
          total: blogs.length
        }
      } else {
        throw new Error('Not Found')
      }
    }).catch(error => {
      context.resContext = {
        ...context.resContext,
        statusCode: 404,
        statusMessage: statusCodeMap(404)
      }
      return {
        status: 0,
        message: error
      } 
    })
}

const likePost = (id, context) => {
  return BlogModel.findByIdAndUpdate(id, {
    $inc: { likes: 1 } 
  }).then(ret => {
    if (ret) {
      return {
        status: 1,
        message: 'success',
        data: ret
      }
    } else {
      throw new Error('Not Found')
    }
  }).catch(error => {
    context.resContext = {
      ...context.resContext,
      statusCode: 404,
      statusMessage: statusCodeMap(404)
    }
    return {
      status: 0,
      message: error
    }
  })
}
module.exports = {
  saveBlog,  
  getBlog,
  deleteBlog,
  updateBlog,
  getBlogList,
  likePost
}
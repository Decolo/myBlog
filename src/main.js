import './scss/style.scss'
import './font/iconfont'
import ajax from './js/ajax.js'

ajax({
  url: '/api/articles',
  method: 'GET',
  data: {
    a: 1,
    b: 2
  },
  responseType: 'json'
}).then(ret => {
  console.log(ret)
}).catch(error => {
  console.log(error)
})
ajax({
  url: 'articles',
  method: 'GET',
  data: {
    a: 1,
    b: 2
  },
  responseType: 'json'
}).then(ret => {
  console.log(ret)
}).catch(error => {
  console.log(error)
})

ajax({
  url: '/api/articles',
  method: 'POST',
  data: {
    a: 1,
    b: 2
  },
  responseType: 'json',
  contentType: 'application/json'
}).then(ret => {
  console.log(ret)
}).catch(error => {
  console.log(error)
})



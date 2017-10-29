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
  contentType: 'json'
}).then(ret => {
  console.log(ret)
}).catch(error => {
  console.log(error)
})



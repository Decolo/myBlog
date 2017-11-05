/**
 * 一次加载3篇文章
 */
// const options = {
//     method: opts.method.toUpperCase() || 'GET',
//     url: opts.url || '',
//     data: opts.data || {},
//     async: opts.async || true,
//     responseType: opts.responseType || 'text',
//     contentType: opts.contentType || 'application/x-www-form-urlencoded; charset=UTF-8'
//   }
import ajax from './util/ajax'
import store from './util/store'


export default class Blogs {
  constructor(selector){
    this.container = document.querySelector(selector)
    this.pagination = store.getItem('blogPagination')
    this.init()
  }
  init() {
    let template = `
      <ul class="blogs">
      </ul>
    `
    this.container.innerHTML = template
    this.blogContainer = this.container.children[0]
    this.getBlogs(this.pagination)
  }
  getBlogs(pagination) {
    ajax({
      url: '/api/bloglist',
      data: pagination,
      responseType: 'json',
      method: 'GET'
    }).then(ret => {
      if (ret.message === 'success') {
        console.log(ret)
        this.render(ret.data)
      } else {
        // 没有了
      }
    })
  }
  render(datas) {
    let fragment = document.createDocumentFragment()
    datas.forEach(item => {
      let li = document.createElement('li')
      let template = `
          <div class="row">
            <h3><a href="/blog/${item.blogId}">${item.title}</a></h3>
            <p>${item.createDate}</p>
          </div>
          <div class="row">
            <p class="breif"><a href="/blog/${item.blogId}">${item.brief}</a></p>
          </div>
          <ul class="row">
            <li>
              <svg class="blog icon" aria-hidden="true">
                <use xlink:href="#icon-pinglun"></use>
              </svg>
              <span>${item.comments}</span>
            </li>
            <li>
              <svg class="blog icon" aria-hidden="true">
                <use xlink:href="#icon-dianzan"></use>
              </svg>
              <span>${item.likes}</span>
            </li>
          </ul>
      `
      li.innerHTML = template
      fragment.appendChild(li)
    })
    this.blogContainer.appendChild(fragment)
  }
}
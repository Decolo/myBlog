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
    console.log('init')
    let template = `
      <ul class="blogs">
      </ul>
    `
    this.container.innerHTML = template
    this.blogContainer = this.container.children[0]
    this.getBlogs(this.pagination)
    console.log('constructor')
  }
  getBlogs(pagination) {
    console.log('getBlogs')
    ajax({
      url: '/api/blogList',
      data: pagination,
      responseType: 'json',
      method: 'GET'
    }).then(ret => {
      if (ret.message === 'success') {
        this.render(ret.datas)
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
            <h3 class="title"><a href="/api/blog?${item._id}">${item.title}</a></h3>
            <p class="date">${item.date.substr(0, 10)}</p>
          </div>
          <div class="row">
            <p class="breif">${item.rawContent.substr(0, 80) + '...'}</p>
          </div>
          <ul class="row">
            <li>
              <svg class="blog icon" aria-hidden="true">
                <use xlink:href="#icon-pinglun"></use>
              </svg>
              <span>${item.comments.length}</span>
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
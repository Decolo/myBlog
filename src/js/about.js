import store from './util/store'

export default class AboutMe {
  constructor(selector) {
    this.options = store.getItem('about')
    this.container = document.querySelector(selector)
    this.init()
  }
  init() {
    let { contacts } = this.options
    let contactStr = '<ul>'
    let templete = `
        <div class="avatar row">
                <img src=${this.options.avatar} alt="avatar">
            </div>
            <div class="breif row">
                <p>${this.options.brief}</p>
            </div>
    `
    contacts.forEach(item => {
      contactStr += `
        <li>
          <a href=${item.url}>
              <svg class="contact-icon" aria-hidden="true">
                  <use xlink:href="#icon-${item.iconName}"></use>
              </svg>
          </a>
        </li>
      `
    })
    templete += contactStr

    let wrapper = document.createElement('section')
    wrapper.classList.add('about')
    wrapper.innerHTML = templete
    this.container.appendChild(wrapper)
  }
}
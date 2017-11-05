/**
 * @param    {String}    selector 
 * @param    {Array}     options
 */


export default class NavTab{
  constructor(contentSelector, selector, options) {
    this.contentSelector = contentSelector
    this.contentContainer = document.querySelector(contentSelector)
    this.container = document.querySelector(selector)
    this.defaultOption = {
      titleContent: '',
      className: 'icon',
      iconHref: '',
      Component: null
    }
    this.options = options.map(item => {
      return Object.assign({}, this.defaultOption, item)
    })
    this.init()
    this.bindEvent()
  }
  init() {
    let template = '<ul>'
    this.options.forEach(item => {
      template += `
        <li>
            <svg class=${item.className} aria-hidden="true">
              <use xlink:href=${item.iconHref}></use>
              <p>${item.titleContent}</p>
            </svg>
        </li>
      `
    })
    template += '</ul>'
    this.container.innerHTML = template
    this.renderContent(0)
  }
  bindEvent() {
    this.container.addEventListener('click', event => {
      let targetTag = 'LI'
      let curTarget = event.target
      let index = this.getIndex(this.container, curTarget, targetTag)
      // 渲染相应组件

      this.renderContent(index)
    })
  }
  getIndex(container, curTarget, tagName) {
    while (curTarget.tagName !== tagName) {
      if (curTarget === container) {
        curTarget = null
        break
      }
      curTarget = curTarget.parentNode
    }
    if (curTarget) {
      const target = curTarget
      const childs = target.parentNode.children
      for (let i = 0; i < childs.length; i++) {
        if (target === childs[i]) {
          return i 
        }
      }
    } else {
      return -1
    }
  }
  renderContent(index) {
    let { Component } = this.options[index]
    // 这句要商榷
    this.contentContainer.innerHTML = ''
    // console.log(this.contentContainer)
    console.log(new Component(this.contentSelector))
  }
}


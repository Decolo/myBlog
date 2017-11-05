import './scss/style.scss'
import './font/iconfont'
import Tab from './js/tab.js'
import About from './js/about.js'
import Blogs from './js/blogs.js'
import Designs from './js/designs.js'

import ajax from './js/util/ajax'

new Tab('.content', '.bottom-nav', [
  {
    titleContent: 'About',
    iconHref: '#icon-shouye',
    Component: About
  },
  {
    titleContent: 'Blogs',
    iconHref: '#icon-icon',
    Component: Blogs
  },
  {
    titleContent: 'Designs',
    iconHref: '#icon-icon1',
    Component: Designs
  },
])





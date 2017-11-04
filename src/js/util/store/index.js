class Store {
  constructor() {
    this.store = {
      'about': {
        name: '蔡诚',
        avatar: './img/avatar.webp',
        contacts: [
          { 
            iconName: 'github',
            url: 'https://github.com/Decolo' 
          },
          { 
            iconName: 'youxiang',
            url: 'decolo@163.com' 
          },
          {
            iconName: 'jianshu',
            url: 'http://www.jianshu.com/u/6e6da03f3949' 
          },
          { 
            iconName: 'matuwang-zhihufangxingdianji',
            url: 'https://www.zhihu.com/people/colo-de-72/activities' 
          },
          { 
            iconName: 'zhanku',
            url: 'http://www.zcool.com.cn/u/13598508'}
        ],
        brief: ''
      }
    }
  }
  getItem(key) {
    return this.store[key]
  }
  saveItem(key, value) {
    this.store[key] = value
  }
  deleteItem(key) {
    delete this.store[key]
  }
}

export default new Store()
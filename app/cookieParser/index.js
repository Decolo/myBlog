const parseCookie = cookie => {
  let cookies = {}
  if (!cookie) return cookies
  let list = cookie.split(';')
  list.forEach(item => {
    let items = item.split('=')
    cookies[items[0].trim()] = items[1]
  })
  return cookies
}
const createCookie = (name, val, opt = {}) => {
  let pairs = [`${name}=${encodeURI(val)}`]
  if (opt.maxAge) pairs.push(`Max-Age=${opt.maxAge}`)
  if (opt.domain) pairs.push(`Domain=${opt.domain}`)
  if (opt.path) pairs.push(`Path=${opt.path}`)
  if (opt.expires) pairs.push(`Expires=${opt.expires.toUTCString()}`)
  if (opt.httpOnly) pairs.push('HttpOnly')
  if (opt.secure) pairs.push('Secure')

  return pairs.join(';')
}

module.exports = context => {
  let { url } = context.req
  let { cookie } = context.req.headers
  let { resContext, res } = context
  let cookieObj = parseCookie(cookie)
  return Promise.resolve({
    then: resolve => {
      if (cookieObj['authd']) {
        resContext.hasUser = true
        resContext.headers = {
          'Set-Cookie': createCookie('authd', 'helloworld', {
              maxAge: 3600
            }),
          ...resContext.headers
        }
      }
      const whiteNameList = ['/decolo']
			//登录
			if (whiteNameList.indexOf(url) > -1) {
				resContext.hasUser = true
        resContext.headers = {
          'Set-Cookie': createCookie('authd', 'helloworld', {
              maxAge: 3600
            }),
          ...resContext.headers
        }
			}
			//登出
			if (url === '/logout') { 
				resContext.hasUser = false
        resContext.headers = {
          'Set-Cookie': createCookie('authd', 'helloworld', {
              maxAge: 0
            }),
          ...resContext.headers
        }
			}
      
			resolve()
    }
  })
}
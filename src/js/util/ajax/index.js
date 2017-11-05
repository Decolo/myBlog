/**
 * @param  {String}  opts.method
 * @param  {String}  opts.url
 * @param  {Object}  opts.data
 * @param  {Boolean}  opts.async
 * @param  {responseType}  opts.responseType
 * @param  {contentType}  opts.contentType
 */
function ajax(opts) {
  const options = {
    method: opts.method || 'GET',
    url: opts.url || '',
    data: opts.data || {},
    async: opts.async || true,
    responseType: opts.responseType || 'text',
    contentType: opts.contentType || 'application/x-www-form-urlencoded; charset=UTF-8'
  }
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest()
    let { url, contentType, data } = options, finalData
    if (options.method === 'GET') {
      url = url + '?' + serialize(data)
    }
    xhr.open(options.method, url, true)
    if (options.method === 'POST') {
      if (contentType === 'application/json') {
        finalData = JSON.stringify(data)
      } else {
        finalData = serialize(data)
      }
    }
    xhr.setRequestHeader('Content-Type', contentType)
    xhr.responseType = options.responseType
    xhr.onload = () => {
      if (xhr.status === 200 || xhr.status === 304) {
        resolve(xhr.response)
      }
    }
    xhr.onerror = reject
    xhr.send(finalData)
  }).then(ret => {
    if (ret.status === 1) {
      return ret
    } else {
      throw new Error(ret.message)
    }
  }).catch(error => {
    console.log(error)
  })
}

function serialize(obj) {
  let arr = []
  for (let key of Object.keys(obj)) {
    arr.push(`${key}=${obj[key]}`)
  }
  return arr.join('&')
}

export default ajax
function ajax(opts) {
  const options = {
    method: opts.method.toUpperCase() || 'GET',
    url: opts.url || '',
    data: opts.data || {},
    async: opts.async || true,
    contentType: opts.contentType || 'text'
  }
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest()
    if (options.method === 'GET') {
      xhr.open(options.method, getUrl(options.data, options.url), true)
      xhr.responseType = options.contentType
      xhr.onload = () => {
        if (xhr.status === 200 || xhr.status === 304) {
          resolve(xhr.response)
        }
      }
      xhr.onerror = reject
      xhr.send()
    } else if (options.method === 'POST') {
      xhr.open(options.method, options.url, true)
      xhr.onload = () => {
        if (xhr.status === 200 && xhr.status === 304) {
          resolve(xhr.responseText)
        }
      }
      xhr.onerror = reject
      xhr.send(options.data)
    }
  })
}

function getUrl(obj, url) {
  url = url + '?'
  let arr = []
  for (let key of Object.keys(obj)) {
    arr.push(`${key}=${obj[key]}`)
  }
  return url + arr.join('&')
}

export default ajax
import config from './config'
const fetch = window.fetch
const Headers = window.Headers

export default {
  get (path, params = null) {
    let requestString = ''
    if (params) {
      requestString = '?' + Object.keys(params).map((key) => {
        return `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
      }).join(',')
    }

    return this._request(`${config.url}${path}${requestString}`)
  },

  post (path, payload) {
    return this._request(`${config.url}${path}`, {
      method: 'post',
      body: JSON.stringify(payload)
    })
  },

  put (path, payload) {
    return this._request(`${config.url}${path}`, {
      method: 'put',
      body: JSON.stringify(payload)
    })
  },

  delete (path, payload) {
    return this._request(`${config.url}${path}`, {
      method: 'delete',
      body: JSON.stringify(payload)
    })
  },

  _request (url, config = {}) {
    let headers = new Headers()
    headers.append('Content-Type', 'application/json')

    let baseConfig = {
      headers
    }

    Object.assign(baseConfig, config)

    console.log(baseConfig)

    return fetch(url, baseConfig).then((r) => r.json())
  }
}

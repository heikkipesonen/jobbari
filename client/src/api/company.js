import http from './http'

export default {
  get (id) {
    return http.get(`/company/{$id}`)
  },

  list () {
    return http.get(`/company`)
  },

  update (company) {
    return http.put(`/company/{$company.id}`, company)
  },

  create (company) {
    return http.post(`/company`, company)
  },

  delete (company) {
    return http.delete(`/company`, company)
  }
}

import http from './http'

export default {
  get (id) {
    return http.get(`/user/{$id}`)
  },

  list () {
    return http.get(`/user`)
  },

  update (user) {
    return http.put(`/user/{$user.id}`, user)
  },

  create (user) {
    return http.post(`/user`, user)
  },

  delete (user) {
    return http.delete(`/user`, user)
  },

  authenticate (email, password) {
    return http.post(`/login`, {email, password})
  }
}

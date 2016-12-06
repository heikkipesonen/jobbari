import Vue from 'vue'
import Vuerouter from 'vue-router'

import Register from './views/register'
import Login from './views/login'

Vue.use(Vuerouter)
/* eslint-disable no-new */
const router = new Vuerouter({
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    }
  ]
})

export default router

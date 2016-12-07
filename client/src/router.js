import Vue from 'vue'
import Vuerouter from 'vue-router'

import Main from './views/main'
import Login from './views/login'
import Register from './views/register'
import Company from './views/company'

Vue.use(Vuerouter)
/* eslint-disable no-new */
const router = new Vuerouter({
  routes: [
    {
      name: 'main',
      path: '/',
      component: Main
    },
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'register',
      path: '/register',
      component: Register
    },
    {
      name: '/company',
      path: '/company',
      component: Company
    }
  ]
})

export default router

<template>
<view-container>
  <div class="flex layout-center layout-column">
    <h2>user</h2>

    <input-container label="email" v-model="user.email"></input-container>
    <input-container label="password" v-model="user.password"></input-container>

    <button @click="login()">+</button>
  </div>
</view-container>
</template>
<script>
import user from '../api/user'

import viewContainer from '../components/view-container'
import inputContainer from '../components/input-container'

export default {
  components: {
    viewContainer,
    inputContainer
  },

  data () {
    return {
      user: {
        email: 'kissa@koira.org',
        password: 'kissakala'
      }
    }
  },

  methods: {
    login () {
      user.authenticate(this.user.email, this.user.password).then((response) => {
        console.log(response)
      })
    }
  }
}
</script>
<style lang="scss">
</style>

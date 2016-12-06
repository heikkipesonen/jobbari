<template>
<view-container>
<h2>user</h2>
  <input-container label="name" v-model="user.name"></input-container>
  <input-container label="email" v-model="user.email"></input-container>
  <input-container label="password" v-model="user.password"></input-container>

  <button @click="create()">+</button>
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
        name: '',
        email: '',
        password: ''
      }
    }
  },

  methods: {
    create () {
      user.create(this.user).then((response) => {
        console.log(response)
      })
    }
  }
}
</script>
<style lang="scss">
</style>

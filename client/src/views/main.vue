<template>
<view-container>
  <router-link to="login">Login</router-link>
  <router-link to="register">Register</router-link>
  <router-link to="company">Add company</router-link>
</view-container>
</template>
<script>
import viewContainer from '../components/view-container'

export default {
  components: {
    viewContainer
  },

  methods: {

  }
}
</script>
<style lang="scss">
</style>

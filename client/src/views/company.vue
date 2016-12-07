<template>
<view-container>
  <div class="flex layout-center layout-row">
    <div class="layout-column">
  <h2>company</h2>
  <div class="row">
    <div class="layout-row">
      <input-container class="flex" placeholder="name" label="name" v-model="company.name"></input-container>
      <input-container class="flex" placeholder="email" label="email" v-model="company.email"></input-container>
    </div>
  </div>
  <div class="row">
    <div class="layout-row">
      <input-container class="flex" placeholder="phone" label="phone" v-model="company.tel"></input-container>
      <input-container class="flex" placeholder="vat" label="vat id" v-model="company.vatId"></input-container>
    </div>
  </div>
  <div class="row">
    <div class="layout-row">
        <input-container class="flex" placeholder="description" label="description" v-model="company.description"></input-container>
      </div>
    </div>
    <div class="row">
      <div class="layout-row">
        <input-container class="flex" placeholder="address" label="address" v-model="company.address"></input-container>
        <input-container class="flex" placeholder="postal" label="postal" v-model="company.postal"></input-container>
        <input-container class="flex" placeholder="city" label="city" v-model="company.city"></input-container>
      </div>
    </div>
    <button @click="create()">+</button>
  </div>
  </div>
</view-container>
</template>
<script>
import company from '../api/company'

import viewContainer from '../components/view-container'
import inputContainer from '../components/input-container'

export default {
  components: {
    viewContainer,
    inputContainer
  },

  data () {
    return {
      company: {
        name: '',
        email: '',
        tel: '',
        description: '',
        vatid: '',
        address: '',
        postal: '',
        city: ''
      }
    }
  },

  methods: {
    create () {
      company.create(this.company).then((response) => {
        console.log(response)
      })
    }
  }
}
</script>
<style lang="scss">
</style>

<template>
<div class="input-container">
  <input type="text" v-model="inputValue">
  <label>{{label}}</label>
</div>
</template>
<script>
export default {
  props: {
    label: {
      type: String
    },

    value: {
      type: [String, Number]
    }
  },

  data () {
    return {
      inputValue: this.value
    }
  },

  watch: {
    inputValue () {
      this.$emit('input', this.inputValue)
    },

    value () {
      this.inputValue = this.value
    }
  }
}
</script>
<style lang="scss" scoped>
.input-container, input, label {
  font-size: 1rem;
}

.input-container {
  position: relative;
  padding: 1em 0em 1em 0em;
}

input {
  outline: none;
  border: none;
  border-bottom: 1px solid #d00;
  padding: 1em;
}

label {
  position: absolute;
  top: 0;
  left: 1em;
}
</style>

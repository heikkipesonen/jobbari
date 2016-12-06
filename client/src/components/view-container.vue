<template>
<div class="view layout-column">
  <slot></slot>
</div>
</template>
<script>
export default {

}
</script>
<style lang="scss" scoped>
.view {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  padding: 1em;
}
</style>

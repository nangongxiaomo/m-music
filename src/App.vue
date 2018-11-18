<template>
  <div id="app">
    <m-header></m-header>
    <m-tabs></m-tabs>
    <router-view></router-view>
  </div>
</template>
<script>
import MHeader from 'base/header/mheader'
import MTabs from 'views/tabs/tabs'
export default {
  components: {
    MHeader,
    MTabs
  }
}
</script>
<style lang="stylus">

</style>

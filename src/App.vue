<template>
  <div id="app">
    <m-header></m-header>
    <m-tabs></m-tabs>
    <router-view></router-view>
    <player></player>
  </div>
</template>
<script>
import MHeader from 'base/header/mheader'
import MTabs from 'views/tabs/tabs'
import Player from 'views/player/player'


export default {
  components: {
    MHeader,
    MTabs,
    Player
  }
}
</script>
<style lang="stylus" scoped>
</style>

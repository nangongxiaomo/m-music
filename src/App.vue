<template>
  <div id="app">
    <m-header></m-header>
    <m-tabs></m-tabs>
    <!-- <router-swiper :router-path="routesList">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </router-swiper>-->
    <router-view></router-view>
  </div>
</template>
<script>
import MHeader from 'base/header/mheader'
import MTabs from 'views/tabs/tabs'
import RouterSwiper from 'base/router-swiper/router-swiper'

export default {
  data() {
    return {
      routesList: [
        {
          path: '/'
        },
        {
          path: '/recommend'
        },
        {
          path: '/singer'
        },
        {
          path: '/rank'
        }
      ]
    }
  },

  components: {
    MHeader,
    MTabs,
    RouterSwiper
  }
}
</script>
<style lang="stylus" scoped>
</style>

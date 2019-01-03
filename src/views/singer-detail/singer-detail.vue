<template>
  <transition name="slide">
    <div class="singer-detail">
      <music-list></music-list>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
import MusicList from 'views/music-list/music-list'
export default {
  computed: {
    ...mapGetters(['singer'])
  },
  components: {
    MusicList
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
.singer-detail
  position fixed
  z-index 100
  top 0
  right 0
  bottom 0
  left 0
  background-color $color-background
.slide-enter-active, .slide-leave-active
  transition all 0.3s
.slide-enter, .slide-leave-to
  transform translate3d(100%, 0, 0)
</style>
<template>
  <div class="music-list">
    <div class="list-header">
      <i class="icon-back" @click="back"></i>
      <h1 class="title">周杰伦</h1>
    </div>
    <div class="bg-image">
      <div class="filter"></div>
    </div>
  </div>
</template>

<script>
import SongList from 'base/song-list/song-list'
export default {
  methods: {
    back() {
      this.$router.back()
    }
  },
  components: {
    SongList
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.list-header
  position absolute
  left 0
  right 0
  height 40px
  z-index 1
  .icon-back
    position absolute
    padding 10px
    top 50%
    transform translate3d(0, -50%, 0)
    font-size $font-size-large-x
    color $color-theme
  .title
    line-height 40px
    text-align center
    no-wrap()
.bg-image
  position relative
  height 0
  overflow hidden
  padding-bottom 70%
  transform-origin top
  background-size cover
  .filter
    position absolute
    top 0
    left 0
    width 100%
    height 100%
    background rgba(7, 17, 27, 0.4)
</style>

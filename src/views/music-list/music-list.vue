<template>
  <div class="music-list">
    <div class="list-header">
      <i class="icon-back" @click="back"></i>
      <h1 class="title" v-html="title"></h1>
    </div>
    <div class="bg-image" :style="bgStyle">
      <div class="filter"></div>
    </div>
    <div class="bg-layer"></div>
    <scroll-view :data="songs" class="list" style="top: 263px;">
      <div class="song-list-wrapper">
        <song-list :songs="songs"></song-list>
      </div>
    </scroll-view>
  </div>
</template>

<script>
import SongList from 'base/song-list/song-list'
import ScrollView from 'base/scroll-view/scroll-view'
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    bgImage: {
      type: String,
      default: ''
    },
    songs: {
      type: Array,
      default: []
    }
  },
  computed: {
    bgStyle() {
      return `background-image:url(${this.bgImage})`
    }
  },
  methods: {
    back() {
      this.$router.back()
    }
  },
  components: {
    SongList,
    ScrollView
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.music-list
  position fixed
  top 0
  right 0
  bottom 0
  left 0
  z-index 31
  background-color $color-background
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
      font-size $font-size-large
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
  .bg-layer
    position relative
    height 100%
    background-color $color-background
  .list
    position absolute
    top 263px
    width 100%
    bottom 0
  .song-list-wrapper
    padding 20px 30px
</style>

<template>
  <div class="music-list">
    <div class="list-header">
      <i class="icon-back" @click="back"></i>
      <h1 class="title" v-html="title"></h1>
    </div>
    <div class="bg-image" :style="bgStyle" ref="bgImage">
      <div class="filter"></div>
    </div>
    <div class="bg-layer" ref="bgLayer"></div>
    <scroll-view
      :probe-type="probeType"
      :listen-scroll="listenScroll"
      :data="songs"
      class="list"
      @scroll="scroll"
      ref="list"
    >
      <div class="song-list-wrapper">
        <song-list :songs="songs"></song-list>
      </div>
    </scroll-view>
  </div>
</template>

<script>
import SongList from 'base/song-list/song-list'
import ScrollView from 'base/scroll-view/scroll-view'

const maxHeight = 40
export default {
  props: {
    bgImage: {
      type: String,
      default: ''
    },
    songs: {
      type: Array,
      default: []
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      scrollY: 0
    }
  },
  computed: {
    bgStyle() {
      return `background-image:url(${this.bgImage})`
    }
  },
  created() {
    this.probeType = 3
    this.listenScroll = true
  },
  mounted() {
    this.imageHeight = this.$refs.bgImage.clientHeight
    this.minTranslateY = -this.imageHeight + maxHeight

    this.$refs.list.$el.style['top'] = this.$refs.bgImage.clientHeight + 'px'
  },
  methods: {
    back() {
      this.$router.back()
    },
    scroll(pos) {
      this.scrollY = pos.y
    }
  },
  watch: {
    scrollY(newY) {
      let translateY = Math.max(this.minTranslateY, newY)
      let scale = 1
      this.$refs.bgLayer.style[
        'transform'
      ] = `translate3d(0, ${translateY}px,0)`
      const persent = Math.abs(newY / this.imageHeight)
      if (newY > 0) {
        scale = 1 + persent
      }
      let zIndex = 0
      if (newY < this.minTranslateY) {
        zIndex = 10
        this.$refs.bgImage.style.paddingBottom = 0
        this.$refs.bgImage.style.height = maxHeight + 'px'
      } else {
        this.$refs.bgImage.style.paddingBottom = '70%'
        this.$refs.bgImage.style.height = 0
      }
      this.$refs.bgImage.style.zIndex = zIndex
      this.$refs.bgImage.style['transform'] = `scale(${scale})`
    }
  },
  components: {
    ScrollView,
    SongList
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
    z-index 11
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
    width 100%
    bottom 0
  .song-list-wrapper
    padding 20px 30px
</style>

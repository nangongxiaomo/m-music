<template>
  <scroll-view
    :data="data"
    class="list-view"
    ref="listView"
    :listenScroll="listenScroll"
    :probeType="probeType"
    @scroll="scroll"
  >
    <ul>
      <li v-for="(group, index) in data" :key="index" class="list-group" ref="listGroup">
        <h2 class="list-group-title">{{ group.title }}</h2>
        <ul>
          <li
            v-for="item in group.items"
            class="list-group-item"
            :key="item.id"
            @click="clickItem(item)"
          >
            <img class="avatar" v-lazy="item.avatar">
            <span class="name">{{ item.name }}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div
      class="list-shortcut"
      @touchstart="onShortcutTouchStart"
      @touchmove.stop.prevent="onShortcutTouchMove"
    >
      <ul>
        <li
          v-for="(item, index) in shortcutList"
          :data-index="index"
          class="item"
          :key="item"
          :class="{ current: currentIndex === index }"
        >{{ item }}</li>
      </ul>
    </div>
    <div class="list-fixed" v-show="fixedTitle" ref="fixed">
      <div class="fixed-title">{{ fixedTitle }}</div>
    </div>
    <div class="loading-container" v-show="!data.length">
      <loading></loading>
    </div>
  </scroll-view>
</template>

<script>
import ScrollView from 'base/scroll-view/scroll-view'
import Loading from 'base/loading/loading'
import { getDataAttr } from 'common/js/dom'
const ANCHOR_HEIGHT = 18 //字母元素高度
const TITLE_HEIGHT = 30 //固定title高度
export default {
  props: {
    data: Array,
    default: []
  },
  data() {
    return {
      currentIndex: 0,
      scrollY: -1,
      diff: -1
    }
  },
  created() {
    this.touch = {}
    this.listenScroll = true
    this.probeType = 3
    this.listHeight = []
  },
  computed: {
    shortcutList() {
      return this.data.map(item => {
        return item.title.substr(0, 1)
      })
    },
    fixedTitle() {
      if (this.scrollY > 0) {
        return ''
      }
      return this.data[this.currentIndex]
        ? this.data[this.currentIndex].title
        : ''
    }
  },
  methods: {
    refresh() {
      this.$refs.listView.refresh()
    },
    clickItem(item) {
      this.$emit('handleClick', item)
    },
    onShortcutTouchStart(e) {
      let anchorIndex = getDataAttr(e.target, 'index')
      let touches = e.touches[0]
      this.touch.startY = touches.pageY
      this.touch.anchorIndex = anchorIndex
      this._scrollTo(anchorIndex)
    },
    onShortcutTouchMove(e) {
      let touches = e.touches[0]
      this.touch.endY = touches.pageY
      let delta = ((this.touch.endY - this.touch.startY) / ANCHOR_HEIGHT) | 0
      let anchorIndex = parseInt(this.touch.anchorIndex) + delta
      this._scrollTo(anchorIndex)
    },
    scroll(pos) {
      this.scrollY = pos.y
    },
    _calculateHeight() {
      this.listHeight = []
      const list = this.$refs.listGroup
      let height = 0
      this.listHeight.push(height)
      for (let index = 0; index < list.length; index++) {
        const element = list[index]
        height += element.clientHeight
        this.listHeight.push(height)
      }
    },
    _scrollTo(index) {
      if (!index && index !== 0) {
        return
      }
      if (index < 0) {
        index = 0
      } else if (index > this.listHeight.length - 2) {
        index = this.listHeight.length - 2
      }
      this.scrollY = -this.listHeight[index]

      this.$refs.listView.scrollToElement(this.$refs.listGroup[index], 0)
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this._calculateHeight()
      }, 20)
    },
    scrollY(newY) {
      const listHeight = this.listHeight
      //当滚动顶部时 newY大于0
      if (newY > 0) {
        this.currentIndex = 0
        return
      }

      //在中间位置滚动时
      for (let i = 0; i < listHeight.length - 1; i++) {
        const item = listHeight[i]
        let minHeight = listHeight[i]
        let maxHeight = listHeight[i + 1]
        if (-newY >= minHeight && -newY < maxHeight) {
          this.currentIndex = i
          this.diff = maxHeight + newY
          return
        }
      }
      //滚动到底部
      this.currentIndex = listHeight.length - 2
    },
    diff(newVal) {
      let fixedTop =
        newVal > 0 && newVal < TITLE_HEIGHT ? newVal - TITLE_HEIGHT : 0
      if (fixedTop === TITLE_HEIGHT) {
        return
      }
      this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
    }
  },
  components: {
    ScrollView,
    Loading
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
.list-view
  position relative
  width 100%
  height 100%
  overflow hidden
  background $color-background
  .list-group
    padding-bottom 30px
    .list-group-title
      height 30px
      line-height 30px
      padding-left 20px
      font-size $font-size-small
      color $color-text-l
      background $color-highlight-background
    .list-group-item
      display flex
      align-items center
      padding 20px 0 0 30px
      .avatar
        width 50px
        height 50px
        border-radius 50%
      .name
        margin-left 20px
        color $color-text-l
        font-size $font-size-medium
  .list-shortcut
    position absolute
    z-index 30
    right 0
    top 50%
    transform translateY(-50%)
    width 20px
    padding 20px 0
    border-radius 10px
    text-align center
    background $color-background-d
    font-family Helvetica
    .item
      padding 3px
      line-height 1
      color $color-text-l
      font-size $font-size-small
      &.current
        color $color-theme
  .list-fixed
    position absolute
    top 0
    left 0
    width 100%
    .fixed-title
      height 30px
      line-height 30px
      padding-left 20px
      font-size $font-size-small
      color $color-text-l
      background $color-highlight-background
  .loading-container
    position absolute
    width 100%
    top 50%
    transform translateY(-50%)
</style>

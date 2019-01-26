<template>
  <transition name="list-fade">
    <div class="playlist" v-show="showflag" @click="hide">
      <div class="list-wrapper">
        <div class="list-header">
          <h1 class="title">
            <i class="icon" :class="iconMode" @click.stop="changeMode"></i>
            <span class="text" v-html="text"></span>
            <span class="clear" @click.stop="showComfirm">
              <i class="icon-clear"></i>
            </span>
          </h1>
        </div>
        <scroll-view ref="listContent" :data="sequenceList" class="list-content">
          <transition-group name="list" tag="ul">
            <li
              @click.stop="selectItem(item, index)"
              class="item"
              v-for="(item, index) of sequenceList"
              :key="item.id"
              ref="listItem"
            >
              <i class="current" :class="getCurrentIcon(item)"></i>
              <span class="text" v-html="item.name" :class="getCurrentName(item)"></span>
              <span class="like">
                <i class="icon-not-favorite"></i>
              </span>
              <span class="delete" @click.stop="deleteOne(item)">
                <i class="icon-delete"></i>
              </span>
            </li>
          </transition-group>
        </scroll-view>
        <div class="list-operate">
          <div class="add" @click.stop="addSong">
            <i class="icon-add"></i>
            <span class="text">添加歌曲到队列</span>
          </div>
        </div>
        <div class="list-close" @click="hide">
          <span>关闭</span>
        </div>
      </div>
      <comfirm ref="comfirm" @comfirm="comfirmClear" text="是否清空播放列表" confirmBtnText="清空"></comfirm>
      <add-song ref="addSong"></add-song>
    </div>
  </transition>
</template>

<script>
import ScrollView from 'base/scroll-view/scroll-view'
import Comfirm from 'base/comfirm/comfirm'
import AddSong from 'views/add-song/add-song'
import { mapActions } from 'vuex'
import { playMode } from 'common/js/config'
import { playerMixin } from 'common/js/mixin'

export default {
  mixins: [playerMixin],
  data() {
    return {
      showflag: false
    }
  },
  computed: {
    text() {
      return this.mode === playMode.sequence
        ? '顺序播放'
        : this.mode === playMode.random
        ? '随机播放'
        : '单曲循环'
    }
  },
  methods: {
    addSong() {
      this.$refs.addSong.show()
    },
    selectItem(item, index) {
      if (this.mode === playMode.random) {
        index = this.playList.findIndex(song => {
          return song.id === item.id
        })
      }
      this.setCurrentIndex(index)
      this.setPlayState(true)
    },
    scrollCurrent(current) {
      const index = this.sequenceList.findIndex(item => {
        return current.id === item.id
      })
      this.$refs.listContent.scrollToElement(this.$refs.listItem[index], 200)
    },
    getCurrentIcon(item) {
      if (this.currentSong.id === item.id) {
        return 'icon-play'
      } else {
        return ''
      }
    },
    getCurrentName(item) {
      if (this.currentSong.id === item.id) {
        return 'colors'
      } else {
        return ''
      }
    },
    showComfirm() {
      this.$refs.comfirm.show()
    },
    comfirmClear() {
      this.deleteSongList()
      this.hide()
    },
    show() {
      this.showflag = true
      this.$nextTick(() => {
        this.$refs.listContent.refresh()
        this.scrollCurrent(this.currentSong)
      })
    },
    hide() {
      this.showflag = false
    },
    deleteOne(item) {
      this.deleteSong(item)
      if (!this.playList.length) {
        this.hide()
      }
    },

    ...mapActions(['deleteSong', 'deleteSongList'])
  },
  watch: {
    currentSong(newSong, oldSong) {
      if (!this.showflag || newSong.id === oldSong.id) {
        return
      }
      this.scrollCurrent(newSong)
    }
  },
  components: {
    ScrollView,
    Comfirm,
    AddSong
  }
}
</script>

<style scoped lang="stylus">
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.playlist
  position fixed
  left 0
  right 0
  top 0
  bottom 0
  z-index 200
  background-color $color-background-d
  &.list-fade-enter-active, &.list-fade-leave-active
    transition opacity 0.3s
    .list-wrapper
      transition all 0.3s
  &.list-fade-enter, &.list-fade-leave-to
    opacity 0
    .list-wrapper
      transform translate3d(0, 100%, 0)
  &.list-fade-enter, .list-wrapper
    position absolute
    left 0
    bottom 0
    width 100%
    background-color $color-highlight-background
    .list-header
      position relative
      padding 20px 30px 10px 20px
      .title
        display flex
        align-items center
        .icon
          margin-right 10px
          font-size 30px
          color $color-theme-d
        .text
          flex 1
          font-size $font-size-medium
          color $color-text-l
        .clear
          extend-click()
          .icon-clear
            font-size $font-size-medium
            color $color-text-d
    .list-content
      max-height 240px
      overflow hidden
      .item
        display flex
        align-items center
        height 40px
        padding 0 30px 0 20px
        overflow hidden
        &.list-enter-active, &.list-leave-active
          transition all 0.1s
        &.list-enter, &.list-leave-to
          height 0
        .current
          flex 0 0 20px
          width 20px
          font-size $font-size-small
          color $color-theme-d
        .text
          flex 1
          no-wrap()
          font-size $font-size-medium
          color $color-text-d
        .colors
          color $color-theme-d
        .like
          extend-click()
          margin-right 15px
          font-size $font-size-small
          color $color-theme
          .icon-favorite
            color $color-sub-theme
        .delete
          extend-click()
          font-size $font-size-small
          color $color-theme
    .list-operate
      width 140px
      margin 20px auto 30px auto
      .add
        display flex
        align-items center
        padding 8px 16px
        border 1px solid $color-text-l
        border-radius 100px
        color $color-text-l
        .icon-add
          margin-right 5px
          font-size $font-size-small-s
        .text
          font-size $font-size-small
    .list-close
      text-align center
      line-height 50px
      background $color-background
      font-size $font-size-medium-x
      color $color-text-l
</style>


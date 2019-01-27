<template>
  <transition name="slide">
    <div class="user-center">
      <div class="back" @click.stop="back">
        <i class="icon-back"></i>
      </div>
      <div class="switches-wrapper">
        <switches :switches="switches" :currentShowIndex="currentShowIndex" @switch="switchClick"></switches>
      </div>
      <div class="play-btn" @click="random">
        <i class="icon-play"></i>
        <span class="text">随机播放全部</span>
      </div>
      <div class="list-wrapper" ref="listWrapper">
        <scroll-view
          ref="favoriteScroll"
          class="list-scroll"
          :data="favoriteList"
          v-if="currentShowIndex === 0"
        >
          <div class="list-inner">
            <song-list :songs="favoriteList" @handleClick="selectSong"></song-list>
          </div>
        </scroll-view>
        <scroll-view
          :data="playHistory"
          ref="playList"
          v-if="currentShowIndex === 1"
          class="list-scroll"
        >
          <div class="list-inner">
            <song-list :songs="playHistory" @handleClick="selectSong"></song-list>
          </div>
        </scroll-view>
      </div>
      <div class="no-result-wrapper" v-show="noResult">
        <no-result :title="descNoResult"></no-result>
      </div>
    </div>
  </transition>
</template>

<script>
import Switches from 'base/switches/switches'
import ScrollView from 'base/scroll-view/scroll-view'
import SongList from 'base/song-list/song-list'
import NoResult from 'base/no-result/no-result'
import Song from 'common/js/Song'
import { playListMixin } from 'common/js/mixin'
import { mapGetters, mapActions } from 'vuex'

export default {
  mixins: [playListMixin],
  data() {
    return {
      switches: ['我喜欢的', '最近听的'],
      currentShowIndex: 0
    }
  },
  computed: {
    noResult() {
      if (this.currentShowIndex === 0) {
        return !this.favoriteList.length
      } else {
        return !this.playHistory.length
      }
    },
    descNoResult() {
      if (this.currentShowIndex === 0) {
        return '暂无收藏歌曲'
      } else {
        return '最近还没听过歌曲'
      }
    },
    ...mapGetters(['favoriteList', 'playHistory'])
  },
  methods: {
    handlePlayList(list) {
      const bottom = list.length > 0 ? '60px' : ''
      this.$refs.listWrapper.style.bottom = bottom
      this.$refs.favoriteScroll && this.$refs.favoriteScroll.refresh()
      this.$refs.playList && this.$refs.playList.refresh()
    },
    selectSong(song) {
      this.insertSong(new Song(song))
    },
    switchClick(index) {
      this.currentShowIndex = index
    },
    random() {
      let list =
        this.currentShowIndex === 0 ? this.favoriteList : this.playHistory
      if (list === length) {
        return
      }
      list = list.map(item => {
        return new Song(item)
      })
      this.randomPlay({ list })
    },
    back() {
      this.$router.back()
    },
    ...mapActions(['insertSong', 'randomPlay'])
  },
  components: {
    Switches,
    ScrollView,
    SongList,
    NoResult
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.user-center
  position fixed
  top 0
  bottom 0
  z-index 100
  width 100%
  background $color-background
  &.slide-enter-active, &.slide-leave-active
    transition all 0.3s
  &.slide-enter, &.slide-leave-to
    transform translate3d(100%, 0, 0)
  .back
    position absolute
    top 5px
    left 6px
    z-index 50
    .icon-back
      display block
      padding 10px
      font-size $font-size-large-x
      color $color-theme
  .switches-wrapper
    margin 10px 0 30px 0
  .play-btn
    box-sizing border-box
    width 135px
    padding 7px 0
    margin 0 auto
    text-align center
    border 1px solid $color-text-l
    color $color-text-l
    border-radius 100px
    font-size 0
    .icon-play
      display inline-block
      vertical-align middle
      margin-right 6px
      font-size $font-size-medium-x
    .text
      display inline-block
      vertical-align middle
      font-size $font-size-small
  .list-wrapper
    position absolute
    top 110px
    bottom 0
    width 100%
    .list-scroll
      height 100%
      overflow hidden
      .list-inner
        padding 20px 30px
  .no-result-wrapper
    position absolute
    width 100%
    top 50%
    transform translateY(-50%)
</style>
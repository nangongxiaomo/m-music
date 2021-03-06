<template>
  <transition name="slide">
    <div class="add-song" v-show="showFlag" @click.stop>
      <div class="header">
        <h1 class="title">添加歌曲到列表</h1>
        <div class="close" @click="hide">
          <i class="icon-close"></i>
        </div>
      </div>
      <div class="search-box-wrapper">
        <search-box ref="searchBox" place-holder="搜索歌曲" @query="onQueryChange"></search-box>
      </div>
      <div class="shortcut" v-show="!query">
        <switches @switch="switchItem" :currentShowIndex="currentShowIndex" :switches="switches"></switches>
        <div class="list-wrapper">
          <scroll-view
            ref="scroll"
            class="list-scroll"
            :data="playHistory"
            v-if="currentShowIndex === 0"
          >
            <div class="list-inner">
              <song-list :songs="playHistory" @handleClick="selectSong"></song-list>
            </div>
          </scroll-view>
          <scroll-view
            ref="scrollSearch"
            v-if="currentShowIndex === 1"
            class="list-scroll"
            :data="searchHistory"
          >
            <div class="list-inner">
              <search-list
                :searches="searchHistory"
                @deleteOne="deleteSearchHistory"
                @select="addQuery"
              ></search-list>
            </div>
          </scroll-view>
        </div>
      </div>
      <div class="search-result" v-show="query">
        <suggest
          @listenScroll="blurInput"
          :showSinger="showSingerFalse"
          :query="query"
          @select="selectSuggest"
        ></suggest>
      </div>
      <top-tip ref="topTip">
        <div class="tip-title">
          <i class="icon-ok"></i>
          <span class="text">歌曲已添加进队列</span>
        </div>
      </top-tip>
    </div>
  </transition>
</template>

<script>
import ScrollView from 'base/scroll-view/scroll-view'
import SearchBox from 'base/search-box/search-box'
import Suggest from 'views/suggest/suggest'
import Switches from 'base/switches/switches'
import SongList from 'base/song-list/song-list'
import SearchList from 'base/search-list/search-list'
import TopTip from 'base/top-tip/top-tip'
import Song from 'common/js/Song'
import { searchMixin } from 'common/js/mixin'
import { mapGetters, mapActions } from 'vuex'
export default {
  mixins: [searchMixin],
  data() {
    return {
      showFlag: false,
      showSingerFalse: false,
      currentShowIndex: 0,
      switches: ['最近播放', '搜索历史']
    }
  },
  computed: {
    ...mapGetters(['playHistory', 'searchHistory'])
  },
  methods: {
    show() {
      this.showFlag = true
      this.$nextTick(() => {
        if (this.currentShowIndex === 0) {
          this.$refs.scroll.refresh()
        } else {
          this.$refs.scrollSearch.refresh()
        }
      })
    },
    hide() {
      this.showFlag = false
    },
    switchItem(index) {
      this.currentShowIndex = index
    },
    selectSuggest() {
      this.saveHistory(this.query)
      this.$refs.topTip.show()
    },
    selectSong(song, index) {
      if (index !== 0) {
        this.insertSong(new Song(song))
      }
      this.$refs.topTip.show()
    },
    ...mapActions(['insertSong'])
  },

  components: {
    SearchBox,
    Suggest,
    Switches,
    ScrollView,
    SongList,
    SearchList,
    TopTip
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.add-song
  position fixed
  top 0
  bottom 0
  width 100%
  z-index 200
  background $color-background
  &.slide-enter-active, &.slide-leave-active
    transition all 0.3s
  &.slide-enter, &.slide-leave-to
    transform translate3d(100%, 0, 0)
  .header
    position relative
    height 44px
    text-align center
    .title
      line-height 44px
      font-size $font-size-large
      color $color-text
    .close
      position absolute
      top 0
      right 8px
      .icon-close
        display block
        padding 12px
        font-size 20px
        color $color-theme
  .search-box-wrapper
    margin 20px
  .shortcut
    .list-wrapper
      position absolute
      top 165px
      bottom 0
      width 100%
      .list-scroll
        height 100%
        overflow hidden
        .list-inner
          padding 20px 30px
  .search-result
    position fixed
    top 124px
    bottom 0
    width 100%
  .tip-title
    text-align center
    padding 18px 0
    font-size 0
    .icon-ok
      font-size $font-size-medium
      color $color-theme
      margin-right 4px
    .text
      font-size $font-size-medium
      color $color-text
</style>
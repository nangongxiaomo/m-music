<template>
  <div class="search">
    <div class="search-box-wrapper">
      <search-box @query="onQueryChange" ref="searchBox"></search-box>
    </div>
    <div class="shortcut-wrapper" ref="shorcutWrapper" v-show="!query">
      <scroll-view :data="shortCut" ref="shortcut" class="shortcut">
        <div>
          <div class="hot-key">
            <h1 class="title">热门搜索</h1>
            <ul>
              <li
                @click="addQuery(item.k)"
                class="item"
                v-for="(item, index) of hotKeyList"
                :key="index"
              >
                <span v-html="item.k"></span>
              </li>
            </ul>
          </div>
          <div class="search-history" v-show="searchHistory.length">
            <h1 class="title">
              <span class="text">搜索历史</span>
              <span class="clear" @click="showComfirm">
                <i class="icon-clear"></i>
              </span>
            </h1>
            <search-list
              @handleClick="addQuery"
              @deleteOne="deleteSearchHistory"
              :searches="searchHistory"
            ></search-list>
          </div>
        </div>
      </scroll-view>
    </div>
    <div class="search-result" ref="searchResult" v-show="query">
      <suggest @select="saveSearch" @listScroll="blurInput" ref="suggest" :query="query"></suggest>
    </div>
    <comfirm
      @comfirm="clearSearchHistory"
      ref="comfirm"
      text="确定清空历史吗"
      cancelBtnText="取消"
      confirmBtnText="删除"
    ></comfirm>
    <router-view></router-view>
  </div>
</template>

<script>
import SearchBox from 'base/search-box/search-box'
import SearchList from 'base/search-list/search-list'
import ScrollView from 'base/scroll-view/scroll-view'
import Comfirm from 'base/comfirm/comfirm'
import { getHotKey } from 'api/search'
import { ERR_OK } from 'api/config'
import Suggest from 'views/suggest/suggest'
import { playListMixin, searchMixin } from 'common/js/mixin'
import { mapActions } from 'vuex'

export default {
  mixins: [playListMixin, searchMixin],
  created() {
    this._getHotKey()
  },
  data() {
    return {
      hotKeyList: []
    }
  },
  computed: {
    shortCut() {
      return this.hotKeyList.concat(this.searchHistory)
    }
  },
  methods: {
    //mixin内定义的方法
    handlePlayList(playList) {
      const bottom = playList.length > 0 ? '60px' : ''
      this.$refs.searchResult.style.bottom = bottom
      this.$refs.shorcutWrapper.style.bottom = bottom
      this.$refs.suggest.refresh()
    },

    showComfirm() {
      this.$refs.comfirm.show()
    },

    _getHotKey() {
      getHotKey().then(res => {
        if (res.code === ERR_OK) {
          this.hotKeyList = res.data.hotkey.slice(0, 10)
        }
      })
    },
    ...mapActions(['clearSearchHistory'])
  },
  watch: {
    query(newQuery) {
      if (!newQuery) {
        setTimeout(() => {
          this.$refs.shortcut.refresh()
        }, 20)
      }
    }
  },
  components: {
    SearchBox,
    Suggest,
    SearchList,
    Comfirm,
    ScrollView
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.search
  .search-box-wrapper
    margin 20px
  .shortcut-wrapper
    position absolute
    top 178px
    bottom 0
    width 100%
    .shortcut
      height 100%
      overflow hidden
      .hot-key
        margin 0 20px 20px 20px
        .title
          margin-bottom 20px
          font-size $font-size-medium
          color $color-text-l
        .item
          display inline-block
          padding 5px 10px
          margin 0 20px 10px 0
          border-radius 6px
          background $color-highlight-background
          font-size $font-size-medium
          color $color-text-d
      .search-history
        position relative
        margin 0 20px
        .title
          display flex
          align-items center
          height 40px
          font-size $font-size-medium
          color $color-text-l
          .text
            flex 1
          .clear
            extend-click()
            .icon-clear
              font-size $font-size-medium
              color $color-text-d
  .search-result
    position fixed
    width 100%
    top 178px
    bottom 0
</style>
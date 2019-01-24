<template>
  <scroll-view
    ref="suggest"
    :data="result"
    class="suggest"
    :pullUp="pullUp"
    :beforeScroll="beforesScroll"
    @scrollToEnd="searchMore"
    @beforeScroll="beforeScroll"
  >
    <ul class="suggest-list">
      <li
        class="suggest-item"
        @click="selectItem(item)"
        v-for="(item, index) of result"
        :key="index"
      >
        <div class="icon">
          <i :class="getIconCls(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
      <loading v-show="hasMore" title></loading>
    </ul>
    <div class="no-result-wrapper" v-show="!hasMore && !result.length">
      <no-result :title="noResult"></no-result>
    </div>
  </scroll-view>
</template>

<script>
import ScrollView from 'base/scroll-view/scroll-view'
import { search } from 'api/search'
import Loading from 'base/loading/loading'
import NoResult from 'base/no-result/no-result'
import { createSong, isValidMusic, processSongsUrl } from 'common/js/Song'
import { ERR_OK } from 'api/config'
import Singer from 'common/js/Singer'
import { mapMutations, mapActions } from 'vuex'

const SINGER = 'singer'
const perpage = 20 //控制请求数据返回的长度

export default {
  props: {
    query: {
      type: String,
      default: ''
    },
    showSinger: {
      type: Boolean,
      default: true
    }
  },
  created() {
    this.noResult = '换个关键词试试~'
  },
  data() {
    return {
      page: 1,
      result: [],
      pullUp: true,
      beforesScroll: true,
      hasMore: true
    }
  },
  methods: {
    refresh() {
      this.$refs.suggest.refresh()
    },
    beforeScroll() {
      this.$emit('listScroll')
    },
    selectItem(item) {
      if (item.type === SINGER) {
        const singer = new Singer({
          id: item.singermid,
          name: item.name
        })
        this.$router.push(`/search/${singer.id}`)
        this.singer(singer)
      } else {
        this.insertSong(item)
      }
      this.$emit('select')
    },
    getDisplayName(item) {
      if (item.type === SINGER) {
        return item.singername
      } else {
        return `${item.name}-${item.singer}`
      }
    },
    getIconCls(type) {
      if (type.type === SINGER) {
        return 'icon-mine'
      } else {
        return 'icon-music'
      }
    },
    _search() {
      this.hasMore = true
      this.page = 1
      this.$refs.suggest.scrollTo(0, 0)
      search(this.query, this.page, this.showSinger, perpage).then(res => {
        if (res.code === ERR_OK) {
          this._genResult(res.data).then(result => {
            this.result = result
          })
          this._checkMore(res.data)
        }
      })
    },
    searchMore() {
      if (!this.hasMore) {
        return
      }
      this.page++
      search(this.query, this.page, this.showSinger, perpage).then(res => {
        if (res.code === ERR_OK) {
          this._genResult(res.data).then(result => {
            this.result = this.result.concat(result)
          })
          this._checkMore(res.data)
        }
      })
    },
    _checkMore(data) {
      const song = data.song
      if (
        !song.list.length ||
        song.curnum + song.curpage * perpage > song.totalnum
      ) {
        this.hasMore = false
      }
    },
    _genResult(data) {
      let ret = []
      if (data.zhida && data.zhida.singerid && this.page === 1) {
        ret.push({ ...data.zhida, ...{ type: SINGER } })
      }
      return processSongsUrl(this._normalizeSongs(data.song.list)).then(
        songs => {
          ret = ret.concat(songs)
          return ret
        }
      )

      return ret
    },
    _normalizeSongs(list) {
      let ret = []
      list.forEach(musicData => {
        if (isValidMusic(musicData)) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    },
    ...mapMutations({
      singer: 'SET_SINGER'
    }),
    ...mapActions(['insertSong'])
  },
  components: {
    ScrollView,
    Loading,
    NoResult
  },
  watch: {
    query() {
      this._search()
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.suggest
  height 100%
  overflow hidden
  .suggest-list
    padding 0 30px
    .suggest-item
      display flex
      align-items center
      padding-bottom 20px
    .icon
      flex 0 0 30px
      width 30px
      [class^='icon-']
        font-size 14px
        color $color-text-d
    .name
      flex 1
      font-size $font-size-medium
      color $color-text-d
      overflow hidden
      .text
        no-wrap()
  .no-result-wrapper
    position absolute
    width 100%
    top 50%
    transform translateY(-50%)
</style>
<template>
  <div class="recommend" ref="recommend">
    <scroll-view :data="discList" class="recommend-content" ref="scroll">
      <div>
        <div class="slider-wrapper" v-if="slider.length">
          <slider>
            <div :key="item.id" v-for="item of slider">
              <a :href="item.linkUrl">
                <img :src="item.picUrl" @load="loadImage" alt="slider">
              </a>
            </div>
          </slider>
        </div>
        <h1 class="hot-title">热门推荐</h1>
        <ul>
          <li :key="item.dissid" @click="clickItem(item)" class="item" v-for="item in discList">
            <div class="icon">
              <img height="60" v-lazy="item.imgurl" width="60">
            </div>
            <div class="text">
              <h2 class="name" v-html="item.creator.name"></h2>
              <p class="desc" v-html="item.dissname"></p>
            </div>
          </li>
        </ul>
      </div>
      <div class="loading-container" v-show="!discList.length">
        <loading></loading>
      </div>
    </scroll-view>
    <router-view></router-view>
  </div>
</template>

<script>
import Slider from 'base/slider/slider'
import ScrollView from 'base/scroll-view/scroll-view'
import Loading from 'base/loading/loading'
import { getRecommend, getDiscList } from 'api/recommend'
import { ERR_OK } from 'api/config'
import { playListMixin } from 'common/js/mixin'
import { mapMutations } from 'vuex'

export default {
  mixins: [playListMixin],
  data() {
    return {
      slider: [],
      discList: []
    }
  },
  created() {
    this._getRecommendSlider() //获取轮播图
    this._getDiscList() //获取歌单列表
  },
  methods: {
    //mixin内定义的方法
    handlePlayList(playList) {
      const bottom = playList.length > 0 ? '60px' : ''
      this.$refs.recommend.style.bottom = bottom
      this.$refs.scroll.refresh()
    },
    _getRecommendSlider() {
      getRecommend().then(res => {
        if (res.code === ERR_OK) {
          this.slider = res.data.slider
        }
      })
    },
    _getDiscList() {
      getDiscList().then(res => {
        if (res.code === ERR_OK) {
          this.discList = res.data.list
        }
      })
    },
    loadImage() {
      if (!this.checkLoading) {
        this.$refs.scroll.refresh()
      }
    },
    clickItem(item) {
      this.$router.push(`/recommend/${item.dissid}`)
      this.setDisc(item)
    },
    ...mapMutations({
      setDisc: 'SET_DISC'
    })
  },
  components: {
    Slider,
    ScrollView,
    Loading
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
.recommend
  position fixed
  width 100%
  top 88px
  bottom 0
  .recommend-content
    height 100%
    overflow hidden
    .slider-wrapper
      position relative
      width 100%
      height 0
      padding-bottom 40%
      overflow hidden
      .slider-content
        position absolute
        top 0
        left 0
        width 100%
        height 100%
    .hot-title
      color $color-theme
      font-size $font-size-medium-x
      text-align center
      height 60px
      line-height 60px
    .item
      display flex
      box-sizing border-box
      align-items center
      padding 0 20px 20px 20px
      .icon
        flex 0 0 60px
        width 60px
        padding-right 20px
        img
          border-radius 2px
      .text
        display flex
        flex-direction column
        justify-content center
        flex 1
        line-height 20px
        overflow hidden
        font-size $font-size-medium
        .name
          margin-bottom 10px
          color $color-text
        .desc
          color $color-text-d
    .loading-container
      position absolute
      width 100%
      top 50%
      transform translateY(-50%)
</style>

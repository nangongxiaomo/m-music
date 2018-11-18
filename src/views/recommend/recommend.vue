<template>
  <div class="recommend">
    <div class="recommend-content">
      <div v-if="slider.length" class="slider-wrapper">
        <slider>
          <div v-for="item of slider" :key="item.id">
            <a :href="item.linkUrl">
              <img :src="item.picUrl" alt="slider">
            </a>
          </div>
        </slider>
      </div>
    </div>
  </div>
</template>

<script>
import Slider from 'base/slider/slider'
import { getRecommend } from 'api/recommend'
import { ERR_OK } from 'api/config'
export default {
  data() {
    return {
      slider: []
    }
  },
  created() {
    this._getRecommend()
  },
  methods: {
    _getRecommend() {
      getRecommend().then(res => {
        if (res.code === ERR_OK) {
          this.slider = res.data.slider
        }
      })
    }
  },
  components: {
    Slider
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable';

.recommend {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;

  .recommend-content {
    height: 100%;
    overflow: hidden;

    .slider-wrapper {
      position: relative;
      width: 100%;
      height: 0;
      padding-bottom: 40%;
      overflow: hidden;

      .slider-content {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }

    
  }
}
</style>

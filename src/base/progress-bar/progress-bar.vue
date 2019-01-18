<template>
  <div class="progress-bar" ref="progressBar" @click="progressClick">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div
        class="progress-btn-wrapper"
        ref="progressBtn"
        @touchstart.prevent="handleTouchStart"
        @touchmove.prevent="handleTouchMove"
        @touchend.prevent="handleTouchEnd"
      >
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    persent: {
      type: Number,
      default: 0
    }
  },
  created() {
    this.touch = {}
  },
  methods: {
    progressClick(e) {
      const rect = this.$refs.progressBar.getBoundingClientRect()
      const OffsetWidth = e.pageX - rect.left
      this._offSet(OffsetWidth)
      this._triggerPersent()
    },
    handleTouchStart(e) {
      this.touch.initial = true
      this.touch.startX = e.touches[0].pageX
      this.touch.left = this.$refs.progress.clientWidth
    },
    handleTouchMove(e) {
      if (!this.touch.initial) {
        return
      }
      const deltaX = e.touches[0].pageX - this.touch.startX
      const offsetWidth = Math.min(
        this.$refs.progressBar.clientWidth - 16,
        Math.max(0, this.touch.left + deltaX)
      )
      this._offSet(offsetWidth)
    },
    handleTouchEnd() {
      this.touch.initial = false
      this._triggerPersent()
    },
    _triggerPersent() {
      const barWidth = this.$refs.progressBar.clientWidth - 16
      const percent = this.$refs.progress.clientWidth / barWidth
      this.$emit('persentChange', percent)
    },
    _offSet(offsetWidth) {
      this.$refs.progress.style.width = `${offsetWidth}px`
      this.$refs.progressBtn.style.transform = `translate3d(${offsetWidth}px,0,0)`
    }
  },
  watch: {
    persent(newpersent) {
      if (newpersent >= 0 && !this.touch.initial) {
        const barWidth = this.$refs.progressBar.clientWidth - 16 //进度条的宽度,小球的宽为16 所以减去16
        const offsetWidth = newpersent * barWidth //传进来的persent乘以barWidth就是偏移的位置
        this._offSet(offsetWidth)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
.progress-bar
  height 30px
  .bar-inner
    position relative
    top 13px
    height 4px
    background rgba(0, 0, 0, 0.3)
    .progress
      position absolute
      height 100%
      background $color-theme
    .progress-btn-wrapper
      position absolute
      left -8px
      top -13px
      width 30px
      height 30px
      .progress-btn
        position relative
        top 7px
        left 7px
        box-sizing border-box
        width 16px
        height 16px
        border 3px solid $color-text
        border-radius 50%
        background $color-theme
</style>
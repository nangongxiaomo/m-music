<template>
  <div class="router-transition">
    <transition :name="transitionName">
      <slot></slot>
    </transition>
  </div>
</template>

<script>
const MAX_DIFF = 50
export default {
  props: {
    routerPath: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      transitionName: 'transitionLeft',
      currentPath: '',
      currentIndex: 0,
      touches: {}
    }
  },
  mounted() {
    this.currentPath = this.$route.path
    this.initTouch()
  },
  methods: {
    handleTouchStart(e) {
      const touches = e.touches[0]
      this.touches.startX = touches.pageX
      this.touches.startY = touches.pageY
    },

    handleTouchEnd(e) {
      e.preventDefault()
      const touches = e.changedTouches[0]
      this.touches.endX = touches.pageX
      this.touches.endY = touches.pageY
      const diffX = this.touches.endX - this.touches.startX
      const diffY = this.touches.endY - this.touches.startY
      const diff_X_Y = Math.abs(diffX) > Math.abs(diffY)
      const routeLen = this.routerPath.length
      this.routerPath.forEach((item, index) => {
        if (item.path === this.currentPath) {
          this.currentIndex = index
        }
      })
      if (diff_X_Y && diffX > MAX_DIFF && this.currentIndex > 0) {
        this.transitionName = 'transitionRight'
        this.$router.push(this.routerPath[this.currentIndex - 1].path)
      } else if (
        diff_X_Y &&
        diffX < -MAX_DIFF &&
        this.currentIndex < routeLen - 1
      ) {
        this.transitionName = 'transitionLeft'
        this.$router.push(this.routerPath[this.currentIndex + 1].path)
      }
    },
    initTouch() {
      this.$el.addEventListener('touchstart', this.handleTouchStart)
      this.$el.addEventListener('touchend', this.handleTouchEnd)
    }
  },
  watch: {
    $route(to, from) {
      const routes = this.$router.options.routes
      const arr = []
      routes.forEach(item => {
        arr.push(item.path)
      })
      const compare = arr.indexOf(to.path) > arr.indexOf(from.path)
      this.transitionName = compare ? 'transitionLeft' : 'transitionRight'
      this.currentPath = to.path
    }
  }
}
</script>

<style lang="stylus" scoped>
.router-transition>div
  transition all 0.3s ease
.transitionLeft-enter, .transitionRight-leave-active
  transform translate3d(100%, 0, 0)
.transitionRight-enter, .transitionLeft-leave-active
  transform translate3d(-100%, 0, 0)
</style>
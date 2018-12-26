<template>
  <div id="app">
    <m-header></m-header>
    <m-tabs></m-tabs>
    <transition :name="transitionName">
      <keep-alive>
        <router-view
          @touchstart.native="handleTouchStart"
          @touchmove.native="handleTouchMove"
          @touchend.native="handleTouchEnd"
          class="transitions"
        ></router-view>
      </keep-alive>
    </transition>
  </div>
</template>
<script>
import MHeader from 'base/header/mheader'
import MTabs from 'views/tabs/tabs'
const MAX_DIFF = 50
export default {
  data() {
    return {
      transitionName: 'transitionLeft',
      currentPath: '',
      currentIndex: 0,
      touches: {},
      routesList: [
        {
          path: '/'
        },
        {
          path: '/recommend'
        },
        {
          path: '/singer'
        },
        {
          path: '/rank'
        }
      ]
    }
  },
  created() {
    this.currentPath = this.$route.path
  },
  methods: {
    handleTouchStart(e) {
      const touches = e.touches[0]
      this.touches.startX = touches.pageX
      this.touches.startY = touches.pageY
    },
    handleTouchMove(e) {
      const touches = e.touches[0]
      this.touches.endX = touches.pageX
      this.touches.endY = touches.pageY
    },
    handleTouchEnd(e) {
      const diffX = this.touches.endX - this.touches.startX
      const diffY = this.touches.endY - this.touches.startY
      const diff_X_Y = Math.abs(diffX) > Math.abs(diffY)
      const routeLen = this.routesList.length
      this.routesList.forEach((item, index) => {
        if (item.path === this.currentPath) {
          this.currentIndex = index
        }
      })
      if (diff_X_Y && diffX > MAX_DIFF && this.currentIndex > 0) {
        this.transitionName = 'transitionRight'
        this.$router.push(this.routesList[this.currentIndex - 1].path)
      } else if (
        diff_X_Y &&
        diffX < -MAX_DIFF &&
        this.currentIndex < routeLen - 1
      ) {
        this.transitionName = 'transitionLeft'
        this.$router.push(this.routesList[this.currentIndex + 1].path)
      }
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
  },
  components: {
    MHeader,
    MTabs
  }
}
</script>
<style lang="stylus" scoped>
.transitions
  transition all 0.3s ease
.transitionLeft-enter, .transitionRight-leave-active
  transform translate3d(100%, 0, 0)
.transitionRight-enter, .transitionLeft-leave-active
  transform translate3d(-100%, 0, 0)
</style>

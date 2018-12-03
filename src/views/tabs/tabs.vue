<template>
  <div class="tabs">
    <router-link tag="div" to="/recommend" class="tab-item">推荐</router-link>
    <router-link tag="div" to="/singer" class="tab-item">歌手</router-link>
    <router-link tag="div" to="/rank" class="tab-item">排行</router-link>
    <router-link tag="div" to="/search" class="tab-item">搜索</router-link>
  </div>
</template>

<script>
export default {};
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
.tabs
  height 45px
  padding 0 20px
  display flex
  justify-content space-between
  align-items center
  .tab-item
    padding-bottom 5px
    color $color-text-l
    &.router-link-active
      border-bottom 2px solid $color-theme
      color $color-theme
</style>
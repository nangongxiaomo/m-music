<template>
  <div class="header">
    <div class="center-head">
      <div class="icon"></div>
      <span class="title">酷听音乐</span>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.header
  height 45px
  position relative
  display flex
  align-items center
  justify-content center
  color #ffcd32
  .center-head
    display flex
    align-items center
    justify-content center
    .icon
      width 35px
      height 32px
      // bg-image('logo')
      background url('../../common/image/default.png') no-repeat center center
      background-size cover
    .title
      display inline-block
      height 45px
      line-height 45px
      padding-left 10px
</style>

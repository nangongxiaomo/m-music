<template>
  <div class="header">
    <div class="center-head">
      <div class="icon"></div>
      <span class="title">Chicken Music</span>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable';
@import '~common/stylus/mixin';

.header {
  height: 45px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffcd32;

  .center-head {
    display: flex;
    align-items: center; 
    justify-content: center;

    .icon {
      width: 30px;
      height: 32px;
      bg-image('logo');
      background-size: cover;
    }
    .title{
      display: inline-block;
      height: 45px;
      line-height: 45px; 
      padding-left: 10px;
    }
  }
}
</style>

<template>
  <div class="search-box">
    <i class="icon-search"></i>
    <input ref="query" :placeholder="placeHolder" type="text" v-model="query" class="box">
    <i @click="clear" class="icon-dismiss" v-show="query"></i>
  </div>
</template>

<script>
import { debounce } from 'common/js/utils'
export default {
  props: {
    placeHolder: {
      type: String,
      default: '输入歌曲或歌手'
    }
  },
  data() {
    return {
      query: ''
    }
  },
  created() {
    this.$watch(
      'query',
      debounce(newQuery => {
        this.$emit('query', newQuery)
      }, 200)
    )
  },
  methods: {
    clear() {
      this.query = ''
    },
    setQuery(key) {
      this.query = key
    },
    blur() {
      this.$refs.query.blur()
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
.search-box
  display flex
  align-items center
  box-sizing border-box
  width 100%
  padding 0 6px
  height 40px
  background $color-highlight-background
  border-radius 6px
  .icon-search
    font-size 24px
    color $color-background
  .box
    flex 1
    margin 0 5px
    line-height 18px
    background $color-highlight-background
    color $color-text
    font-size $font-size-medium
    outline 0
    &::placeholder
      color $color-text-d
  .icon-dismiss
    font-size 16px
    color $color-background
</style>
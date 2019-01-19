import { mapGetters } from 'vuex'

export const playListMixin = {
  computed: {
    ...mapGetters(['playList'])
  },
  mounted() {
    this.handlePlayList(this.playList)
  },
  activated() {
    this.handlePlayList(this.playList)
  },
  methods: {
    handlePlayList() {
      throw new Error('请在组件中定义handlePlayList方法')
    }
  },
  watch: {
    playList(newVal) {
      this.handlePlayList(newVal)
    }
  }
}

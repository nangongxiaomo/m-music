import { mapGetters, mapMutations, mapActions } from 'vuex'
import { playMode } from 'common/js/config'
import { shuffle } from 'common/js/utils'

export const playListMixin = {
  computed: {
    ...mapGetters(['sequenceList', 'currentSong', 'playList', 'mode'])
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

export const playerMixin = {
  computed: {
    iconMode() {
      return this.mode === playMode.sequence ? 'icon-sequence' : this.mode === playMode.loop ? 'icon-loop' : 'icon-random'
    },
    ...mapGetters(['sequenceList', 'currentSong', 'playList', 'mode', 'favoriteList'])
  },
  methods: {
    changeMode() {
      const mode = (this.mode + 1) % 3
      this.setPlayMode(mode)
      if (mode === playMode.random) {
        shuffle(this.sequenceList)
      } else {
        this.setPlayList(this.sequenceList)
        this._resetCurrentIndex(this.sequenceList)
      }
    },
    _resetCurrentIndex(list) {
      let index = list.findIndex(item => {
        return item.id === this.currentSong.id
      })
      this.setCurrentIndex(index)
    },
    getFavoriteIcon(song) {
      if (this.isFavorite(song)) {
        return 'icon-favorite'
      } else {
        return 'icon-not-favorite'
      }
    },
    toggleFavorite(song) {
      if (this.isFavorite(song)) {
        this.deleteFavoriteList(song)
      } else {
        this.saveFavoriteList(song)
      }
    },
    isFavorite(song) {
      const index = this.favoriteList.findIndex(item => {
        return item.id === song.id
      })
      return index > -1
    },
    ...mapActions(['saveFavoriteList', 'deleteFavoriteList']),
    ...mapMutations({
      setPlayState: 'SET_PLAYING_STATE',
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setPlayMode: 'SET_PLAY_MODE',
      setPlayList: 'SET_PLAYLIST'
    })
  }
}

export const searchMixin = {
  computed: {
    ...mapGetters(['searchHistory'])
  },
  data() {
    return {
      query: ''
    }
  },
  methods: {
    blurInput() {
      this.$refs.searchBox.blur()
    },
    saveSearch() {
      this.saveHistory(this.query)
    },
    onQueryChange(query) {
      this.query = query.trim()
    },
    addQuery(key) {
      this.$refs.searchBox.setQuery(key)
    },
    ...mapActions(['saveHistory', 'deleteSearchHistory'])
  }
}

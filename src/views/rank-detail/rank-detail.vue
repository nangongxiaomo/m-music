<template>
  <transition name="slide">
    <music-list :rank="rank" :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script>
import MusicList from 'views/music-list/music-list'
import { mapGetters } from 'vuex'
import { getMusicList } from 'api/rank'
import { ERR_OK } from 'api/config'
import { createSong, isValidMusic, processSongsUrl } from 'common/js/Song'

export default {
  computed: {
    title() {
      return this.topList.topTitle
    },
    bgImage() {
      if (this.songs.length) {
        return this.songs[0].image
      }
    },
    ...mapGetters(['topList'])
  },
  created() {
    this._getTopList()
  },
  data() {
    return {
      songs: [],
      rank: true
    }
  },
  methods: {
    _getTopList() {
      if (!this.topList.id) {
        this.$router.push(`/rank`)
        return
      }
      getMusicList(this.topList.id)
        .then(res => {
          if (res.code === ERR_OK) {
            processSongsUrl(this._normalizeTopList(res.songlist)).then(
              songs => {
                this.songs = songs
              }
            )
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    _normalizeTopList(list) {
      let ret = []
      list.forEach(item => {
        const listData = item.data
        if (isValidMusic(listData)) {
          ret.push(createSong(listData))
        }
      })
      return ret
    }
  },
  components: {
    MusicList
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
.slide-enter-active, .slide-leave-active
  transition all 0.3s
.slide-enter, .slide-leave-to
  transform translate3d(100%, 0, 0)
</style>
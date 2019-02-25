<template>
  <transition name="slide">
    <music-list :title="title" :bgImage="bgImage" :songs="songs" :rank="rank"></music-list>
  </transition>
</template>

<script>
import MusicList from 'components/music-list/music-list'
import {mapGetters} from 'vuex'
import {ERR_OK} from 'api/config'
import {getMusicList} from 'api/rank'
import {createSong, isValidMusic} from 'common/js/song'
import {getSongUrl} from 'api/singer'
export default {
  computed: {
    title () {
      return this.topList.topTitle
    },
    bgImage () {
      return this.topList.picUrl
    },
    ...mapGetters([
      'topList'
    ])
  },
  created () {
    this._getMusicList()
  },
  data () {
    return {
      songs: [],
      rank: true
    }
  },
  methods: {
    _getMusicList () {
      if (!this.topList.id) {
        this.$router.push('/rank')
        return
      }
      getMusicList(this.topList.id).then((res) => {
        if (res.code === ERR_OK) {
          this.songs = this._normalizeSongs(res.songlist)
        }
      })
    },
    _normalizeSongs (list) {
      let ret = []
      list.forEach((item) => {
        const musicData = item.data
        if (isValidMusic(musicData)) {
          getSongUrl(musicData.songmid).then((res) => {
            const spurl = res.midurlinfo[0].purl
            ret.push(createSong(musicData, spurl))
          })
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

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s ease

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>

<template>
  <div>
    <img v-bind:src="weatherMap" height="300" width="300">
  </div>
</template>
<script>
import moment from 'moment'
export default {
  data () {
    return{
      weatherMap: null,
      lat: '34.0534037',
      lon: '134.5497742',
      zoom: '12',
      width: '500',
      height: '500'
      }
  },
   mounted () {
    this.reload()
    setInterval(() => {
      this.reload()
    }, 60000)
  },
  methods: {
    reload: async function() {
      var now = await moment().format('YYYYMMHHmm')
      this.weatherMap = 'https://map.yahooapis.jp/map/V1/static?appid=dj0zaiZpPXVZaDlrczVieXNFYSZzPWNvbnN1bWVyc2VjcmV0Jng9ZGE-&lat=' + this.lat + '&lon=' + this.lon + '&z=' + this.zoom + '&width=' + this.width + '&height=' + this.height + '&mode=map&overlay=type:rainfall|date:' + now + '|datelabel:on&output=jpeg'
    }
  }
}
</script>
<style scoped>
</style>

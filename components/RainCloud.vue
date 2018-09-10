<template>
  <div>
    <img v-bind:src="weatherMap">
  </div>
</template>
<script>
import moment from 'moment'
export default {
  data () {
    return{
      weatherMap: null
      }
  },
   mounted () {
    this.reload()
    setInterval(() => {
      this.reload()
    }, 120000)
  },
  methods: {
    reload: async function() {
      var now = await moment().format('YYYYMMHHmm')
      const lat = '35.632789'
      const lon = '139.294293'
      const z = '15'
      var width = 'undefind'
      var height = 'undefind'
      this.weatherMap = 'https://map.yahooapis.jp/map/V1/static?appid=dj0zaiZpPXVZaDlrczVieXNFYSZzPWNvbnN1bWVyc2VjcmV0Jng9ZGE-&lat=' + lat + '&lon=' + lon + '&z=' + z + '&width=' + width + '&height=' + height + '&mode=map&overlay=type:rainfall|date:' + now + '|datelabel:on&output=jpeg'
    }
  }
}
</script>
<style scoped>
</style>

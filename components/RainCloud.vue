<template>
  <div>
    <img v-bind:src="weatherMap">
    <button @click="reload()">reload</button>
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
  methods: {
    reload: async function () {
      const lat = '35.632789'
      const lon = '139.294293'
      const z = '15'
      var width = 'undefind'
      var height = 'undefind'
      var now = await this.getTime()
      this.weatherMap = 'https://map.yahooapis.jp/map/V1/static?appid=dj0zaiZpPXVZaDlrczVieXNFYSZzPWNvbnN1bWVyc2VjcmV0Jng9ZGE-&lat=' + lat + '&lon=' + lon + '&z=' + z + '&width=' + width + '&height=' + height + '&mode=map&overlay=type:rainfall|date:' + now + '|datelabel:on&output=jpeg'
    },
    getTime: function () {
      var now = moment()
      return now.format('YYYYMMHHmm')
    }
  }
}
</script>
<style scoped>
</style>

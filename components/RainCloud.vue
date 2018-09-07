<template>
  <div>
    <img v-bind:src="weatherMap">
    <button @click="reload()">reload</button>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return{
      weatherMap: 'https://map.yahooapis.jp/map/V1/static?appid=dj0zaiZpPXVZaDlrczVieXNFYSZzPWNvbnN1bWVyc2VjcmV0Jng9ZGE-&lat=35.632789&lon=139.294293&z=15&width=undefined&height=undefined&mode=map&overlay=type:rainfall|date:201809071032|datelabel:on&output=jpeg'
      }
  },
  methods: {
    reload: async function () {
      const lat = '35.632789'
      const lon = '139.294293'
      const z = '15'
      var width = 'undefind'
      var height = 'undefind'
      var year, month, day, hour, minute
      await this.getTime(year, month, day, hour, minute)
      this.weatherMap = 'https://map.yahooapis.jp/map/V1/static?appid=dj0zaiZpPXVZaDlrczVieXNFYSZzPWNvbnN1bWVyc2VjcmV0Jng9ZGE-&lat=' + lat + '&lon=' + lon + '&z=' + z + '&width=' + width + '&height=' + height + '&mode=map&overlay=type:rainfall|date:' + year + month + day + hour + minute + '|datelabel:on&output=jpeg'
    },
    getTime: function(Year, Month, Day, Hour, Minute) {
      var now = new Date()
      Year = String(this.alignment(now.getFullYear()))
      Month = String(this.alignment(now.getMonth() + 1))
      Day = String(this.alignment(now.getDate()))
      Hour = String(this.alignment(now.getHours()))
      Minute = String(this.alignment(now.getMinutes()))
    },
    alignment: function(number){
        if (number < 10) {
            number = "0" + number
        }
        return number
    }
  }
}
</script>
<style scoped>
</style>

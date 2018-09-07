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
      weatherMap: "https://map.yahooapis.jp/map/V1/static?appid=dj0zaiZpPXVZaDlrczVieXNFYSZzPWNvbnN1bWVyc2VjcmV0Jng9ZGE-&lat=35.632789&lon=139.294293&z=15&width=undefined&height=undefined&mode=map&overlay=type:rainfall"
    }
  },
  methods: {
    reload() {
      axios.get('http://localhost:3000/api/yolp')
      // , {headers: {'Content-Type': 'image/jpeg'}}
      .then(res => (console.log(res.data)))
    }
  }
}
</script>
<style scoped>
</style>

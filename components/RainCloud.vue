<template>
  <div>
    <img class='weather_forecast' :src="url" alt=''>
    <button @click="reload()">button2</button>
  </div>
</template>
<script>
export default {
  data:function(){
    return{
      url: 'http://localhost:3000/api/yolp?lat=' + lat + '&lon=' + lon + '&z=' + z + '&width=' + width + '&height=' + height
      lat:
      lon:
      z:
      width:
      height:
    }
  },
  methods: {
    reload:function() {
      location.reload()
    }
  }
}
</script>
<style scoped>
</style>

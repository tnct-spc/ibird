<template>
  <section>
    <div class="bg-danger alert"  v-show="this.message != null">
      <p class="h1 text-light">{{this.message}}</p>
    </div>
  </section>
</template>
<script>

import { w3cwebsocket } from 'websocket'
const W3cwebsocket = w3cwebsocket

export default {
  data () {
    return {
      client: {},
      message : null,
    }
  },
  created () {
    const startWebsocket = () => {
      this.client = new W3cwebsocket('ws://'+process.env.mainUrl+'/ws/alert')
      this.client.onmessage=({data})=>{
        this.message = JSON.parse(data).message;
        var delete_alert = function () {
          this.message = null
        }
        setTimeout(() => {this.message=null},1000*60*5)
      }
      this.client.onclose=()=>{
        console.log('websocket disconnect')
        startWebsocket()
      }
    }
  },
}
</script>
<style scoped>
section {
}
.alert {
  height:100%;
  width:100%;
  left:0;
  right:0;
  top:0;
  bottom:0;
  position:absolute;
}
</style>

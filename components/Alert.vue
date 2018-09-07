<template>
  <section>
    <div class="alert-div"  v-show="this.message != null">
      <b-alert class=" b-alertc" show variant="danger">
        <p class="text-center alert-text">{{this.message}}</p>
      </b-alert>
    </div>
  </section>
</template>
<script>

import { w3cwebsocket } from 'websocket'
import { setTimeout } from 'timers';
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
      this.client = new W3cwebsocket(process.env.wsUrl+'/ws/alert')
      this.client.onmessage=({data})=>{
        this.message = JSON.parse(data).message;
        console.log(this.message)
        setTimeout(() => {this.message=null},1000*60*30)
      }
      this.client.onclose=()=>{
        console.log('websocket disconnect ws/alert')
        setTimeout(() =>{startWebsocket()},1000)
      }
    }
    startWebsocket()
    }
 }
</script>
<style scoped>
.alert-div {
  width: 50%;
  height: 2%;
  right: 3%;
  bottom:3%;
  position:fixed;
}
.alert-text {
  font-size: 150%;
}

</style>

<template>
  <section>
    <div class="alert-div my-10"  v-show="this.message != '' ">
      <b-alert class=" b-alertc" show variant="danger">
        <p class="text-danger text-center my-auto alert-text">{{this.message}}</p>
      </b-alert>
    </div>
  </section>
</template>
<script>

import { w3cwebsocket } from 'websocket'
import axios from 'axios'
const W3cwebsocket = w3cwebsocket

export default {
  data () {
    return {
      client: null,
      endDate: null,
      message : null
    }
  },
  created () {
   axios.get(process.env.httpUrl+'/api/alert')
   .then((res)=>{
     this.message = res.data.message
     this.endDate = res.data.endDate
     this.checkAlert()
   })
   const startWebsocket = () => {
      this.client = new W3cwebsocket(process.env.wsUrl+'/ws/alert')
      this.client.onmessage=()=>{
        axios.get(process.env.httpUrl+'/api/alert')
        .then((res)=>{
          this.message = res.data.message
          this.endDate = res.data.endDate
        })
      }
      this.client.onclose=()=>{
        console.log('websocket disconnect ws/alert')
        setTimeout(() =>{startWebsocket()},1000)
      }
    }
    startWebsocket()
    },
    methods:{
      checkAlert(){
        const endDate = new Date()
        const unixTime = Math.floor( endDate.getTime())
        if(this.endDate <= unixTime)this.message=""
        setTimeout(this.checkAlert,1000*3)
      }
    }
 }
</script>
<style scoped>
.alert-div {
  width: 64%;
  height: 3%;
  left: 3%;
  bottom:3%;
  position:fixed;
}
.alert-text {
  font-size: 200%;
}

</style>

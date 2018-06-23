<template>
  <section>
    <div class="bg-danger"  v-show="this.message != null"><p>{{this.message}}</p>
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
    this.client = new W3cwebsocket('ws://localhost:3000/ws/alert')
    this.client.onmessage=({data})=>{
      this.message = JSON.parse(data).message;
      console.log("message add")
      console.log(this.message)

      var delete_alert = function () {
        this.message = null
        console.log("message deleted")
      }
      console.log(this.message)
      setTimeout(() => {this.message=null},1000*60*5)
    }
  },
}
</script>
<style scoped>
section {
}
</style>

<template>
  <section>
    <p >{{this.message}}</p>
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

    }
  },
}
</script>
<style scoped>
section {
}
</style>

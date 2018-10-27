<template>
  <section>
    <BulletinBoard ref="BulletinBoard" :classid="classid" />
    <Alert />
    <QR class="qr" :classid="classid" />
    <RainCloud class="raincloud" />
    <TimetableParent class="timetableparent" />
  </section>
</template>
<script>
import BulletinBoard from '~/components/BulletinBoard.vue'
import Alert from '~/components/Alert.vue'
import QR from '~/components/QR.vue'
import RainCloud from '~/components/RainCloud.vue'
import TimetableParent from '~/components/timetable/TimetableParent.vue'

import { w3cwebsocket } from 'websocket'
const W3cwebsocket = w3cwebsocket

export default {
  data: function(){
    return {
      refreshClinet: {}
    }
  },
  props: {
    "classid": String
  },
  components: {
    BulletinBoard,
    Alert,
    QR,
    RainCloud,
    TimetableParent,
  },
  computed: {
    url: function(){
      return process.env.httpUrl + '/mobilepage/' + this.classid
    }
  },
  created:function(){
  },
  mounted: function(){
    const startWebsocket = () => {
      this.refreshClinet = new W3cwebsocket(process.env.wsUrl+'/ws/refresh-setting')
      this.refreshClinet.onmessage=({data})=>{
        if(data==='background') {
          this.$refs.BulletinBoard.changeBackground()
        }
      }
      this.refreshClinet.onclose = () => {setTimeout(startWebsocket(),1000)}
    }
    startWebsocket()
  }
}
</script>

<style scoped>
section{
  height: 100%;
  width: 100%;
}
.qr {
  height:13%;
  width:10%;
  right: 22%;
  bottom: 2%;
  position: fixed;
}
.timetableparent {
  height: 10%;
  width:10%;
  right: 12%;
  bottom: 8%;
  position: fixed;
}
.raincloud {
  height: 10%;
  width: 10%;
  right: 0%;
  bottom: 5%;
  position: fixed;
}
</style>

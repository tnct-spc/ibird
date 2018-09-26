<template>
  <section>
    <BulletinBoard :classid="classid" />
    <Alert />
    <QR class="qr" :url="url" />
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

export default {
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
  }
}
</script>

<style scoped>
section{
  height: 100%;
  width: 100%;
}
.qr {
  height:10%;
  width:10%;
  left: 18%;
  bottom: 3%;
  position: fixed;
}
.timetableparent {
  height: 10%;
  width:10%;
  left: 1%;
  bottom: 5%;
  position: fixed;
}
.raincloud {
  height: 10%;
  width: 10%;
  left: 12%;
  bottom: 5%;
  position: fixed;
}
</style>

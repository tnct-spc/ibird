<template>
  <section>
    <BulletinBoard :classid="classid" />
    <Alert />
    <QR class="qr" :url="url" />
    <TimetableParent class="timetableparent" />
  </section>
</template>
<script>
import BulletinBoard from '~/components/BulletinBoard.vue'
import Alert from '~/components/Alert.vue'
import QR from '~/components/QR.vue'
import TimetableParent from '~/components/timetable/TimetableParent.vue'

export default {
  props: {
    "classid": String
  },
  components: {
    BulletinBoard,
    Alert,
    QR,
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
  left:-2%;
  /* right:0;
  top:0; */
  bottom:0;
  position: fixed;
}
.timetableparent {
  height: auto;
  left: 8%;
  bottom: 0;
  position: fixed;
}
</style>

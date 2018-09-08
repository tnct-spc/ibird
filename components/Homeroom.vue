<template>
  <section>
    <BulletinBoard :classid="classid" />
    <Alert />
    <QR class="qr" :url="url" />
  </section>
</template>
<script>
import BulletinBoard from '~/components/BulletinBoard.vue'
import Alert from '~/components/Alert.vue'
import QR from '~/components/QR.vue'

export default {
  props: {
    "classid": String
  },
  components: {
    BulletinBoard,
    Alert,
    QR
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
</style>

<template>
  <section class="container">
    <BulletinBoard :classid=classid />
    <Alert />
    <p>{{classid}}</p>
  </section>
</template>
<script>
import BulletinBoard from '~/components/BulletinBoard.vue'
import Alert from '~/components/Alert.vue'

export default {
  props: {
    "classid": String
  },
  components: {
    BulletinBoard,
    Alert
  },
}
</script>

<style>
body{
  background-color: #d0ae88ff;
}
</style>


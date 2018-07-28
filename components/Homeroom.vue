<template>
  <section class="container">
    <BulletinBoard />
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

<style scoped></style>

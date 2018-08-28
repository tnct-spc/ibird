<template>
  <section>
    <BulletinBoard :classid=classid />
    <Alert />
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

<style scoped>
  section{
    height: 100%;
    width: 100%;
  }
</style>

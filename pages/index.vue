<template>
  <section class="container">
    <BulletinBoard />
    <Alert />
    <RainCloud />
  </section>
</template>

<script>
import BulletinBoard from '~/components/BulletinBoard.vue'
import Alert from '~/components/Alert.vue'
import RainCloud from '~/components/RainCloud.vue'

export default {
  components: {
    BulletinBoard,
    Alert,
    RainCloud
  },
}
</script>

<style scoped></style>

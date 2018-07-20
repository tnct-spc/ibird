<template>
  <section class="container">
    <Control />
    <BulletinBoard />
    <Alert />
  </section>
</template>

<script>
import BulletinBoard from '~/components/BulletinBoard.vue'
import Alert from '~/components/Alert.vue'
import Control from '~/pages/Control.vue'
export default {
  components: {
    BulletinBoard,
    Alert,
    Control
  },
}
</script>

<style scoped></style>

<template>
  <section class="container">
    <BulletinBoard />
    <Alert />
    <control />
  </section>
</template>

<script>
import BulletinBoard from '~/components/BulletinBoard.vue'
import Alert from '~/components/Alert.vue'
import control from '~/pages/control.vue'
export default {
  components: {
    BulletinBoard,
    Alert,
    control
  },
}
</script>

<style scoped></style>

<template>
  <section class="container">
    <BulletinBoard />
    <Alert />
  </section>
</template>

<script>
import BulletinBoard from '~/components/BulletinBoard.vue'
import Alert from '~/components/Alert.vue'
export default {
  components: {
    BulletinBoard,
    Alert,
  },
}
</script>

<style scoped></style>

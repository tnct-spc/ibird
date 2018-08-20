<template>
  <section class="container">
    <BulletinBoard />
    <Alert />
    <TimetableDown />
  </section>
</template>

<script>
import BulletinBoard from '~/components/BulletinBoard.vue'
import Alert from '~/components/Alert.vue'
import TimetableDown from '~/components/TimetableDown.vue'
export default {
  components: {
    BulletinBoard,
    Alert,
    TimetableDown,
  },
}
</script>

<style scoped></style>

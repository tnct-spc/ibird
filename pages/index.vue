<template>
  <section class="container">
    <BulletinBoard />
    <Alert />
    <Timetable />
  </section>
</template>

<script>
import BulletinBoard from '~/components/BulletinBoard.vue'
import Alert from '~/components/Alert.vue'
import Timetable from '~/components/Timetable.vue'
export default {
  components: {
    BulletinBoard,
    Alert,
    Timetable,
  },
}
</script>

<style scoped></style>

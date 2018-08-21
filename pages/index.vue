<template>
  <section class="container">
    <BulletinBoard />
    <Alert />
    <div>
      <a href="http://localhost:3000/control" class="button-link">control</a>
      <a href="http://locahost:3000/bb" class="button-link">bb</a>
    </div>
  </section>
</template>

<script>
import BulletinBoard from '~/components/BulletinBoard.vue'
import Alert from '~/components/Alert.vue'
export default {
  components: {
    BulletinBoard,
    Alert
  },
}
</script>

<style scoped>
  .button-link {
     border: 1px solid rgba(9, 165, 17, 0.933);
  }
</style>

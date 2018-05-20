<template>
  <img class="card" :src="card.imgUrl" alt="">
</template>
<script>
export default {
  props: {
    card: Object
  }
}
</script>
<style scoped>
img.card {
  margin: 1rem;
  box-shadow: 0.5rem 0.5rem 0.5rem 0.01rem;
  border:solid 0.1rem black;
}
</style>

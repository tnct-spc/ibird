<template>
  <img class="card" :src="card.imgUrl" 
    alt="" :style="{left: x, top: y}">
</template>
<script>
import { mapState } from 'vuex'
export default {
  props: {
    cardId: String
  },
  computed: {
    ...mapState({
      cards: 'cards'
    }),
    card () {
      return this.cards[this.cardId]
    },
    x () {
      return this.card.x + 'px'
    },
    y () {
      return this.card.y + 'px'
    }
  }
}
</script>
<style scoped>
img.card {
  margin: 1rem;
  box-shadow: 0.5rem 0.5rem 0.5rem 0.01rem;
  border:solid 0.1rem black;
  max-height: calc(50vh - 1rem);
  position: absolute;
}
</style>

<template>
  <section>
    <Card v-for="(card, cardId) in cards" :key="cardId" :cardId="cardId" />
  </section>
</template>

<script>
import Card from '~/components/Card.vue'
import { mapState } from 'vuex'
export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      cards: 'cards'
    })
  },
  components: {
    Card
  }
}
</script>
<style scoped>
section {
}
</style>

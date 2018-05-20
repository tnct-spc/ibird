<template>
  <section>
    <Card v-for="card in cards" :card="card" />
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

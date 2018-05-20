<template>
  <section>
    a
  </section>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      cards: 'cards'
    })
  }
}
</script>

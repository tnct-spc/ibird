<template>
  <section>
    <Paper v-for="(paper, paperId) in papers" :key="paperId" :paperId="paperId+''" />
  </section>
</template>

<script>
import Paper from '~/components/Paper.vue'
import { mapState } from 'vuex'
export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      papers: 'papers'
    })
  },
  components: {
    Paper
  }
}
</script>
<style scoped>
section {
}
</style>

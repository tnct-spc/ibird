<template>
  <section>
    <p>alert</p>>
    <Paper v-for="(paper, paperId) in papers" :key="paperId" :paper-id="paperId+''" :ws-client="client" />
  </section>
</template>

<script>
import Paper from '~/components/Paper.vue'
import { mapState, mapMutations } from 'vuex'
import { w3cwebsocket } from 'websocket'
const W3cwebsocket = w3cwebsocket

export default {
  data () {
    return {
      client: {}
    }
  },
  created () {
    this.client = new W3cwebsocket('ws://localhost:3000/ws/move')
    this.client.onmessage=({data})=>{
      this.move(JSON.parse(data))
    }
  },
  computed: {
    ...mapState({
      papers: 'papers'
    }),

  },
  methods:{
    ...mapMutations({
      move: 'move'
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

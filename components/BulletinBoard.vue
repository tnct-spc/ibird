<template>
  <section>
    <Paper v-for="(paper, paperId) in papers" :key="paperId" :paper-id="paperId+''" :ws-client="client" />
  </section>
</template>

<script>
import Paper from '~/components/Paper.vue'
import { mapState, mapMutations } from 'vuex'
import { w3cwebsocket } from 'websocket'
import axios from 'axios'

const W3cwebsocket = w3cwebsocket

export default {
  data () {
    return {
      client: {}
    }
  },
  created () {
    axios.get('/ws/all-positions').then((res)=>{
      const defaultPositions = res.data
      for(let p of defaultPositions){
        this.move(p)
      }
    })
    this.client = new W3cwebsocket('ws://'+process.env.mainUrl+'/ws/move')
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
<style>
  body{
    background-image: url("img/background.png")
  }
</style>
<style scoped>

</style>

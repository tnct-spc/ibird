<template>
  <section>
    <Paper v-for="(paper, paperId) in this.papers(classid)" :key="paperId" :classid=classid :paper-id="paperId+''" :ws-client="client" />
  </section>
</template>

<script>
import Paper from '~/components/Paper.vue'
import { mapMutations, mapGetters } from 'vuex'
import { w3cwebsocket } from 'websocket'
import axios from 'axios'

const W3cwebsocket = w3cwebsocket

export default {
  props: {
    "classid": String,
  },
  data () {
    return {
      client: {},
      refreshClient: {}
    }
  },
  created () {
    this.refresh()
    this.client = new W3cwebsocket('ws://'+process.env.mainUrl+'/ws/move')
    this.client.onmessage=({data})=>{
      this.move(JSON.parse(data))
    }
    this.refreshClient = new W3cwebsocket('ws://'+process.env.mainUrl+'/ws/refresh')
    this.refreshClient.onmessage = d => this.refresh()
  },
  computed: {
    ...mapGetters({
      papers: 'papers'
    }),
  },
  methods:{
    ...mapMutations({
      move: 'move',
      fixPapers: 'fixPapers'
    }),
    refresh: function(){
      axios.get('http://' +process.env.mainUrl + '/api/class-docs',{
        params: { classid: this.classid }
      }).then(res =>{
        var documents = []
        res.data.forEach(document => {
          document['isSelected'] = false
          document['imgUrl'] = '/jpg/' + document.docid + '.jpg'
          documents.push(document)
          console.log(document.docid)
        });
        this.fixPapers({classid: this.classid, documents: documents})
      }).catch(e =>{
        console.log(e)
      })
    }
  },
  components: {
    Paper
  }
}
</script>
<style>
  body{
    background-color: #d0ae88ff
  }
</style>
<style scoped>

</style>

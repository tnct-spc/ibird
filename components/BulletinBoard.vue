<template>
  <section>
    <Paper v-for="paper in sortedPapers" :key="paper.index" :classid=classid :paper-id="paper.index+''" :ws-client="client" />
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
    sortedPapers: function(){
      var papers = this.papers(this.classid)
      if(papers) {
        papers = this.papers(this.classid).filter(v => true) //配列のコピー 直接ソートすると怒られる
        papers.sort((a,b) => a.date - b.date)
      }
      return papers
    }
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
        res.data.forEach((document , index)=> {
          document['index'] = index
          document['isSelected'] = false
          document['imgUrl'] = '/jpg/' + document.docid + '.jpg'
          document['date'] = Date()
          documents.push(document)
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

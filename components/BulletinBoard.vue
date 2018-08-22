<template>
  <section>
    <Paper v-for="(paper, i) in sortedPapers"
      :key="i"
      :classid="classid"
      :ws-client="client"
      :paper="paper"
      />
  </section>
</template>

<script>
import Paper from '~/components/Paper.vue'
import { mapState, mapMutations } from 'vuex'
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
  watch:{
    classid(){
      this.refresh()
      this.client = new W3cwebsocket('ws://'+process.env.mainUrl+'/ws/move')
      this.client.onmessage=({data})=>{
        data = JSON.parse(data)
        if(data.classid === this.classid) this.move(data)
      }
      this.refreshClient = new W3cwebsocket('ws://'+process.env.mainUrl+'/ws/refresh')
      this.refreshClient.onmessage = d => this.refresh()
    }
  },
  created () {
    this.refresh()
    this.client = new W3cwebsocket('ws://'+process.env.mainUrl+'/ws/move')
    this.client.onmessage=({data})=>{
      data = JSON.parse(data)
      if(data.classid === this.classid) this.move(data)
    }
    this.refreshClient = new W3cwebsocket('ws://'+process.env.mainUrl+'/ws/refresh')
    this.refreshClient.onmessage = d => this.refresh()
  },
  computed: {
    ...mapState({
      papers: 'papers'
    }),
    sortedPapers: function(){
      var papers = Object.values(this.papers).filter(() => true)
      papers.sort((a,b) => a.updatedAt - b.updatedAt)
      return papers
    }
  },
  methods:{
    ...mapMutations({
      move: 'move',
      refreshPapers: 'refreshPapers'
    }),
    refresh: function(){
      axios.get('http://' +process.env.mainUrl + '/api/class-docs',{
        params: { classid: this.classid }
      }).then(res =>{
        var documents = {}
        res.data.forEach((document , index)=> {
          document['isSelected'] = false
          document['imgUrl'] = '/jpg/' + document.docid + '.jpg'
          documents[document.docid] = document
        });
        this.refreshPapers({documents: documents})
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

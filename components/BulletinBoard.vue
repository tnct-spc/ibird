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
      data = JSON.parse(data)
      if(data.classid === this.classid) this.move(data)
    }
    this.refreshClient = new W3cwebsocket('ws://'+process.env.mainUrl+'/ws/refresh')
    this.refreshClient.onmessage = d => this.refresh()
  },
  computed: {
    ...mapGetters({
      papers: 'papers'
    }),
    sortedPapers: function(){
      var papers = Object.values(this.papers)
      // if(papers) {
      //   papers = this.papers.filter(v => true) //配列のコピー 直接ソートすると怒られる
      //   papers.sort((a,b) => a.updatedAt - b.updatedAt)
      // }
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
    console.log('aaa')
        var documents = {}
        res.data.forEach((document , index)=> {
          documents[document.docid].index = index
          documents[document.docid].isSelected = false
          documents[document.docid].imgUrl =  '/jpg/' + document.docid + '.jpg'
          documents[document.docid].updatedAt = document.updatedAt
        });
        this.fixPapers({documents: documents})
      }).catch(e =>{
    console.log('vbb')
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

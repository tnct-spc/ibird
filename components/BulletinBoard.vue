<template>
  <section>
    <div id="wrapper">
      <div id="content">
        <Paper v-for="(paper, i) in sortedPapers"
          :key="i"
          :classid="classid"
          :ws-client="client"
          :paper="paper"
      />
      </div>
    </div>
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
      this.refreshClient = new w3cwebsocket('ws://' +process.env.mainUrl + '/ws/refresh')
      this.refreshClient.onopen = () => this.refreshClient.send('')
    }
  },
  created () {
    this.refresh()
    const startWebsocket = () =>{
      this.client = new W3cwebsocket('ws://'+process.env.mainUrl+'/ws/move')
      this.client.onmessage=({data})=>{
        data = JSON.parse(data)
        if(data.classid === this.classid) this.move(data)
      }
      this.client.onclose=()=>{
        console.log('websocket disconnect')
        startWebsocket()
      }
      this.refreshClient = new W3cwebsocket('ws://'+process.env.mainUrl+'/ws/refresh')
      this.refreshClient.onmessage = () => this.refresh()
      this.refreshClient.onclose=()=>{
        console.log('websocket disconnect')
        startWebsocket()
      }
    }
    startWebsocket()
  },
  computed: {
    ...mapState({
      papers: 'papers'
    }),
    sortedPapers: function(){
      var papers = Object.values(this.papers).filter(() => true)
      papers.sort((a,b) => a.updatedAt - b.updatedAt)
      papers = papers.filter(p => {
        const buff = new Date(p.endTime)
        buff.setDate(buff.getDate() + 1)
        const a = new Date() - new Date(p.startTime) > 0 //開始日を過ぎているかどうか(当日はtrue)
        const b = buff - new Date() > 0 //終了日より前(当日はtrue)
        return a&&b
      })
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
  }
</style>
<style scoped>
  section {
    height: 100%;
    width: 100%;
  }
  #wrapper {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
  }
  #wrapper:before {
    content:"";
    display: block;
    padding-top: 56%;
  }
  #content {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: #d0ae88ff;
  }

</style>

<template>
  <section>
    <div id="wrapper">
      <div id="content" ref="fieldElm">
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
      this.refreshClient = new w3cwebsocket(process.env.wsUrl + '/ws/refresh')
      this.refreshClient.onopen = () => this.refreshClient.send('')
    }
  },
  created () {
    this.refresh()
    const startWebsocketA = () =>{
      this.client = new W3cwebsocket(process.env.wsUrl+'/ws/move')
      this.client.onmessage=({data})=>{
        data = JSON.parse(data)
        if(data.classid === this.classid) this.move(data)
      }
      this.client.onclose=()=>{
        console.log('websocket disconnect ws/move')
        setTimeout(() =>{startWebsocketA()},1000)
      }
    }
    startWebsocketA()
    const startWebsocketB = () => {
      this.refreshClient = new W3cwebsocket(process.env.wsUrl+'/ws/refresh')
      this.refreshClient.onmessage = () => this.refresh()
      this.refreshClient.onclose=()=>{
        console.log('websocket disconnect ws/refresh')
        setTimeout(() =>{startWebsocketB()},1000)
      }
    }
    startWebsocketB()
  },
  mounted() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  beforeDestroy: function () {
    window.removeEventListener('resize', this.handleResize)
  },
  computed: {
    ...mapState({
      papers: 'papers'
    }),
    sortedPapers: function(){
      var papers = Object.values(this.papers).filter(() => true)
      papers.sort((a,b) => a.updatedAt - b.updatedAt)
      papers = papers.filter(p => {
        var startTime = new Date(p.startTime)
        startTime = new Date(startTime.setHours(startTime.getHours() -9))
        var endTime = new Date(p.endTime)
        endTime = new Date(endTime.setHours(endTime.getHours() -9))
        endTime.setDate(endTime.getDate() + 1)

        const a = new Date() - startTime > 0 //開始日を過ぎているかどうか(当日はtrue)
        const b = endTime - new Date() > 0 //終了日より前(当日はtrue)
        return a&&b
      })
      return papers
    }
  },
  methods:{
    ...mapMutations({
      move: 'move',
      refreshPapers: 'refreshPapers',
      setbbFieldSize: 'setbbFieldSize',
      setBBxy: 'setBBxy'
    }),
    refresh: function(){
      axios.get(process.env.httpUrl + '/api/class-docs',{
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
    },
    handleResize: function() {
      const x = this.$refs.fieldElm.clientWidth
      const y = this.$refs.fieldElm.clientHeight
      this.setbbFieldSize({x: x, y: y})
      const {left, top} = this.$refs.fieldElm.getBoundingClientRect();
      this.setBBxy({x: left, y: top})
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
    width: 100%;
  }
  #wrapper:before {
    content:"";
    display: block;
    padding-top: 56.25%;
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

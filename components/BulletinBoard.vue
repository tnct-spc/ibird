<template>
  <section>
    <b-modal ref="changeEndDateModalRef" hide-footer>
      <div class="d-block text-center">
        <h3>掲載終了日の変更</h3>
      </div>
      <div class="block my-5 text-center">
        <label>掲載終了日</label>
        <input type="date" v-model="endDate"/>
      </div>
      <b-btn class="mt-3" variant="outline-primary" block @click="changeEndDate()">変更する</b-btn>
      <b-btn class="mt-3" variant="outline-danger" block @click="$refs.changeEndDateModalRef.hide()">キャンセル</b-btn>
    </b-modal>
    <b-modal ref="changeClassIdModalRef" size="lg" hide-footer>
      <div class="d-block text-center">
        <h3>掲載クラスの変更</h3>
      </div>
      <b-btn class="mt-3" variant="outline-primary" block @click="">変更する</b-btn>
      <b-btn class="mt-3" variant="outline-danger" block @click="$refs.changeClassIdModalRef.hide()">キャンセル</b-btn>
    </b-modal>
    <div id="wrapper">
      <ViewPaper v-if="showPaper" @close="showPaper=false" :paper="papers[docid]" :docid="docid"/>
      <div id="content" :style="'background-image:url(/img/'+background+')'" ref="fieldElm">
       <b-alert :show="show">
         <span style="font-size:50px;font-family: 'Noto Sans JP', sans-serif;">{{noClassid}}</span>
       </b-alert>
       <div :id=i v-for="(paper, i) in sortedPapers" @dblclick="viewPaper(paper.docid)">
        <Paper
          :key="i"
          :classid="classid"
          :wsClient="client"
          :paper="paper"
        />
      </div>
     </div>
    </div>
  </section>
</template>

<script>
import Paper from '~/components/Paper.vue'
import ViewPaper from '~/components/ViewPaper.vue'
import { mapState, mapMutations } from 'vuex'
import { w3cwebsocket } from 'websocket'
import axios from 'axios'
import { setInterval } from 'timers';

const W3cwebsocket = w3cwebsocket

export default {
  props: {
    "classIdList":Object,
    "classid": String
  },
  data () {
    return {
      background:"",
      show:false,
      showPaper:false,
      client: {},
      refreshClient: {},
      docid:"",
      noClassid:"",
      endDate:null,
      selectedDocid:null
    }
  },
  watch:{
    classid(){
      this.refreshClient = new w3cwebsocket(process.env.wsUrl + '/ws/refresh')
      this.refreshClient.onopen = () => this.refreshClient.send('')
      if(this.classid){
        this.noClassid=""
        this.show=false
      }
    }
  },
  created () {
    console.log(this.classIdList)
    setInterval(this.refresh, 1000*60*60)
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
    if(!this.classid){
      this.noClassid="クラスを選択してください"
      this.show=true
    }
    this.changeBackground()
  },
  mounted() {
    window.addEventListener('resize', this.handleResize)
    setTimeout(() =>{this.handleResize()},100)
  },
  beforeDestroy: function () {
    window.removeEventListener('resize', this.handleResize)
  },
  computed: {
    ...mapState({
      papers: 'papers'
    }),
    sortedPapers: function(){
      /*var papers = Object.values(this.papers).filter(() => true)
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
      })*/
      return this.papers
    }
  },
  methods:{
    changeEndDate: function(){
      const date = new Date()
      let month = date.getMonth()+1
      let day = date.getDate()
      if(month<10) month = "0" + month
      if(day<10) day = "0" + day
      const today = [date.getFullYear(),month,day]
      const checker = today.join('-')
      if(checker > this.endDate){
        alert("掲載終了日を今日より前には設定できません。")
        return
      }
      axios.put(process.env.httpUrl + '/api/doc-end-time', {
          docid: this.selectedDocid,
          endTime: this.endDate
      })
      .catch((e)=>{
        console.log(e)
      })
      this.$refs.myModalRef.hide()
    },
    viewPaper(docid){
      this.docid = docid
      this.showPaper = true
    },
    ...mapMutations({
      move: 'move',
      refreshPapers: 'refreshPapers',
      setbbFieldSize: 'setbbFieldSize',
      setBBxy: 'setBBxy'
    }),
    refresh: function(){
      axios.get(process.env.httpUrl + '/api/docs',{
        params: { classid: this.classid }
      }).then(res =>{
        var documents = {}
        res.data.forEach((document , index)=> {
          document['isSelected'] = false
          document['imgUrl'] = '/jpg/' + document.docid + '.jpg'
          documents[document.docid] = document
        })
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
    },
    changeBackground(){
      axios.get(process.env.httpUrl + '/api/background')
      .then(res =>{
        this.background = res.data
        //console.log(this.background)
      })
      .catch(e =>{
        console.log(e)
      })
    }
  },
  components: {
    Paper,
    ViewPaper
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
    text-align: center;
  }
</style>

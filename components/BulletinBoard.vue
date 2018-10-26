<template>
  <section>
    <b-modal v-model="showResetModal" ref="resetpaper" hide-footer size="lg">
      <ResetPaper
        :docid="selectedDocid"
        :classIdList="classIdList"
        :checkYear="checkYear"
        :checkCourse="checkCourse"
        :paperData="paperData"
        :selectedClassId="selectedClassId"
        @hide="hideResetModal"
      />
    </b-modal>
    <b-modal ref="showUrlModal" hide-footer>
      <div class="d-block text-center">
        <div class="copy-container">
          <b-link :href="downloadUrl">{{downloadUrl}}</b-link>
          <b-button class="mx-2" variant="outline-primary" @click="doCopy">コピー</b-button>
        </div>
      </div>
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
import ResetPaper from '~/components/ResetPaper.vue'
import { mapState, mapMutations } from 'vuex'
import { w3cwebsocket } from 'websocket'
import axios from 'axios'
import { setInterval } from 'timers';

const W3cwebsocket = w3cwebsocket

export default {
  props: {
    "classIdList":Object,
    "classid": String,
    "filename":String,
    "checkCourse":Object,
    "checkYear":Object
  },
  data () {
    return {
      modalShow:false,
      all:false,
      background:"",
      show:false,
      showPaper:false,
      client: {},
      refreshClient: {},
      docid:"",
      noClassid:"",
      endDate:null,
      selectedDocid:null,
      selectedClassId:null,
      submitId:[],
      downloadUrl: '',
      paperData: {},
      showResetModal: false
    }
  },
  watch:{
    showResetModal(){
      console.log(this.showResetModal)
    },
    modalShow(){
      this.selectedClassId.forEach((e)=>{
        Object.keys(this.classIdList).forEach((k)=>{
          this.classIdList[k].forEach((j)=>{
            j.submit = false
          })
        })
      })
      this.selectedClassId.forEach((e)=>{
        Object.keys(this.classIdList).forEach((k)=>{
          this.classIdList[k].forEach((j)=>{
            if(e===j.classid) j.submit = true
          })
        })
      })
      Object.keys(this.checkYear).forEach((e)=>{
        this.checkYear[e] = false
      })
      Object.keys(this.checkCourse).forEach((e)=>{
        this.checkCourse[e] = false
      })
      this.all = false
    },
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
    hideResetModal: function(){
      this.showResetModal = false
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
    },
    doCopy: function () {
      var temp = document.createElement('div');
      temp.appendChild(document.createElement('pre')).textContent = this.downloadUrl;
      var s = temp.style;
      // s.position = 'fixed'
      // s.left = '-100%'
      document.body.appendChild(temp)
      document.getSelection().selectAllChildren(temp)
      if (document.execCommand('copy')) alert('コピーしました')
      document.body.removeChild(temp)
    },
    selectYear(key){
      if(this.checkYear[key] === false){
        this.classIdList[key].forEach((e)=>{
          e.submit = false
        })
      }
      else if(this.checkYear[key] === true){
        this.classIdList[key].forEach((e)=>{
          e.submit = true
        })
      }
    },
    selectCourse(key){
      if(this.checkCourse[key] === true){
        Object.keys(this.classIdList).forEach((e)=>{
          this.classIdList[e].forEach((i)=>{
            if(i.course===key)i.submit=true
          })
        })
      }
      else{
        Object.keys(this.classIdList).forEach((e)=>{
          this.classIdList[e].forEach((i)=>{
            if(i.course===key)i.submit=false
          })
        })
      }
    },
    selectAll(){
      if(this.all === false){
        Object.keys(this.classIdList).forEach((e)=>{
          this.classIdList[e].forEach((i)=>{
            i.submit = false
          })
        })
      }
      else{
        Object.keys(this.classIdList).forEach((e)=>{
          this.classIdList[e].forEach((i)=>{
            i.submit = true
          })
        })
      }
    }
  },
  components: {
    Paper,
    ViewPaper,
    ResetPaper
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

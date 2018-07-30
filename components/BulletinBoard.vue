<template>
  <section>
    <Paper v-for="(paper, paperId) in this.papers(classid)" :key="paperId" :classid=classid :paper-id="paperId+''" :ws-client="client" />
  </section>
</template>

<script>
import Paper from '~/components/Paper.vue'
import { mapState, mapMutations, mapGetters } from 'vuex'
import { w3cwebsocket } from 'websocket'
import axios from 'axios'

const W3cwebsocket = w3cwebsocket

export default {
  props: {
    "classid": String,
  },
  data () {
    return {
      client: {}
    }
  },
  created () {
    axios.get('http://' +process.env.mainUrl + '/api/class-docs',{
        params: {
          classid: this.classid
        }
      }).then(res =>{
        var documents = []
        res.data.forEach(document => {
          document['isSelected'] = false
          document['imgUrl'] = '.document/jpg/' + document.docid + '.jpg'
          documents.push(document)
        });
        this.fixPapers({classid: this.classid, documents: documents})
    }).catch(err =>{
      console.log(err)
    })
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
    ...mapGetters({
      papers: 'papers'
    }),
  },
  methods:{
    ...mapMutations({
      move: 'move',
      fixPapers: 'fixPapers'
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

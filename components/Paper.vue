<template>
  <div @mousedown="mousedown">
    <p>{{ this.paper }}</p>
    <img class="paper" :src="paper.imgUrl" id="drag"
      alt="" :style="{left: this.paper.x+'px', top: this.paper.y+'px'}" ondragstart="return false;" >
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import axios from 'axios'
import { w3cwebsocket } from 'websocket'
const W3cwebsocket = w3cwebsocket

export default {
  data:function(){
    return{
      wsClient: null,
      cursorOffset: {x:0,y:0},
    }
  },
  props: {
    "classid": String,
    "paper": {}
  },
  created (){
    const startWebsocket = () => {
      this.wsClient = new W3cwebsocket('wss://'+process.env.mainUrl+'/ws/move')
      this.wsClient.onclose=()=>{
        console.log('websocket disconnect')
        startWebsocket()
      }
    }
    startWebsocket()
  },
  computed: {
    ...mapState({
      cursorOffset: 'cursorOffset'
    })
  },
  methods: {
    ...mapMutations({
      selectedcard: 'selectCard',
      setCursorOffset: 'setCursorOffset'
    }),
    mousedown: function(e){
      if (e.button == 1) {
        this.remove()
        return
      }
      this.setCursorOffset({x: e.offsetX, y: e.offsetY})
      if (this.paper.isSelected) {
        this.savePosition()
        this.saveOrder()
        this.selectedcard({docid: null})
        document.removeEventListener('mousemove',this.mousemove)
      } else {
        this.selectedcard({docid: this.paper.docid})
        document.addEventListener('mousemove',this.mousemove)
      }
    },
    mousemove: function(e){
      if(this.paper.isSelected){
        this.wsClient.send(JSON.stringify({
          classid: this.classid,
          docid: this.paper.docid,
          x: e.x-this.cursorOffset.x,
          y: e.y-this.cursorOffset.y,
        }))
      }
    },
    remove: function(){
      axios.delete('https://' +process.env.mainUrl + '/api/rm-doc', {
        params: {
          classid: this.classid,
          docid: this.paper.docid
        }
      }).then( () => {
        const c = new W3cwebsocket('wss://' +process.env.mainUrl + '/ws/refresh')
        c.onopen = () => c.send('{}')
      }).catch(e =>{
        console.log(e)
      })
    },
    savePosition: function(){
        axios.put('https://' +process.env.mainUrl + '/api/fix-position', {
          classid: this.classid,
          docid: this.paper.docid,
          x: this.paper.x,
          y: this.paper.y
        }).catch(e =>{
          console.log(e)
        })
    },
    saveOrder: function(){
        axios.put('https://' +process.env.mainUrl + '/api/order-doc', {
          classid: this.classid,
          docid: this.paper.docid,
        }).catch(e =>{
          console.log(e)
        })
    },
    upPaper: function(){
      axios.put('https://' +process.env.mainUrl + '/api/order-doc', {
        classid: this.classid,
        docid: this.paper.docid
      }).then( () => {
        const c = new W3cwebsocket('wss://' +process.env.mainUrl + '/ws/refresh')
        c.onopen = () => c.send('{}')
      }).catch(e =>{
        console.log(e)
      })
    }
  }
}
</script>
<style scoped>
img.paper {
  margin: 1rem;
  box-shadow: 0.5rem 0.5rem 0.5rem 0.01rem;
  border:solid 0.1rem black;
  max-height: calc(50vh - 1rem);
  position: absolute;
}
img.paper:hover{
  box-shadow: 0.5rem 0.5rem 0.5rem 0.01rem;
  color: #0000CC;
}
</style>

<template>
  <div @mousedown="mousedown" ref="fieldElm">
    <p>{{ this.paper }}</p>
    <img class="paper" :src="paper.imgUrl" id="drag"
      alt="" :style="{
        left: (this.paper.x*this.bbFieldSize.x/10000)+'px',
        top: (this.paper.y*this.bbFieldSize.y/10000)+'px',
        }" ondragstart="return false;" >
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
      this.wsClient = new W3cwebsocket(process.env.wsUrl+'/ws/move')
      this.wsClient.onclose=()=>{
        console.log('websocket disconnect /ws/move')
        setTimeout(() =>{startWebsocket()},1000)
      }
    }
    startWebsocket()
  },
  computed: {
    ...mapState({
      cursorOffset: 'cursorOffset',
      bbFieldSize: 'bbFieldSize',
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
          x: (e.x-this.cursorOffset.x)*10000/this.bbFieldSize.x,
          y: (e.y-this.cursorOffset.y)*10000/this.bbFieldSize.y,
        }))
      }
    },
    remove: function(){
      axios.delete(process.env.httpUrl + '/api/rm-doc', {
        params: {
          classid: this.classid,
          docid: this.paper.docid
        }
      }).then( () => {
        const c = new W3cwebsocket(process.env.wsUrl + '/ws/refresh')
        c.onopen = () => c.send('{}')
      }).catch(e =>{
        console.log(e)
      })
    },
    savePosition: function(){
        axios.put(process.env.httpUrl + '/api/fix-position', {
          classid: this.classid,
          docid: this.paper.docid,
          x: this.paper.x,
          y: this.paper.y
        }).catch(e =>{
          console.log(e)
        })
    },
    saveOrder: function(){
        axios.put(process.env.httpUrl + '/api/order-doc', {
          classid: this.classid,
          docid: this.paper.docid,
        }).catch(e =>{
          console.log(e)
        })
    },
    upPaper: function(){
      axios.put(process.env.httpUrl + '/api/order-doc', {
        classid: this.classid,
        docid: this.paper.docid
      }).then( () => {
        const c = new W3cwebsocket(process.env.wsUrl + '/ws/refresh')
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

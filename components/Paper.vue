<template>
  <div @mousedown="mousedown">
    <p>{{ this.paper }}</p>
    <img class="paper" :src="paper.imgUrl" id="drag"
      alt="" width="15%">>
  </div>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex'
import axios from 'axios'
import { w3cwebsocket } from 'websocket'
const W3cwebsocket = w3cwebsocket

export default {
  data:function(){
    return{
      cursorOffset: {x:0,y:0},
    }
  },
  props: {
    "classid": String,
    "paperId": String,
    "wsClient": {}
  },
  computed: {
    ...mapGetters({
      papers: 'papers'
    }),
    paper () {
      return this.papers(this.classid)[this.paperId]
    },
  },
  methods: {
    ...mapMutations({
      selectedcard: 'selectCard'
    }),
    mousedown: function(e){
      if (e.button == 1) {
        this.remove()
        return
      }
      this.cursorOffset.x = e.offsetX
      this.cursorOffset.y = e.offsetY
      if (this.paper.isSelected) {
        this.savePosition()
        document.removeEventListener('mousemove',this.mousemove)
        this.selectedcard({classid: this.classid, paperId: null})
      } else {
        document.addEventListener('mousemove',this.mousemove)
        this.selectedcard({classid: this.classid, paperId: this.paperId})
      }
    },
    mousemove: function(e){
      this.wsClient.send(JSON.stringify({
        classid: this.classid,
        paperId: this.paperId,
        x: e.x-this.cursorOffset.x,
        y: e.y-this.cursorOffset.y,
      }))
      document.addEventListener('mouseup',this.mouseup)
    },
    remove: function(){
      axios.delete('http://' +process.env.mainUrl + '/api/rm-doc', {
        params: {
          classid: this.classid,
          docid: this.paper.docid
        }
      }).then( () => {
        const c = new W3cwebsocket('ws://' +process.env.mainUrl + '/ws/refresh')
        c.onopen = () => c.send('{}')
      }).catch(e =>{
        console.log(e)
      })
    },
    savePosition: function(){
        axios.put('http://' +process.env.mainUrl + '/api/fix-position', {
          classid: this.classid,
          docid: this.paper.docid,
          x: this.paper.x,
          y: this.paper.y
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
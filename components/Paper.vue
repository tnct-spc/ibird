<template>
  <div @mousedown="mousedown">
    <p>{{ this.paper }}</p>
    <img class="paper" :src="paper.imgUrl" id="drag"
      alt="" :style="{left: this.paper.x+'px', top: this.paper.y+'px'}" ondragstart="return false;">
  </div>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex'
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
      this.selectedcard({classid: this.classid, paperId: this.paperId})
      this.cursorOffset.x = e.offsetX
      this.cursorOffset.y = e.offsetY
      document.addEventListener('mousemove',this.mousemove)
    },
    mousemove: function(e){
      if(this.paper.isSelected){
        this.client.send(JSON.stringify({
          classid: this.classid,
          paperId: this.paperId,
          x: e.x-this.cursorOffset.x,
          y: e.y-this.cursorOffset.y,
        }))
      }
      document.addEventListener('mouseup',this.mouseup)
    },
    mouseup: function(e){
      document.removeEventListener('mousemove',this.mousemove)
      document.removeEventListener('mouseup',this.mouseup)
      this.selectedcard({classid: this.classid, paperId: null})
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

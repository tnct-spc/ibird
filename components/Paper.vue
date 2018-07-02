<template>
  <div @mousedown="mousedown">
    <p v-show="this.paper.isSelected">{{ this.paperId }}</p>
    <img class="paper" :src="paper.imgUrl"
      alt="" :style="{left: _x, top: _y}">
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  data:function(){
    return{
      x: null,
      y: null,
      cursorStartPos: null,
    }
  },
  props: {
    "paperId": String,
    "wsClient": {}
  },
  computed: {
    ...mapState({
      papers: 'papers'
    }),
    paper () {
      return this.papers[this.paperId]
    },
    _x () {
      return `${this.paper.x}px`
    },
    _y () {
      return `${this.paper.y}px`
    }
  },
  methods: {
    ...mapMutations({
      selectedcard: 'selectCard'
    }),
    ...mapActions({
      move: 'move'
    }),

    mousedown: function(e){
      console.log(e.x)
      this.selectedcard({paperId: this.paperId})
      document.addEventListener('mousemove',this.mousemove)
      document.addEventListener('mouseup',this.mouseup)
    },
    mousemove: function(e){
      if(this.paper.isSelected){
        this.move({
          paperId: this.paperId,
          x: e.x-100,
          y: e.y-100,
          client: this.wsClient
        })
      }
    },
    mouseup: function(e){
      this.cursorStartPos = null
      document.removeEventListener('mousemove',this.mousemove)
      document.removeEventListener('mouseup',this.mouseup)
      this.selectedcard({paperId: null})
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
  color: #AA0000;
}
</style>

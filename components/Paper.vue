<template>
  <div @mousedown="mousedown">
    <p v-show="this.paper.isSelected">{{ this.paperId }}</p>
    <img class="paper" :src="paper.imgUrl" 
      alt="" :style="{left: x, top: y}">
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
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
    x () {
      return this.paper.x + 'px'
    },
    y () {
      return this.paper.y + 'px'
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
          x: e.x,
          y: e.y,
          client: this.wsClient
        })
      }
    },
    mouseup: function(e){
      document.removeEventListener('mousemove',this.mousemove)
      document.removeEventListener('mouseup',this.mouseup)
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
</style>

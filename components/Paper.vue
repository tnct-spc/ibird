<template>
  <img class="paper" :src="paper.imgUrl" 
    alt="" :style="{left: x, top: y}">
</template>
<script>
import { mapState } from 'vuex'
export default {
  props: {
    paperId: String
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

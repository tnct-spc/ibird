<template>
  <div @mousedown="mousedown">
    <p v-show="this.paper.isSelected">{{ this.paperId }}</p>
    <img class="paper" :src="" id="drag"  
    alt="A4の紙" :style="{left: _x, top: _y}" ondragstart="return false;">
  </div>
</template>
<script>
 import { mapState, mapMutations, mapActions } from 'vuex'
 export default {
   data:function(){
     return{
       x: null,
       y: null,
       cursorOffset: {x:0,y:0},
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
       this.cursorOffset.x = e.offsetX
       this.cursorOffset.y = e.offsetY
       document.addEventListener('mousemove',this.mousemove)
     },
     mousemove: function(e){
       if(this.paper.isSelected){
         this.move({
           paperId: this.paperId,
           x: e.x-this.cursorOffset.x,
           y: e.y-this.cursorOffset.y,
           client: this.wsClient
         })
       }
       document.addEventListener('mouseup',this.mouseup)
     },
     mouseup: function(e){
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
   color: #0000CC;
 }
 #drag {
   width: "15%";
   height: "37%";
 }
</style>
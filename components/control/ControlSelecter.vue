<template>
 <section>
  <div ref="fieldElm">
    <table>
      <tbody>
        <tr>
          <!--学年 -->
          <td v-for="(year, index) in years" :key="index" @click="switchingYear(index)" v-bind:style="selectedStyle(index)">{{year}}</td>
        </tr>
        <tr>
          <!-- 学科 -->
          <td v-for="(course, index) in courses" :key="index" @click="switchingClass(index)" v-bind:style="selectedStyle2(index)">{{course}}</td>
        </tr>
      </tbody>
    </table>
  </div>
 </section>
</template>
<script>
import axios from 'axios'
import Vue from 'vue'
import { w3cwebsocket } from 'websocket'
import { mapMutations } from 'vuex'

export default {
  props:{
    "classid":String,
  },
  data:()=>{
    return{
      yearIndex: 0,
      courseIndex: 0,
      years: ['1','2','3','4','5'],
      courses: ['M','E','D','J','C'],
    }
  },
  mounted(){
      //selecterのサイズをとるためにやる
      const x = this.$refs.fieldElm.clientWidth
      const y = this.$refs.fieldElm.clientHeight
      console.log('controlx' + x)
      console.log('controlx' + y)
      this.setControlSelecterSize({x: x, y: y})
      //
  },
  methods:{
    ...mapMutations({
      setControlSelecterSize: 'setControlSelecterSize'
    }),
    selectedStyle: function(index){
      const backgroundColor = index === this.yearIndex ? 'red' : 'white'
      return { background: backgroundColor }
    },
    selectedStyle2: function(index){
      const backgroundColor = index === this.courseIndex ? 'red' : 'white'
      return { background: backgroundColor }
    },
    switchingYear: function(index) {
      this.yearIndex = index
    },
    switchingClass: function(index){
      this.courseIndex = index
    }
  }
}
</script>

<style scoped>
.p{
  border: 2px solid orange;
  background-color: yellow;
}
.sitayose{
  margin-top: 5px;
}
#grid1{
  display: grid;
  grid-template-rows:5%;
  text-align: center;
}
#grid2{
  display: grid;
  grid-template-rows:5%;
  text-align: center;
}
</style>

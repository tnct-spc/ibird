<template>
  <section>
  <div style="margin-left:5px;margin-right:5px">
    <!-- 学年を表示する -->
    <div id="grid">
    <button v-for="(item, index) in obj" @click="switchingClassTable(Object.keys(obj)[index-1])" class="sitayose p">
      {{Object.keys(obj)[index-1]}}　<!--indexが1始まりだったので-1している。要検討 -->
    </button>
    </div>
    <!-- 学年で選択されたクラスを表示する -->
    <div id="grid2">
    <a :href=item.classid v-for="(item, index) in obj[year]" @click="switchingClass()" class="p">
      {{ item.course }}
    </a>
    </div>
  </div>
 </section>
</template>
<script>
import axios from 'axios'
import Vue from 'vue';
export default {
  props:{
    "classes":Array
  },
  data:()=>{
    return{
      year: "", //現在選択中の学年
      obj: {},  //学年をKEYにclassidとcourseのオブジェクトの配列を持つ
      grid:{}
    }
  },
  mounted(){
      const grid = document.getElementById("grid")
      let grids = 0
      this.classes.forEach((c)=> {
        if(!this.obj[c.year]){
          Vue.set(this.obj, c.year, [])
          grids++
        } //最初の型を決める
        this.obj[c.year].push({classid: c.classid, course: c.course})
      })
      grid.style.gridTemplateColumns="repeat("+String(grids)+", 1fr)"
      for(let courseGrid in this.obj){
        let grids2 = 0
        this.obj[courseGrid].forEach((c)=> {
          grids2++
        })
        Vue.set(this.grid, courseGrid, grids2)
      }
  },
  methods:{
    switchingClassTable: function(newYear) { //新年じゃないよ
      this.year = newYear
      const grid2 = document.getElementById("grid2")
      grid2.style.gridTemplateColumns="repeat("+String(this.grid[this.year])+", 1fr)"
    },
    switchingClass: function(index) {}
  },
}
</script>

<style>
body{
  background-color: #d0ae88ff;
}
</style>

<style scoped>
.p{
  border: 2px solid orange;
  background-color: yellow;
}
.sitayose{
  margin-top: 5px;
}
#grid{
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

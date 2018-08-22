<template>
  <section>
  <div style="margin-left:10%;margin-right:5%">
    <button type="button" class="btn btn-info" @click="sortDocs()">
       sort-docs
    </button>
    <!-- 学年を表示する -->
    <div id="grid1">
    <button v-for="(item, index) in obj" @click="switchingClassTable(Object.keys(obj)[index-1])" class="sitayose p">
      {{Object.keys(obj)[index-1]}}　<!--indexが1始まりだったので-1している。要検討 -->
    </button>
    </div>
    <!-- 学年で選択されたクラスを表示する -->
    <div id="grid2">
     <button v-for="(item, index) in obj[year]" @click="switchingClass(item.classid)" class="p">
        {{ item.course }}
     </button>
    </div>
  </div>
 </section>
</template>
<script>
import axios from 'axios'
import Vue from 'vue'
export default {
  props:{
    "classid":String,
    "classes":Array
  },
  data:()=>{
    return{
      year: "", //現在選択中の学年
      obj:{},//学年をKEYにclassidとcourseのオブジェクトの配列を持つ
      grid:{},
      grids:0
    }
  },
  mounted(){
      this.classes.sort((a,b)=>{
      return a.classid - b.classid
      })
      this.classes.forEach((c)=> {
        if(!this.obj[c.year]){
          Vue.set(this.obj, c.year, [])
          this.grids++
        } //最初の型を決める
        this.obj[c.year].push({classid: c.classid, course: c.course})
      })
      const grid1 = document.getElementById("grid1")
      grid1.style.gridTemplateColumns="repeat("+String(this.grids)+", 1fr)"
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
    switchingClass(classid){
      console.log(classid)
      this.$parent.classid = classid
    },
    sortDocs(){
      axios.put('../api/sort-docs',{
        classid:this.classid
      })
    }
  }
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

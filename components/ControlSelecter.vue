<template>
  <div id="grid" style="margin-left:5px;margin-right:5px">
    <!-- 学年を表示する -->
    <button v-for="(item, index) in obj" :key="index" @click="switchingClassTable(Object.keys(obj)[index-1])" class="sitayose p">
      {{ Object.keys(obj)[index-1] }}　<!--indexが1始まりだったので-1している。要検討 -->
    </button>
    <!-- 学年で選択されたクラスを表示する -->
    <a :href=item.classid v-for="(item, index) in obj[year]" @click="switchingClass()" class="p">
      {{ item.course }}
    </a>
  </div>
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
    }
  },
  created(){
      this.classes.forEach(c => {
        if(!this.obj[c.year]) Vue.set(this.obj, c.year, []) //最初の型を決める
        this.obj[c.year].push({classid: c.classid, course: c.course})
    })
  },
  methods:{
    switchingClassTable: function(newYear) { //新年じゃないよ
      this.year = newYear
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
  margin-top: 17%;
}
#grid{
  display: grid;
  grid-template-rows:5% 5%;
  grid-template-columns:1fr 1fr 1fr 1fr 1fr;
  text-align: center;
}
</style>

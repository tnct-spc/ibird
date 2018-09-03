<template>
 <section>
  <div>
    <p>classid = {{ classid }}</p>
    <table width="100%" class="fixedtable">
      <tbody>
        <tr>
          <!--学年 -->
          <td v-for="(year, index) in years" :key="index" @click="switchingYear(index)" align="center" v-bind:style="selectedStyle(index)">{{year}}</td>
        </tr>
        <tr>
          <!-- 学科 -->
          <td v-for="(course, index) in courses" :key="index" @click="switchingClass(index)" align="center" v-bind:style="selectedStyle2(index)">{{course}}</td>
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
      classid: '0',
      yearIndex: 0,
      courseIndex: 0,
      years: [],
      courses: [],
    }
  },
  mounted(){
    axios.get(process.env.httpUrl + '/api/years-and-courses').then(res =>{
      this.years = res.data.years
      this.courses = res.data.courses
    }).catch(e =>{
      console.log(e)
    })
  },
  watch:{
    yearIndex(){
      this.getClassid()
    },
    courseIndex(){
      this.getClassid()
    }
  },
  methods:{
    ...mapMutations({
      setControlSelecterSize: 'setControlSelecterSize'
    }),
    selectedStyle: function(index){
      const backgroundColor = index === this.yearIndex ? 'red' : ''
      return { background: backgroundColor }
    },
    selectedStyle2: function(index){
      const backgroundColor = index === this.courseIndex ? 'red' : ''
      return { background: backgroundColor }
    },
    switchingYear: function(index) {
      this.yearIndex = index
    },
    switchingClass: function(index){
      this.courseIndex = index
    },
    getClassid: function(){
      axios.get(process.env.httpUrl + '/api/classid',{
        params: { year: this.years[this.yearIndex], course: this.courses[this.courseIndex] }
      }).then(res =>{
        this.$parent.classid = String(res.data.classid)
      }).catch(e =>{
        console.log(e)
      })
    }
  }
}
</script>

<style scoped>
.p{
  border: 2px solid orange;
  background-color: yellow;
}
.fixedtable{
  table-layout: fixed
}
</style>

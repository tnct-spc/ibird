<template>
 <section>
  <div class="d-flex flex-column align-items-stretch">
    <link href="https://fonts.googleapis.com/css?family=Baloo+Tammudu" rel="stylesheet">
        <!--学年 -->
        <b-button-group>
          <b-button v-for="(year, index) in years"
            :key="index"
            @click="switchingYear(index)"
            align="center"
            :variant="selectedStyle(index)"
            class="class-button my-1">
            {{year}}
          </b-button>
        </b-button-group>
        <!-- 学科 -->
        <b-button-group>
          <b-button v-for="(course, index) in courses"
            :key="index"
            @click="switchingClass(index)"
            align="center"
            :variant="selectedStyle2(index)">
          {{course}}
          </b-button>
        </b-button-group>
  </div>
 </section>
</template>
<script>
import axios from 'axios'
import Vue from 'vue'
import { w3cwebsocket } from 'websocket'

export default {
  props:{
    "classid":String,
  },
  data:()=>{
    return{
      yearIndex: 0,
      courseIndex: 0,
      years: [],
      courses: new Array(5),
      }
  },
  mounted(){
    axios.get(process.env.httpUrl + '/api/years-and-courses').then(res =>{
      this.years = res.data.years
      res.data.courses.forEach((e,i)=>{
        switch (e) {
          case "M":
            this.courses.splice(0,1,e)
            break
          case "E":
            this.courses.splice(1,1,e)
            break
          case "D":
            this.courses.splice(2,1,e)
            break
          case "J":
            this.courses.splice(3,1,e)
            break
          case "C":
            this.courses.splice(4,1,e)
            break
        }
      })
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
    },
    classid(){
      history.replaceState('','',this.classid)
    }
  },
  methods:{
    selectedStyle: function(index){
      const backgroundColor = index === this.yearIndex ? 'primary' : 'outline-dark'
      return backgroundColor
    },
    selectedStyle2: function(index){
      const backgroundColor = index === this.courseIndex ? 'primary' : 'outline-dark'
      return backgroundColor
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
.classbutton {
  width: 100%;
}
.p{
  border: 2px solid orange;
  background-color: yellow;
}
.fixedtable{
  table-layout: fixed
}
.btn-group > button{
  font-family: 'Sawarabi+Mincho', cursive;
  width:100%
}
</style>

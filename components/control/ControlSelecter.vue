<template>
 <section>
  <div class="d-flex flex-column align-items-stretch">
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
  head () {
    return {
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Baloo+Tammudu' }
      ]
    }
  },
  props:{
    "classid":String,
  },
  data:()=>{
    return{
      yearIndex: null,
      courseIndex: null,
      years: [],
      courses: []
      }
  },
  created(){
    axios.get(process.env.httpUrl + '/api/years-and-courses')
    .then(res =>{
      this.years = res.data.years
      this.courses = res.data.courses
    })
    .catch(e =>{
      console.log(e)
    })
    if(this.classid){
      axios.get(process.env.httpUrl + '/api/year-and-course',
      {params:
        {classid:this.classid}
      })
      .then(res =>{
        this.years.forEach((e,i)=>{
          if(res.data.year===e){
            this.switchingYear(i)
            this.selectedStyle(i)
          }
        })
        this.courses.forEach((e,i)=>{
          if(res.data.course===e){
            this.switchingClass(i)
            this.selectedStyle2(i)
          }
        })
      })
    }
  },
  watch:{
    yearIndex(){
      if(this.courseIndex!==null)this.getClassid()
    },
    courseIndex(){
      if(this.yearIndex!==null)this.getClassid()
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
      axios.get(process.env.httpUrl + '/api/class-id',{
        params: { year: this.years[this.yearIndex], course: this.courses[this.courseIndex] }
      }).then(res =>{
        this.$parent.changedClassid = String(res.data.classid)
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

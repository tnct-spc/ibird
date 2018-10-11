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
            class="class-button my-1"
            :class="{'btn-outline-dark':unSelected1}">
            {{year}}
          </b-button>
        </b-button-group>
        <!-- 学科 -->
        <b-button-group>
          <b-button v-for="(course, index) in courses"
            :key="index"
            @click="switchingClass(index)"
            align="center"
            :variant="selectedStyle2(index)"
            :class="{'btn-outline-dark':unSelected2}">
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
    "changedClassid":String,
  },
  data:()=>{
    return{
      yearIndex: null,
      courseIndex: null,
      years: [],
      courses: [],
      unSelected1:false,
      unSelected2:false
      }
  },
  mounted(){
    if(!this.changedClassid)this.unSelected1 = true
    if(!this.changedClassid)this.unSelected2 = true
    axios.get(process.env.httpUrl + '/api/years-and-courses')
    .then(res =>{
      this.years = res.data.years
      this.courses = res.data.courses
    })
    .catch(e =>{
      console.log(e)
    })
  },
  watch:{
    yearIndex(){
      if(this.courseIndex||this.courseIndex===0)this.getClassid()
    },
    courseIndex(){
      if(this.yearIndex||this.yearIndex===0)this.getClassid()
    },
    changedClassid(){
      history.replaceState('','',this.changedClassid)
    }
  },
  methods:{
    selectedStyle: function(index){
      if(index === this.courseIndex&&this.changedClassid)this.unSelected1 = false
      const backgroundColor = index === this.yearIndex ? 'primary' : 'outline-dark'
      return backgroundColor
    },
    selectedStyle2: function(index){
      if(index === this.courseIndex&&this.changedClassid)this.unSelected2 = false
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

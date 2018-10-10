<template>
  <section class="container">
    <h1>掲示板設定ページ</h1>
    <form>
        <div class="form-group">
            <label>全学年数</label>
            <input class="form-control" v-model.number="yearsNumber" type="number">
        </div>
        <div class="form-group">
            <label>学科</label>
            <div v-for="(course, index) in courses" :key="index" class="course-symbol input-group">
                <input type="text" class="form-control" v-model="courses[index]">
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button" id="button-addon2" @click="removeCourse(index)">削除</button>
                </div>
            </div>
            <div class="input-group">
                <input type="text" class="form-control" aria-describedby="button-addon2" v-model="newCourseName">
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button" id="button-addon2" @click="addCourse">追加</button>
                </div>
            </div>
        </div>
    </form>
  </section>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            yearsNumber: 5,
            courses: [],
            newCourseName: ''
        }
    },
    mounted(){
      axios.get(process.env.httpUrl + '/api/Courses').then(res =>{
        this.courses = res.data.courses
        console.log(this.courses)
      }).catch(e =>{
        console.log(e)
      })
    },
    methods: {
        addCourse(){
            this.courses.push(this.newCourseName)
            this.newCourseName=''
        },
        removeCourse(index){
            this.courses.splice(index, 1)
        }
    }
}
</script>
<style scoped>
.container {
    padding-top: 2rem;
    padding-bottom: 2rem;
}
span.cource-symbol {

}
</style>

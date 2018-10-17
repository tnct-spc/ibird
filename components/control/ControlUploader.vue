<template>
 <section>
  <div @dragleave.prevent="onDragLeave($event)" @dragover.prevent="onDragOver($event)" @drop.prevent="onDrop($event)">
   <BulletinBoard :classid="classid"/>
  </div>
  <ModalUploader v-if="showModal" @submit="upload()" @cancel="cancel()" :classIdList="classIdList" :filename="filename" :docid="docid" :checkCourse="checkCourse" :checkYear="checkYear"/>
 </section>
</template>
<script>
import axios from 'axios'
import Vue from 'vue'
import BulletinBoard from '~/components/BulletinBoard.vue'
import ModalUploader from '~/components/control/ModalUploader.vue'

export default{
  props:{
     "classes":Array,
     "classid":String
  },
  data:function(){
    return{
      setting:{
        active:true,
        startDate:null,
        endDate:null,
        classIdList:null,
        all:null,
        checkCourse:null,
        checkYear:null,
        openMobile:null
      },
      showModal:false,
      filename:null,
      docid:null,
      checkCourse:{},
      checkYear:{},
      fileList:[],
      modal:0,
      files:null,
      classIdList:{}
    }
  },
  created(){
      axios.get(process.env.httpUrl + '/api/years-and-courses').then(res =>{
        res.data.courses.forEach((e)=>{
          Vue.set(this.checkCourse,e,false)
        })
        res.data.years.forEach((e)=>{
          Vue.set(this.checkYear,e,false)
        })
        this.classes.sort((a,b)=>{
          return a.classid - b.classid
        })
        Object.keys(this.checkCourse).forEach((e,i)=>{
          this.classes.forEach((c)=> {
            if(!this.classIdList[c.year]){
              Vue.set(this.classIdList, c.year, [])
            }
            if(e === c.course){
              this.classIdList[c.year].push({classid: c.classid, course: e, submit:false})
            }
          })
        })
      })
  },
  methods:{
  upload(){
    this.modal--
    if(this.modal<0)return
    this.file = this.files[this.modal]
    const formData = new FormData()
    this.docid = new Date().getTime().toString(16)
    formData.append('docid',this.docid)
    formData.append('file',this.file)
    this.filename = this.file.name
    //upload file
    axios.post('../api/upload-file',formData)
    .then((response)=>{
    })
    .catch(e=>{
      console.log(e)
    })
    this.$nextTick(() => {
      this.showModal=true
    })
  },
  cancel(){
    this.modal--
    if(this.modal<0)return
    this.file = this.files[this.modal]
    const formData = new FormData()
    this.docid = new Date().getTime().toString(16)
    formData.append('docid',this.docid)
    formData.append('file',this.file)
    this.filename = this.file.name
    this.$nextTick(() => {
      this.showModal=true
    })
  },
  onDragOver(event){
    event.preventDefault()
    event.dataTransfer.dropEffect = "copy"
  },
  onDragLeave(event){
  },
  onDrop(event){
    this.setting.active = true
    Object.keys(this.classIdList).forEach((e)=>{
      this.classIdList[e].forEach((i)=>{
        i.submit = false
      })
    })
    Object.keys(this.checkYear).forEach((e)=>{
      this.checkYear[e] = false
    })
    Object.keys(this.checkCourse).forEach((e)=>{
      this.checkCourse[e] = false
    })
    event.preventDefault()
    event.dataTransfer.dropEffect = "copy"
    this.modal=0
    this.fileList.length=0
    this.files = event.dataTransfer.files
    Object.values(this.files).forEach(((e,i)=>{
      this.fileList.push(this.files[i].name)
    }))
    this.modal = this.fileList.length
    this.modal--
    this.file = this.files[this.modal]
    if(!this.classid||!this.files.length
    ||!this.file.type.match('application/pdf')&&!this.file.type.match('application/vnd.*')){
      if(!this.classid){
        alert("表示するクラスを選択してください")
      }
      if(!this.files.length){
        alert("ファイルをドラッグ＆ドロップしてください")
      }
      if(!this.file.type.match('application/pdf')&&!this.file.type.match('application/vnd.*')){
        alert("ファイル形式に対応してません")
      }
      return
    }
    const formData = new FormData()
    this.docid = new Date().getTime().toString(16)
    formData.append('docid', this.docid)
    formData.append('file',this.file)
    this.filename = this.file.name
    //upload file
    axios.post('../api/upload-file',formData)
    .then((response)=>{
    })
    .catch(e=>{
      console.log(e)
    })
    this.showModal=true
  }
 },
 components:{
   BulletinBoard,
   ModalUploader
 },
}
</script>
<style scoped>
</style>

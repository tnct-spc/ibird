<template>
 <section>
  <div id="overlay" @dragleave.prevent="onDragLeave($event)" @dragover.prevent="onDragOver($event)" @drop.prevent="onDrop($event)">
   <BulletinBoard :classid="classid"/>
  </div>
  <ModalUploader v-if="showModal" @submit="upload()" :classes="classes" :filename="filename" :docid="docid" :imgsize="imgsize" :checkCourse="checkCourse" :checkYear="checkYear"/>
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
      showModal: false,
      filename:null,
      docid:null,
      imgsize:null,
      checkCourse:{},
      checkYear:{},
      fileList:[],
      modal:0,
      files:null
    }
  },
  mounted(){
      axios.get(process.env.httpUrl + '/api/years-and-courses').then(res =>{
        res.data.courses.forEach((e)=>{
          Vue.set(this.checkCourse,e,false)
        })
        res.data.years.forEach((e)=>{
          Vue.set(this.checkYear,e,false)
        })
      })
  },
  methods:{
  upload(){
    this.modal--
    if(this.modal<0)return
    console.log(this.modal)
    this.file = this.files[this.modal]
    const formData = new FormData()
    formData.append('file',this.file)
    this.filename = this.file.name
    axios.post('../api/upload-file',formData)
    .then((response)=>{
      console.log(response)
      this.docid = response.data.docid
      this.imgsize = response.data.imgsize
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
    event.preventDefault()
    event.dataTransfer.dropEffect = "copy"
    this.modal=0
    this.fileList.length=0
    this.files = event.dataTransfer.files
    Object.values(this.files).forEach(((e,i)=>{
      this.fileList.push(this.files[i].name)
      console.log(this.files[i].name)
    }))
    this.modal = this.fileList.length
    this.modal--
    this.file = this.files[this.modal]
    console.log(this.modal)
    if(!this.classid){
      alert("表示するクラスを選択してください")
      return
    }
    if(!this.files.length){
      alert("ファイルをドラッグ＆ドロップしてください")
      return
    }
    if(!this.file.type.match('application/pdf')&&!this.file.type.match('application/vnd.*')){
      alert("ファイル形式に対応してません")
      return
    }
    const formData = new FormData()
    formData.append('file',this.file)
    this.filename = this.file.name
    axios.post('../api/upload-file',formData)
    .then((response)=>{
      this.docid = response.data.docid
      this.imgsize = response.data.imgsize
      this.showModal=true
    })
  }
 },
 components:{
   BulletinBoard,
   ModalUploader
 },
}
</script>
<style scoped>
#overlay {
  width: 100%;
  height: 100%;
  text-align: center;
}
</style>

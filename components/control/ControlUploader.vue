<template>
 <section>
  <div id="overlay" @dragleave.prevent="onDragLeave($event)" @dragover.prevent="onDragOver($event)" @drop.prevent="onDrop($event)">
   <BulletinBoard :classid="classid"/>
  </div>
  <ModalUploader v-if="showModal" @close="showModal=false" :classes="classes" :filename="filename" :docid="docid"/>
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
      docid:null
    }
  },
  methods: {
  onDragOver(event){
    event.preventDefault()
    event.dataTransfer.dropEffect = "copy"
  },
  onDragLeave(event){
  },
  onDrop(event){
    event.preventDefault()
    event.dataTransfer.dropEffect = "copy"
    const files = event.dataTransfer.files[0]
    if(!files.type.match('application/pdf')&&!files.type.match('application/vnd.*'))
    {
      alert("ファイル形式に対応してません")
      return
    }
    const formData = new FormData()
    formData.append('file',files)
    this.filename = files.name
    axios.post('../api/upload-file',formData)
    .then((response)=>{
      this.docid = response.data.docid
    })
    this.showModal = true
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

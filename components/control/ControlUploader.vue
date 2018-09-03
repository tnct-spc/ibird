<template>
 <section>
  <div id="overlay" @dragleave.prevent="onDragLeave($event)" @dragover.prevent="onDragOver($event)" @drop.prevent="onDrop($event)">
   <!-- {{text}} -->
   <BulletinBoard :classid="classid"/>
  </div>
  <ModalUploader v-if="showModal" @close="showModal=false" :classes="classes" :files="files"/>
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
      text:"管理者ページ",
      showModal: false,
      files:{}
    }
  },
  methods: {
  onDragOver(event){
    event.preventDefault()
    event.dataTransfer.dropEffect = "copy"
    const overlay = document.getElementById("overlay")
    overlay.classList.add("dropover")
  },
  onDragLeave(event){
  },
  onDrop(event){
    event.preventDefault()
    event.dataTransfer.dropEffect = "copy"
    overlay.classList.remove("dropover")
    const files = event.dataTransfer.files[0]
    Vue.set(this.files,"files",files)
    if(!files.type.match('application/pdf')&&!files.type.match('application/vnd.*'))
    {
      this.text="ファイル形式に対応してません"
      return
    }
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
.dropover {
  background-color: #46fb43;
}
</style>

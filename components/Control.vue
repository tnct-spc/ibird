<template>
  <section>
　<div id="overlay" @dragleave.prevent="onDragLeave($event)" @dragover.prevent="onDragOver($event)" @drop.prevent="onDrop($event)">
  {{text}}
</div>
  </section>
</template>
<script>
import axios from 'axios'

export default{
  data:()=>{
    return{
      text:""
    }
  },
  mounted(){
    this.text="管理者ページ"
  },
  methods: {
  onDragOver:(event) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = "copy"
    const overlay = document.getElementById("overlay")
    overlay.classList.add("dropover")
  },
  onDragLeave:(event) => {
  },
  onDrop:(event) => {
    event.preventDefault()
    event.dataTransfer.dropEffect="copy"
    overlay.classList.remove("dropover")
    const files = event.dataTransfer.files[0]
    if(!files.type.match('application/pdf')&&!files.type.match('application/vnd.*'))
    {
      overlay.innerHTML="ファイル形式に対応してません"
      return
    }
    const formData = new FormData()
    formData.append( 'file', files)
    const path = location.pathname
    const pathinfo = path.split('/')
    const classes = pathinfo.pop()
    formData.append('classids',"["+classes+"]")
    axios.post('../api/upload-file',formData)
    .then((response)=>{
      overlay.innerHTML="success"
    })
    .catch((error) => {
      overlay.innerHTML=error
    })
  },
 }
}
</script>
<style scoped>
#overlay {
  /*position: fixed;
  */top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  text-align: center;
}
.dropover {
  background-color: #46fb43;
}
</style>

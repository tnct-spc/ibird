<template>
  <section>
　<div id="overlay" @dragleave.prevent="onDragLeave" @dragover.prevent="onDragOver" @drop.prevent="onDrop">
  管理者ページ
</div>
  </section>
</template>
<script>
import axios from 'axios'
let files
let formData
let overlay

export default{
  name: 'login-form',
  methods: {
  onDragOver:(event) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = "copy"
    overlay = document.getElementById("overlay")
    overlay.classList.add("dropover")
  },
  onDragLeave:(event) => {
  },
  onDrop:(event) => {
    event.preventDefault()
    event.dataTransfer.dropEffect="copy"
    overlay.classList.remove("dropover")
    files = event.dataTransfer.files[0]
    if(!files.type.match('application/pdf')&&!files.type.match('application/vnd.*'))
    {
      overlay.innerHTML="ファイル形式に対応してません"
      return
    }
    formData = new FormData()
    formData.append( 'file', files )
    axios.post('api/upload-file',formData)
    .then((response) => {
        overlay.innerHTML="success"
    })
    .catch((error) => {
        overlay.innerHTML="error"
        console.log(error)
    })
  },
 }
}
</script>
<style scoped>
#overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  text-align: center;
}
.dropover {
  background-color: #46fb43;
}
</style>

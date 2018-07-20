<template>
  <section>
　<div id="overlay" @dragleave.prevent="onDragLeave" @dragover.prevent="onDragOver" @drop.prevent="onDrop">
  あああああ
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
    //event.dataTransfer.dropEffect="copy"
    overlay.classList.remove("dropover")
    files = event.dataTransfer.files
    formData = new FormData()
    formData.append( 'file', files[0] );
    axios.post('http://localhost:3000/api/upload-file',formData)
    .then((response) => {
        overlay.innerHTML="sucess"
        console.log(response.data)
        res.render('index', response.data)
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
}
.dropover {
  background-color: #46fb43;
}
</style>

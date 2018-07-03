<template>
  <section class="container">
  <div id="login-form">
    <form method="post" enctype="multipart/form-data">
    <div>
    <input type="file" name="file" id="file" accept=".pdf">
    </div>
    <div>
    <button v-on:click="post_box">送信</button>
    </div>
  </form>
  </div>
  </section>
</template>

<script>
import axios from 'axios'

export default{
  name: 'login-form',
  methods: {
    post_box: function (event) {
      let fileInput = document.querySelector( '#file' );
      let formData = new FormData();
      formData.append( 'file', fileInput.files[0] );
      axios.post('http://localhost:3000/api/upload-file',formData).then(response => {
       console.log(response);
    });
   }
  }
}
</script>

<style scoped>
</style>

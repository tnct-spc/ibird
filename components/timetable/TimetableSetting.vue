<template>
   <div>
    <b-form-textarea id="textarea"
                     v-model="textarea"
                     placeholder="時刻表のjsonデータを入力してください"
                     :rows="30">
    </b-form-textarea>
    <b-button @click="this.subimtData" :disabled="isNotButtonActive" variant="success">設定</b-button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    data : function(){
      return {
        textarea : '',
        server_data: '',
        isNotButtonActive: false
      }
    },
    watch : {
      textarea(){
        this.isNotButtonActive = JSON.stringify(this.textarea) === JSON.stringify(this.server_data)
      }
    },
    created : function(){
      axios.get(process.env.httpUrl + '/api/timetable')
      .then(response => {
        this.textarea = JSON.stringify(response.data)
        this.server_data = JSON.stringify(response.data)
      })
    },
    computed : {
    },
    methods : {
      subimtData: function(){
        this.isNotButtonActive = true
        const formData = {timetable: this.textarea}
        axios.post(process.env.httpUrl + '/api/timetable',formData)
        .then(res=>{
          axios.get(process.env.httpUrl + '/api/timetable')
          .then(response => {
            this.server_data = JSON.stringify(response.data)
          })
        })
        .catch(e=>{
          console.log(e)
        })
      }
    },
}
</script>

<style scoped>
</style>

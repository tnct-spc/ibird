<template>
    <section>
      <ControlHeader :classes="classes" :classid="classid"/>
      <ControlUploader :classid="classid" :classes="classes"/>
    </section>
</template>
<script>
import ControlUploader from '~/components/control/ControlUploader.vue'
import ControlHeader from '~/components/control/ControlHeader.vue'
import axios from 'axios'

export default {
  data:()=>{
    return {
      classid: '',
      classes: {}
    }
  },
  asyncData ({ params, error }) {
    return axios.get('http://localhost:3000/api/classes').then(res =>{
      const classlist = res.data
      //ここでurlの確認
      var eflag = true
      classlist.forEach(c => {
        if(String(c.classid) ===params.control) eflag = false
        else if(!params.control)eflag = false
      })
      if(eflag) throw new URIError("URIちがうよ");

      return {
        classid: params.control,
        classes: classlist
      }
    }).catch(err =>{
      error({ statusCode: 404, message: 'ページが見つかりません' })
    })
  },
  components:{
    ControlUploader,
    ControlHeader
  },
  middleware: 'auth',
}
</script>
<style>
body{
  background-color: #242424
}
</style>
<style scoped>
</style>

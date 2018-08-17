<template>
    <section id="wrapper">
      <ControlSelecter :classes="classes"/>
      <Control id="upload" :classid="classid"/>
    </section>
</template>
<script>
import Control from '~/components/Control.vue'
import ControlSelecter from '~/components/ControlSelecter.vue'
import axios from 'axios'

export default {
  data:()=>{
    return {
      classid: '',
      classes: {}
    }
  },
  asyncData ({ params, error }) {
    return axios.get('http://localhost:3000/api/classes-list').then(res =>{
      const classlist = res.data
      //ここでurlの確認
      var eflag = true
      classlist.forEach(c => {
        if(String(c.classid) === params.control) eflag = false
      });
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
    Control,
    ControlSelecter
  },
}
</script>
<style scoped>
 #upload{
   height: 100%;
 }
 #wrapper {
    position: fixed;
    width: 100%;
    height: 100%;
}
</style>

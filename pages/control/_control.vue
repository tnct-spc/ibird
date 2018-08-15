<template>
    <section>
      <Control/>
      <ControlSelecter/>
      <Homeroom :classid="classid"/>
    </section>
</template>
<script>
import Control from '~/components/Control.vue'
import ControlSelecter from '~/components/ControlSelecter.vue'
import Homeroom from '~/components/Homeroom.vue'
import axios from 'axios'

export default {
  data:()=>{
    return {
      classid: '',
      classes: {}
    }
  },
  asyncData ({ params, error }) {
    return axios.get('http://' +process.env.mainUrl + '/api/classes-list').then(res =>{
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
    ControlSelecter,
    Homeroom
  },
}
</script>
<style scoped>
</style>

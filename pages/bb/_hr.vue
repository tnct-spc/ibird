<template>
  <section>
    <Homeroom :classid="classid"/>
  </section>
</template>

<script>
import Homeroom from '~/components/Homeroom.vue'
import axios from 'axios'

export default {
  data () {
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
        if(String(c.classid) === params.hr) eflag = false
      });
      if(eflag) throw new URIError("URIちがうよ");

      return {
        classid: params.hr,
        classes: classlist
      }
    }).catch(err =>{
      error({ statusCode: 404, message: 'ページが見つかりません' })
    })
  },
  components:{
    Homeroom
  },
}
</script>

<style scoped>
</style>

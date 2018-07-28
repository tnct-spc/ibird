<template>
  <section>
    <Homeroom/>
    <p>{{classes}}</p>
  </section>
</template>

<script>
import Homeroom from '~/components/Homeroom.vue'
import axios from 'axios'

export default {
  data () {
    return {
      classes: {}
    }
  },
  asyncData ({ params, error }) {
    return axios.get('http://' +process.env.mainUrl + '/api/classes-list').then(res =>{
      const classlist = res.data
      //ここでurlの確認
      var eflag = true
      classlist.forEach(c => {
        if(String(c.classid) === params.hr) eflag = false
      });
      if(eflag) throw new URIError("URIちがうよ");

      return {classes: classlist}
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

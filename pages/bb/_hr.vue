<template>
  <section>
    <classes/>
    <p>{{classes}}</p>
  </section>
</template>

<script>
import classes from '~/components/Classes.vue'
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
    classes
  },
}
</script>

<style scoped>
</style>

<template>
<div>
  <h1>認証に失敗しました</h1>
</div>
</template>

<script>
import axios from '~/plugins/axios'
import { isRegExp } from 'util';
import { setInterval, setTimeout } from 'timers';
export default {
  data: function(){
    return{
      isRedirect: false,
    }
  },
  async asyncData({store, query, redirect}) {
    let classid =  query['classid']
    let pass =  query['pass']
    return {
      classid: classid,
      pass: pass
    }
  },
  created: function(){
  },
  mounted: function(){
    const params = {
      classid: this.classid,
      pass: this.pass
    }
    axios.post(process.env.httpUrl+'/api/issue-qr-uri',params)
    .then(res => {
    })
  },
}
</script>

<style scoped>
.title
{
  margin-top: 30px;
}
.info
{
  font-weight: 300;
  color: #9aabb1;
  margin: 0;
  margin-top: 10px;
}
.button
{
  margin-top: 30px;
}
</style>


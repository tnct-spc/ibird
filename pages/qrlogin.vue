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
    const params = {
      classid: classid,
      pass: pass
    }
    return  axios.post('http://localhost:3000/api/issue-qr-uri',params)
    .then(res => {
      console.log('res.data' + res.data)
      if (res.data === 'success'){
        // setUser({user: 'mobileUser'})
        // return store.commit('setUser', {username: 'mobileUser'})
        return redirect('/mobilepage/'+classid)
      }
    })
  },
  created: function(){
  },
  mounted: function(){
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


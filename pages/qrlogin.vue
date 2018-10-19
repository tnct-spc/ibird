<template>
<div v-if="isFaild">
   <b-card class="text-center">
     <b-alert show variant="danger">認証に失敗しました</b-alert>
     QRコードを読み直してください
   </b-card>
</div>
</template>

<script>
import axios from '~/plugins/axios'
import { isRegExp } from 'util';
import { setInterval, setTimeout } from 'timers';
export default {
  data: function(){
    return{
      isFaild: false,
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
    const params = {
      classid: this.classid,
      pass: this.pass
    }
    axios.post(process.env.httpUrl+'/api/issue-qr-uri',params)
    .then(res => {
      if(res.data==='success') {
        window.location = process.env.httpUrl + '/mobilepage/' + this.classid
      } else {
        this.isFaild = true
      }
    })
  },
  mounted: function(){
    /*
    const params = {
      classid: this.classid,
      pass: this.pass
    }
    axios.post(process.env.httpUrl+'/api/issue-qr-uri',params)
    .then(res => {
      if(res.data==='success') {
        window.location = process.env.httpUrl + '/mobilepage/' + this.classid
      } else {
        isFaild = true
      }
    })
    */
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


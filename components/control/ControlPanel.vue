<template>
  <section>
    <div>
      <span style="font-size:150%">
        ControlPage
      </span>
    </div>
    <div>
      <span>Alert : </span>
      <input v-model="alertMessage" placeholder="緊急伝達事項を入力">
      <button type="button" class="btn btn-primary btn-sm" @click="showAlert()">
          アラート表示
      </button>
      <span> Sort : </span>
      <button type="button" class="btn btn-primary btn-sm" @click="sortDocs()">
         自動並び替え
      </button>
      <a  href="/strict" type="button" class="btn btn-standard btn-sm right">
        クラス設定ページへ
      </a>
    </div>
  </section>
</template>
<script>
import { w3cwebsocket } from 'websocket'
import axios from 'axios'
const W3cwebsocket = w3cwebsocket

export default{
  data:()=>{
    return{
      alertMessage: ''
    }
  },
  props:{
    "classid":String,
  },
  methods:{
    sortDocs(){
      axios.put(process.env.httpUrl + '/api/sort-docs',{
        classid:this.classid
      })
    },
    showAlert(){
      const wsClient = new w3cwebsocket(process.env.wsUrl + '/ws/alert')
      wsClient.onopen = () => {
        if(this.alertMessage !== ""){
          // console.log({message: this.alertMessage})
          wsClient.send(JSON.stringify({message: this.alertMessage}))
        }
      }
    }
  }
}
</script>
<style>
.right{
  float: right
}
</style>

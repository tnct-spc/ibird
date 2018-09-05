<template>
  <section>
    <div>
      <span style="font-size:150%">
        ControlPage
      </span>
    </div>
    <div>
      <input v-model="alertMessage" placeholder="緊急伝達事項を入力">
      <button type="button" class="btn btn-outline-primary btn-sm" @click="showAlert()">
          アラート表示
      </button>
      <button type="button" class="btn btn-outline-primary btn-sm" @click="sortDocs()">
         自動並び替え
      </button>
      <button type="button" class="btn btn-outline-primary btn-sm">
      <a href="/strict">クラス設定ページへ</a>
      </button>
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
<style scoped></style>

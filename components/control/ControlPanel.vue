<template>
  <section>
    <div>
      <span style="font-size:150%">
        iBird Control Page
      </span>
      <span>classid = {{classid}}</span>
    </div>
    <div>
      <input v-model="alertMessage" placeholder="緊急伝達事項を入力">
      <button type="button" class="btn btn-outline-primary btn-sm mx-1" @click="showAlert()">
         アラート表示
      </button>
      <button type="button" class="btn btn-outline-primary btn-sm mx-1" @click="sortDocs()">
         並び替え
      </button>
      <b-form-group style="display:inline;" label="<code>少しずらしてリアルに表示</code>">
      <b-form-radio-group
                       buttons
                       button-variant="outline-primary"
                       v-model="isRandom"
                       @input="randomSort()"
                       :options="Random"/>
      </b-form-group>
      <button type="button" class="btn btn-outline-primary btn-sm mx-1">
      <a href="/setting">設定ページへ</a>
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
      alertMessage: '',
      isRandom:null,
      Random:[{text:"適用",value:true},{text:"適用しない",value:false}]
    }
  },
  props:{
    "classid":String,
  },
  watch:{
    classid(){
      axios.get(process.env.httpUrl + '/api/RandomSort',{params:{
        classid:this.classid
      }}).then((response)=>{
        this.isRandom = response.data.isRandom
      })
    }
  },
  mounted(){
    axios.get(process.env.httpUrl + '/api/RandomSort',{params:{
      classid:this.classid
    }}).then((response)=>{
      this.isRandom = response.data.isRandom
    })
  },
  methods:{
    sortDocs(){
      axios.put(process.env.httpUrl + '/api/sort',{
        classid:this.classid
      })
    },
    randomSort(){
      axios.put(process.env.httpUrl + '/api/RandomSort',{
      classid : this.classid,
      isRandom : this.isRandom
      })
    },
    showAlert(){
      if (this.alertMessage.length > 100){
        alert("アラートの最大表示は100文字です")
      } else{
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
}
</script>
<style scoped></style>

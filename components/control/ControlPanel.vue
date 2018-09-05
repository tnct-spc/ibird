<template>
  <section>
    <div>
      <span style="font-size:150%">
        ControlPage
      </span>
      <span>classid = {{classid}}</span>
    </div>
    <div>
      <input v-model="alertMessage" placeholder="緊急伝達事項を入力">
      <button type="button" class="btn btn-primary btn-sm" @click="showAlert()">
         アラート表示
      </button>
      <button style="margin-left:5px" type="button" class="btn btn-primary btn-sm" @click="sortDocs()">
         並び替え
      </button>
      <button style="margin-left:5px" type="button" class="btn btn-primary btn-sm">
      <a href="/strict">クラス設定ページへ</a>
      </button>
      <b-form-group style="display:inline;margin-left:5px" label="<code>ランダム設定</code>">
      <b-form-radio-group
                       buttons
                       button-variant="outline-primary"
                       v-model="isRandom"
                       @input="randomSort()"
                       :options="Random"/>
      </b-form-group>
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
      Random:[{text:"オン",value:true},{text:"オフ",value:false}]
    }
  },
  props:{
    "classid":String,
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
      axios.put(process.env.httpUrl + '/api/sort-docs',{
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

<template>
  <section>
    <div>
      <span style="font-size:150%;font-family: 'Noto Sans JP', sans-serif;">
        iBird Control Page
      </span>
      <span>classid = {{classid}}</span>
    </div>
    <div>
      <div>
        <button type="button" class="btn btn-outline-primary btn-sm ml-1" @click="sortDocs()">
          並び替え
        </button>
        <b-form-group class="ml-3" style="display:inline;" label="<code>少しずらしてリアルに表示</code>">
        <b-form-radio-group
                       buttons
                       button-variant="outline-primary"
                       v-model="isRandom"
                       @input="randomSort()"
                       :options="Random"/>
        </b-form-group>
        <button type="button" class="btn btn-outline-primary btn-sm ml-1">
          <a href="/setting">設定ページへ</a>
        </button>
      </div>
      <div>
        <input v-model="alertMessage" class="w-75" placeholder="緊急伝達事項を入力">
        <button  type="button" :disabled="!this.isAlertEmpty1" class="btn btn-outline-primary btn-sm ml-1" @click="showAlert()">
          {{this.isAlertEmpty1 ? 'アラート表示':'アラートを表示中です'}}
        </button>
        <button  type="button" :disabled="!this.isAlertEmpty2" class="btn btn-outline-primary btn-sm ml-1" @click="deleteAlert()">
          {{this.isAlertEmpty2 ? '削除':'削除中です'}}
        </button>
      </div>
      <div>
      <span style="display:block" class="my-2">現在のAlert表示</span>
        <b-alert show>
          <span style="font-family: 'Noto Sans JP', sans-serif;">
            {{message}}
          </span>
        </b-alert>
      </div>
    </div>
  </section>
</template>
<script>
import { w3cwebsocket } from 'websocket'
import axios from 'axios'
const W3cwebsocket =  w3cwebsocket

export default{
  data:()=>{
    return{
      endDate:null,
      message:"",
      alertMessage: "",
      isRandom:null,
      Random:[{text:"適用",value:true},{text:"適用しない",value:false}],
      isAlertEmpty1: true,
      isAlertEmpty2: true
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
  created(){
    axios.get(process.env.httpUrl+'/api/alert')
    .then((res)=>{
      if(!res.data.message) this.message = "現在表示中のアラートはありません"
      else this.message = res.data.message
      this.checkAlert()
    })
    const startWebsocket = () => {
       this.client = new W3cwebsocket(process.env.wsUrl+'/ws/alert')
       this.client.onmessage=()=>{
         axios.get(process.env.httpUrl+'/api/alert')
         .then((res)=>{
           if(!res.data.message) this.message = "現在表示中のアラートはありません"
           else this.message = res.data.message
           this.endDate = res.data.endDate
         })
       }
       this.client.onclose=()=>{
         console.log('websocket disconnect ws/alert')
         setTimeout(() =>{startWebsocket()},1000)
       }
    }
    startWebsocket()
    axios.get(process.env.httpUrl + '/api/RandomSort',{params:{
      classid:this.classid
    }}).then((response)=>{
      this.isRandom = response.data.isRandom
    })
  },
  methods:{
    checkAlert(){
      const endDate = new Date()
      const unixTime = Math.floor( endDate.getTime())
      if(this.endDate >= unixTime)this.message="現在表示中のアラートはありません"
      setTimeout(this.checkAlert,1000*3)
    },
    deleteAlert(){
      axios.delete(process.env.httpUrl + '/api/alert')
      .then(()=>{
        const wsClient = new w3cwebsocket(process.env.wsUrl + '/ws/alert')
        wsClient.onopen = () => wsClient.send("")
        this.isAlertEmpty2 = false
        setTimeout(()=>{this.isAlertEmpty2=true},1000*5)
      })
    },
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
      if (this.alertMessage.length > 100)alert("アラートの最大表示は100文字です")
      else{
        axios.put(process.env.httpUrl + '/api/alert',{
          message:this.alertMessage
        })
        .then(()=>{
          const wsClient = new w3cwebsocket(process.env.wsUrl + '/ws/alert')
          wsClient.onopen = () => {
            if(this.alertMessage !== ""){
              wsClient.send("")
            }
          }
          this.isAlertEmpty1 = false
          setTimeout(()=>{this.isAlertEmpty1=true},1000*5)
        })
      }
    }
  }
}
</script>
<style scoped></style>

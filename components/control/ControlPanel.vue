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
         sort-docs
      </button>
    </div>
  </section>
</template>
<script>
export default{
  data:()=>{
    return{
      alertMessage: ''
    }
  },
  methods:{
    sortDocs(){
      axios.put('../api/sort-docs',{
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
<style scoped>
</style>

<template>
  <section>
    <div style="text-align:center">
      <table style="margin-left:auto;margin-right:auto" class="my-4">
        <tbody>
         <tr>
          <td v-for="(skin , index) in backgrounds">
          <b-row>
            <b-col>
              <b-img rounded thumbnail fluid :src="'/img/'+skin.backgrounds" alt="Thumbnail"/>
            </b-col>
          </b-row>
          </td>
         </tr>
         <tr>
          <td v-for="(skin, index) in backgrounds" style="text-align:center">
             <b-form-checkbox v-model="skin.active" @change="setSkin(index)"></b-form-checkbox>
          </td>
         </tr>
        </tbody>
      </table>
     <div class="my-1">
       <b-button @click="showModal()" variant="primary">
         壁紙を変更する
       </b-button>
       <b-modal ref="myModalRef" hide-footer title="">
         <div class="d-block text-center">
           <h3>本当に変更しますか？</h3>
         </div>
         <b-btn class="mt-3" variant="outline-primary" block @click="changeSkin()">変更する</b-btn>
         <b-btn class="mt-3" variant="outline-danger" block @click="hideModal()">キャンセル</b-btn>
       </b-modal>
     </div>
    </div>
  </section>
</template>
<script>
import axios from 'axios'
import { w3cwebsocket } from 'websocket'
const W3cwebsocket = w3cwebsocket

export default{
  data:()=>{
    return{
      backgrounds:[],
      num:null
    }
  },
  created(){
    axios.get(process.env.httpUrl + '/api/backgrounds')
    .then(response =>{
      response.data.forEach((e)=>{
        this.backgrounds.push({backgrounds:e,active:false})
      })
      axios.get(process.env.httpUrl + '/api/background')
      .then(res =>{
        this.backgrounds.forEach((e)=>{
          if(e.backgrounds === res.data)e.active = true
        })
      })
      .catch(e =>{
        console.log(e)
      })
    })
    .catch(e =>{
      console.log(e)
    })
  },
  methods: {
    setSkin(num){
      this.num = num
      Object.keys(this.backgrounds).forEach((e)=>{
        this.backgrounds[e].active = false
      })
      this.backgrounds[num].active = true
      //console.log(num)
    },
    showModal () {
      this.$refs.myModalRef.show()
    },
    hideModal () {
      this.$refs.myModalRef.hide()
    },
    changeSkin(){
      let selectedSkin
      Object.keys(this.backgrounds).forEach((e)=>{
        if(this.backgrounds[e].active===true)selectedSkin=this.backgrounds[e].backgrounds
      })
      axios.post(process.env.httpUrl + '/api/background',{
        filename:selectedSkin
      })
      .then(res=>{
        if(res.data==="OK"){
          this.selectedSkin = this.backgrounds[this.num]
          let c = new w3cwebsocket(process.env.wsUrl + '/ws/refresh-setting')
          c.onopen = () => {
            c.send('background')
            c.close()
          }
        }
        else alert("変更できませんでした")
      })
      .catch(err=>{
        console.log(err)
      })
      this.hideModal()
    }
  }
}
</script>
<style scoped>
</style>

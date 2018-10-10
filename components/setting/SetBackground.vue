<template>
  <section>
    <div style="text-align:center">
      <span class="my-1">今の背景は{{selectedSkin}}です</span>
      <table style="margin-left:auto;margin-right:auto" class="my-4">
        <tbody>
         <tr>
          <td v-for="(skin , index) in backgrounds">
          <b-row>
            <b-col>
              <b-img rounded thumbnail fluid :src="'/img/'+skin" alt="Thumbnail"/>
            </b-col>
          </b-row>
          </td>
         </tr>
         <tr>
          <td v-for="(skin, index) in backgrounds" style="text-align:center">
            <b-form-radio @change="setSkin(index)" name="radio"></b-form-radio>
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
import VUe from 'vue'

export default{
  data:()=>{
    return{
      backgrounds:[],
      selectedSkin:null,
      num:null
    }
  },
  created(){
    axios.get(process.env.httpUrl + '/api/background')
    .then(res =>{
      this.selectedSkin = res.data
      //console.log(this.selectedSkin)
    })
    .catch(e =>{
      console.log(e)
    })
    axios.get(process.env.httpUrl + '/api/backgrounds')
    .then(res =>{
      this.backgrounds = res.data
    })
    .catch(e =>{
      console.log(e)
    })
  },
  methods: {
    setSkin(num){
      this.num = num
      //console.log(num)
    },
    showModal () {
      this.$refs.myModalRef.show()
    },
    hideModal () {
      this.$refs.myModalRef.hide()
    },
    changeSkin(){
      axios.post(process.env.httpUrl + '/api/background',{
        filename: this.backgrounds[this.num]
      })
      .then(res=>{
        if(res.data==="OK")this.selectedSkin = this.backgrounds[this.num]
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

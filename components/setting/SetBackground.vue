<template>
  <section>
    <div style="text-align:center">
      <span class="my-1">今の背景は{{selectedSkin}}です</span>
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
  },
  methods: {
    showModal () {
      this.$refs.myModalRef.show()
    },
    hideModal () {
      this.$refs.myModalRef.hide()
    }
  }
}
</script>
<style scoped>
</style>

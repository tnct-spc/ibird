<template>
  <section>
  <div class="background" style="padding:1%" ref="fieldElm">
   <ControlPanel :classid="changedClassid"/>
   <ControlSelecter :classid="changedClassid"/>
  </div>
  </section>
</template>
<script>
import ControlPanel from '~/components/control/ControlPanel.vue'
import ControlSelecter from '~/components/control/ControlSelecter.vue'

export default{
  props:{
    "classid":String,
    "classes":Array
  },
  data:()=>{
    return{
      changedClassid:""
    }
  },
  watch:{
    changedClassid(){
    this.$parent.classid = this.changedClassid
    }
  },
  created(){
    this.changedClassid=this.classid
  },
  components:{
    ControlPanel,
    ControlSelecter
  },
}
</script>
<style scoped>
.background{
   background-color: #e7e7e7
 }
</style>

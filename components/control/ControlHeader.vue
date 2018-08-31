<template>
  <section>
  <div class="background" style="padding:1%" >
   <ControlPanel/>
   <ControlSelecter :classid="classid" :classes="classes"/>
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
  watch:{
    classid(){
    console.log(this.classid)
    this.$parent.classid = this.classid
    }
  },
  components:{
    ControlPanel,
    ControlSelecter
  },
}
</script>
<style scoped>
.background{
   background-color: #ffee50
 }
</style>

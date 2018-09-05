<template>
  <section>
  <div class="background" style="padding:1%" ref="fieldElm">
   <ControlPanel :classid="classid"/>
   <ControlSelecter :classid="classid" :classes="classes"/>
  </div>
  </section>
</template>
<script>
import ControlPanel from '~/components/control/ControlPanel.vue'
import ControlSelecter from '~/components/control/ControlSelecter.vue'
import { mapMutations } from 'vuex'

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
  mounted(){
    //selecterのサイズをとるためにやる
    const x = this.$refs.fieldElm.clientWidth
    const y = this.$refs.fieldElm.clientHeight
    console.log('controlx' + x)
    console.log('controlx' + y)
    this.setControlSelecterSize({x: x, y: y})
    //
  },
  methods:{
    ...mapMutations({
      setControlSelecterSize: 'setControlSelecterSize'
    }),
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

<template>
 <section>
  <div ref="fieldElm">
    <table>
      <tbody>
        <tr>
          <td>aaa</td>
        </tr>
        <tr>
          <td>bbb</td>
        </tr>
      </tbody>
    </table>
  </div>
 </section>
</template>
<script>
import axios from 'axios'
import Vue from 'vue'
import { w3cwebsocket } from 'websocket'
import { mapMutations } from 'vuex'

export default {
  props:{
    "classid":String,
  },
  data:()=>{
    return{
      yearIndex: 0,
      courseIndex: 0,
      years: [],
      courses: [],
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
    switchingClassTable: function(newYear) {
    },
    switchingClass(classid){
    }
  }
}
</script>

<style scoped>
.p{
  border: 2px solid orange;
  background-color: yellow;
}
.sitayose{
  margin-top: 5px;
}
#grid1{
  display: grid;
  grid-template-rows:5%;
  text-align: center;
}
#grid2{
  display: grid;
  grid-template-rows:5%;
  text-align: center;
}
</style>

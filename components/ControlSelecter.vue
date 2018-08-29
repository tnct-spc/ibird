<template>
  <section>
  <div class="background" style="padding:1%"  ref="fieldElm">
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
    <!-- 学年を表示する -->
    <div id="grid1">
    <button v-for="(item, index) in obj" @click="switchingClassTable(Object.keys(obj)[index-1])" class="sitayose p">
      {{Object.keys(obj)[index-1]}}　<!--indexが1始まりだったので-1している。要検討 -->
    </button>
    </div>
    <!-- 学年で選択されたクラスを表示する -->
    <div id="grid2">
     <button v-for="(item, index) in obj[year]" @click="switchingClass(item.classid)" class="p">
        {{ item.course }}
     </button>
    </div>
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
    "classes":Array
  },
  data:()=>{
    return{
      year: "", //現在選択中の学年
      obj:{},//学年をKEYにclassidとcourseのオブジェクトの配列を持つ
      grid:{},
      grids:0,
      alertMessage: ''
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
      this.classes.sort((a,b)=>{
      return a.classid - b.classid
      })
      this.classes.forEach((c)=> {
        if(!this.obj[c.year]){
          Vue.set(this.obj, c.year, [])
          this.grids++
        } //最初の型を決める
        this.obj[c.year].push({classid: c.classid, course: c.course})
      })
      const grid1 = document.getElementById("grid1")
      grid1.style.gridTemplateColumns="repeat("+String(this.grids)+", 1fr)"
      Object.keys(this.obj).forEach((e)=>{
        let grids2 = 0
        this.obj[e].forEach((c)=> {
          grids2++
        })
        Vue.set(this.grid, e, grids2)
      })
  },
  methods:{
    ...mapMutations({
      setControlSelecterSize: 'setControlSelecterSize'
    }),
    switchingClassTable: function(newYear) { //新年じゃないよ
      this.year = newYear
      const grid2 = document.getElementById("grid2")
      grid2.style.gridTemplateColumns="repeat("+String(this.grid[this.year])+", 1fr)"
    },
    switchingClass(classid){
      console.log(classid)
      this.$parent.classid = classid
    },
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

<style>
</style>

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
.background{
   background-color: #ffee50
 }
</style>

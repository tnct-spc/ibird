<template>
  <div id="grid" style="margin-left:5px;margin-right:5px">
    <button v-for="item in grade" @click="switchingClass()" class="sitayose p">
      {{item.classes}}
    </button>
    <button v-for="item in classes.list0" @click="switchingClassTable()" class="p"
      {{item.cource}}
    </button>
    <div style="text-align:center">
      {{homeroom}}
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default{
  data:()=>{
    return{
    homeroom:"",
    //dbからのclassidでやるべきだけどとりあえずの実装
    grade:[
      {id:"list1",classes:"1年"},
      {id:"list2",classes:"2年"},
      {id:"list3",classes:"3年"},
      {id:"list4",classes:"4年"},
      {id:"list5",classes:"5年"}
    ],
    classes:{
    list0:[
      {classid:"",cource:"学年を選択してください"},
      {classid:"",cource:""},
      {classid:"",cource:""},
      {classid:"",cource:""},
      {classid:"",cource:""}
    ],
    list1:[
      {classid:"",cource:"1-1"},
      {classid:"",cource:"1-2"},
      {classid:"",cource:"1-3"},
      {classid:"20180402",cource:"1-4"},
      {classid:"20180401",cource:"1-5"}
    ],
    list2:[
      {classid:"20170401",cource:"2-J"},
      {classid:"",cource:"2-D"},
      {classid:"",cource:"2-E"},
      {classid:"",cource:"2-M"},
      {classid:"",cource:"2-C"}
    ],
    list3:[
      {classid:"20160401",cource:"3-J"},
      {classid:"",cource:"3-D"},
      {classid:"",cource:"3-E"},
      {classid:"",cource:"3-M"},
      {classid:"",cource:"3-C"}
    ],
    list4:[
      {classid:"",cource:"4-J"},
      {classid:"",cource:"4-D"},
      {classid:"",cource:"4-E"},
      {classid:"",cource:"4-M"},
      {classid:"",cource:"4-C"}
    ],
    list5:[
      {classid:"",cource:"5-J"},
      {classid:"",cource:"5-D"},
      {classid:"",cource:"5-E"},
      {classid:"",cource:"5-M"},
      {classid:"",cource:"5-C"}
    ]
    },
    v:0
    }
  },
  methods:{
    switchingClass(){
      this.classes.list0.forEach((e,i)=>{
        this.classes.list0[i]=this.classes.list2[i]
      })
      //this.homeroom="aaa"
      //this.classes.list0.forEach((e,i)=>{
        //if(element[0].id==="list1"){
        //   this.classes.list0[i]=this.classes.list2[i]
        //}
        /*switch (element[i].id) {
          case 'list1':this.classes.list0[i]=this.classes.list1[i]
                       break
          case "list2":this.classes.list0[i]=this.classes.list2[i]
                       break
          case "list3":this.classes.list0[i]=this.classes.list3[i]
                       break
          case "list4":this.classes.list0[i]=this.classes.list4[i]
                       break
          case "list5":this.classes.list0[i]=this.classes.list5[i]
                       break
        }*/
      //})
    },
    switchingClassTable(){
      this.list1[1].cource = "aa"
      this.homeroom = this.items
    },
    refreshValue(element){
    }
  },
}
</script>

<style>
body{
  background-color: #d0ae88ff;
}
</style>

<style scoped>
.p{
  border: 2px solid orange;
  background-color: yellow;
}
.sitayose{
  margin-top: 17%;
}
#grid{
  display: grid;
  grid-template-rows:5% 5%;
  grid-template-columns:1fr 1fr 1fr 1fr 1fr;
  text-align: center;
}
</style>

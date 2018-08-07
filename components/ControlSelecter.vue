<template>
  <div id="grid" style="margin-left:5px;margin-right:5px">
    <button v-for="(item, index) in grade" @click="switchingClassTable(index)" class="sitayose p">
      {{item.classes}}
    </button>
    <a :href=item.classid v-for="(item, index) in classes.list0" @click="switchingClass(index)" class="p">
      {{item.cource}}
    </a>
    <div>
      {{url}}
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default{
  data:()=>{
    return{
    url:"",
    //dbからのclassidでやるべきだけどとりあえずの実装
    grade:[
      {id:1,classes:"1年"},
      {id:2,classes:"2年"},
      {id:3,classes:"3年"},
      {id:4,classes:"4年"},
      {id:5,classes:"5年"}
    ],
    classes:{
    list0:[
      {classid:"404",cource:"学年を選択してください"},
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
    }
    }
  },
  methods:{
    switchingClassTable(element){
      this.classes.list0.forEach((e,i)=>{
        switch (element) {
          case 0:this.classes.list0[i].classid=this.classes.list1[i].classid
                       this.classes.list0[i].cource=this.classes.list1[i].cource
                       break
          case 1:this.classes.list0[i].classid=this.classes.list2[i].classid
                       this.classes.list0[i].cource=this.classes.list2[i].cource
                       break
          case 2:this.classes.list0[i].classid=this.classes.list3[i].classid
                       this.classes.list0[i].cource=this.classes.list3[i].cource
                       break
          case 3:this.classes.list0[i].classid=this.classes.list4[i].classid
                       this.classes.list0[i].cource=this.classes.list4[i].cource
                       break
          case 4:this.classes.list0[i].classid=this.classes.list5[i].classid
                       this.classes.list0[i].cource=this.classes.list5[i].cource
                       break
        }
      })
    },
    switchingClass(index){
      this.url = this.classes.list0[index].classid
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

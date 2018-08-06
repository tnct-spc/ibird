<template>
  <div id="grid" style="margin-left:5px;margin-right:5px">
    <button v-for="item in list" @click="switchingClass()" class="sitayose p">
      {{item.classes}}
    </button>
    <button v-for="item in list2" @click="switchingClass()" class="p">
      {{item.cource}}
    </button>
    <div style="text-align:center">
      {{message}}
    </div>
  </div>
</template>

<script>
export default{
  props: ["v", "val"],
  data:()=>{
    return{
    text:"",
    message:"",
    list:[
      {id:1,classes:"1年"},
      {id:2,classes:"2年"},
      {id:3,classes:"3年"},
      {id:4,classes:"4年"},
      {id:5,classes:"5年"}
    ],
    list2:[
      {id:1,cource:"J"},
      {id:2,cource:"D"},
      {id:3,cource:"E"},
      {id:4,cource:"M"},
      {id:5,cource:"C"}
    ],
    v:0
    }
  },
  methods:{
    switchingClass(){
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

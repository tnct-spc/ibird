<template>
  <div id="grid" style="margin-left:5px;margin-right:5px">
    <p v-for="item in list" @click="ihi" class="sitayose">
      {{item.classes}}
    </p>
    <P v-for="item in list2" @click="ihi">
      {{item.cource}}
    </P>
  </div>
</template>

<script>
export default{
  data:()=>{
    return{
    list:[
      {classes:"1年"},
      {classes:"2年"},
      {classes:"3年"},
      {classes:"4年"},
      {classes:"5年"}
    ],
    list2:[
      {cource:"J"},
      {cource:"D"},
      {cource:"E"},
      {cource:"M"},
      {cource:"C"}
    ]
    }
  },
  methods:{
    ihi(){
    }
  },
}
</script>

<style>
body{
  background-color: #d0ae88ff
}
</style>

<style scoped>
p{
  border: 2px solid orange;
  background-color: yellow;
}
.sitayose{
  margin-top: 5%;
}
.hidariyose{
  margin-right: 5%;
}
.migiyose{
  margin-left: 5%;
}
#grid{
  display: grid;
  grid-template-rows:5% 5%;
  grid-template-columns:1fr 1fr 1fr 1fr 1fr;
  text-align: center;
}
</style>

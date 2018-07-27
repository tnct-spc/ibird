<template>
  <section>
   <div>
     <p>
       {{info}}
     </p>
     <p>
       {{classes}}
     </p>
     <P>
       {{documents}}
     </P>
   </div>
  </section>
</template>
<script>
import axios from 'axios'
let dir
let results
let tmp
let documents

export default{
  data:()=>{
    return {
      documents: null,
      classes:null,
      info:null
    }
  },
  mounted(){
    dir = location.href.split("/")[4]
    axios.get('../api/classes')
    .then((response) => {
        results = response.data
        for(let i in results){
          if(dir.toUpperCase() == results[i].name){
              this.info="success"
              tmp = results[i]
              this.classes = tmp.name
              break
          }
          else{
              this.info = "error"
              this.classes = "クラスがないよ〜"
              this.documents = "documentsがないよ〜"
          }
        }
        let documents = ""
        for(let i in tmp.douments){
        documents = documents + tmp.douments[i].docid
        }
        documents = "このクラスのドキュメントは" + documents
        this.documents=documents
      })
      .catch( error => {
        console.log(error)
      })
    },
  }
</script>
<style>
  body{
    background-image: url("img/background.png")
  }
</style>
<style scoped>
  p{
    text-align:center
  }
</style>

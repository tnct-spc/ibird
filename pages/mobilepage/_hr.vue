<template>
  <div class="home" v-if="display">
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Documents</th>
          <th>{{classid}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(document) in documents">
          <td>{{documents.indexOf(document)}}</td>
          <td>{{document.docid}}</td>
          <td>
            <button class="btn btn-primary" v-on:click="seeDocument(document.docid)">See</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-else>
    <h1>seeDocument</h1>
    <img width="100%"v-bind:src="'/jpg/'+img+'.jpg'"></img>
    <div align="right" >
      <button class="btn btn-primary text-right" v-on:click="display=true">back</button>
    </div>
  </div>
</template>
<script>
import axios from 'axios'

export default{
  data(){
    return{
      display:true,
      img:'20180403',
      classid:null
    }
  },
  //リスト更新
  asyncData ({ params, error }) {
    let newId
    return axios.get('http://'+ process.env.mainUrl + '/api/class-docs?classid='+params.hr).then(res =>{
      let docList = res.data
      return {
        documents: docList
      }
    })
  },
  methods:{
    //ドキュメント閲覧
    seeDocument:function(document_docid){
      this.display=false
    },
  },
}
</script>
<style>
</style>

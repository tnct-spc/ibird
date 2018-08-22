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
            <button class="btn btn-primary" v-on:click="seeDocument(document)">See</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-else>
    <h1>seeDocument</h1>
    <p>{{hoge}}</p>
    </p>
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
      classid:null,
      hoge:'bbbbbbb'
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
    seeDocument(document){
      this.display=false
      this.hoge=document
      this.img=document.docid
    },
  },
}
</script>
<style>
</style>

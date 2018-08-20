<template>
  <table id="Documents-index" class="table table-striped">
    <thead>
      <tr>
        <th>Documents</th>
        <th>{{classid}}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="document in documents">
        <td>{{document.docid}}</td>
        <td>
          <div class="btn btn-danger" v-on:click="seeDocument(document.id)">See</div>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import axios from 'axios'

export default{
  data(){
    return{
      classid:'',
      documents:[
        {id:1,docid:'sample01'},
        {id:2,docid:'sample02'},
      ],
      newDocument:'',
    }
  },
  //リスト更新
  asyncData ({ params, error }) {
    //return axios.get('http://' +process.env.mainUrl + '/api/classes-list').then(res =>{
    return axios.get('http://'+ process.env.mainUrl + '/api/class-docs?classid='+params.hr).then(res =>{
      let docList = res.data
      return {
        classid:params.hr/*documentList*/,
        documents: docList
      }
    })
  },
  methods:{
    //ドキュメント閲覧
    seeDocument(document_id){
      this.documents.forEach(function (document) {
        if (document.id === document_id) {
        }
      })
    },
  },
}
</script>
<style>
</style>

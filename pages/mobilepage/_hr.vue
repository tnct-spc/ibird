<template>
  <div class="home" v-if="display">
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
            <div class="btn btn-danger" v-on:click="seeDocument()">See</div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-else>
    <h1>hoge</h1>
    <img src=""></img>
  </div>
</template>
<script>
import axios from 'axios'

export default{
  data(){
    return{
      display:true,
    }
  },
  //リスト更新
  asyncData ({ params, error }) {
    return axios.get('http://'+ process.env.mainUrl + '/api/class-docs?classid='+params.hr).then(res =>{
      let docList = res.data
      return {
        classid:params.hr,
        documents: docList
      }
    })
  },
  methods:{
    //ドキュメント閲覧
    seeDocument(){
    },
  },
}
</script>
<style>
</style>

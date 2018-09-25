<template>
  <div class="home" v-if="display">
    <table class="table table-striped">
      <thead>
        <tr>
          <th>DocumentsList</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(document) in documents">
          <td>{{document.title}}.{{ext}}</td>
          <td>
            <button class="btn btn-primary" v-on:click="seeDocument(document)">See</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-else>
    <table class="table table-striped">
      <th>Document</th>
      <tr><img width="100%"v-bind:src="'/jpg/'+img+'.'+ext"></img></tr>
      <tr>
        <div align="right" >
          <button class="btn btn-primary text-right" v-on:click="display=true">back</button>
        </div>
      </tr>
    </table>
  </div>
</template>
<script>
import axios from 'axios'

export default{
  data(){
    return{
      display:true,
      ext:'jpg',
    }
  },
  //リスト更新
  asyncData ({ params, error }) {
    return axios.get('http://localhost:3000/api/class-docs-mobile',{
      params: { classid: params.hr }
    }).then(res =>{
      return {
        documents:res.data
      }
    })
  },
  methods:{
    //ドキュメント閲覧
    seeDocument(document){
      this.display=false
      this.img=document.docid
    },
  },
}
</script>
<style>
</style>

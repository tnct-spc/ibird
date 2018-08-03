<template>
  <table id="Documents-index" class="table table-striped">
    <thead>
      <tr>
        <th>Documents</th>
        <th>{{hoge}}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="document in documents">
        <td>{{document.name}}</td>
        <td>
          <div class="btn btn-danger" v-on:click="seeDocument(document.id)">See</div>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
export default{
  data(){
    return{
      hoge:'hello,world!',
      documents:[
        {id:1,name:'sample01'},
        {id:2,name:'sample02'},
      ],
      newDocument:'',
    }
  },

}
</script>
<style>
</style>

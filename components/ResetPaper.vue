<template>
  <section>
    <div class="d-block text-center">
      <h3>掲載終了日の変更</h3>
      <label>掲載終了日</label>
      <input type="date" v-model="endDate"/>
      <b-form-group label="<code>優先</code>">
        <b-form-radio-group
        buttons
        button-variant="outline-primary"
        v-model="priority"
        :options="option"/>
      </b-form-group>
      <b-form-checkbox style="display:block;margin-top:2%" v-model="openMobile">モバイル向けサイトでも公開</b-form-checkbox>
      <span v-if="openMobile">モバイル向けサイトでの表示名 </span>
      <input v-if="openMobile" v-model="title" placeholder="掲示物の表示名を入力">
      <button class="btn btn-primary" @click="submit">
        変更
      </button>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
export default {
  data:function(){
    return{
      option:[{text:"しない",value:0},{text:"する",value:1}],
      priority: 0,
      endDate: '',
      title: '',
      openMobile: true,
      selected: true
    }
  },
  props: {
    "docid": String
  },
  computed: {
  },
  mounted: function(){
    axios.get(process.env.httpUrl + '/api/doc', {
      params: {
        docid: this.docid
      }
    })
    .then((res) => {
      console.log(res.data)
      this.endDate = res.data.endTime
      console.log(res.data.endTime)
      this.priority = res.data.priority
      this.title = res.data.title
      this.openMobile = res.data.openMobile
    })
  },
  methods: {
    submit: function(){
      const params = {
                     'endTime':this.endDate,
                     'priority':this.selected,
                     'title': this.title,
                     'openMobile': this.openMobile,
                     'docid': this.docid
                      }
      axios.post(process.env.httpUrl + '/api/doc',params)
      .then((response)=>{
      })
      .catch(e=>{
        console.log(e)
      })
    }
  }
}
</script>

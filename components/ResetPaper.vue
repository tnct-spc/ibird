<template>
  <section v-if="changed">
    <div class="d-block text-center">
      <h3>掲示物の再設定</h3>
      <div class="block my-5 text-center">
        <table style="width:500px;margin:100px auto;">
          <tbody>
            <tr>
              <td style="text-align:left;">
                <b-form-checkbox
                  id="checkbox1"
                  @input="selectAll()"
                  v-model="all">
                  全て
                </b-form-checkbox>
              </td>
              <td
                style="text-align:left;"
                v-for="(item ,key) in checkYear"
                :key="key">
                <b-form-checkbox
                  @input="selectYear(key)"
                  v-model="checkYear[key]">
                  {{key}}年
                </b-form-checkbox>
              </td>
            </tr>
            <tr>
              <td
                style="text-align:left;display:block"
                v-for="(item,key) in checkCourse"
                :key = "key">
                <b-form-checkbox
                  @input="selectCourse(key)"
                  v-model="checkCourse[key]">
                  {{key}}科
                </b-form-checkbox>
              </td>
              <td
                style="text-align:left;"
                v-for="(item1 ,key) in classIdList">
                <b-form-checkbox
                  style="display:block"
                  v-for = "(item2) in classIdList[key]"
                  v-model = "item2.submit"
                  :key = "item2.classid">
                  {{key}}{{item2.course}}
                </b-form-checkbox>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
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
      selected: true,
      all: false,
      changed: false,
      submitId:[],
    }
  },
  props: {
    "classIdList": Object,
    "docid": String,
    "checkYear": Object,
    "checkCourse": Object,
    "paperData": Object,
    "selectedClassId": Array,
  },
  computed: {
  },
  created: function(){
  },
  watch: {
    paperData: function(){
      this.changed = true
      this.endDate = this.paperData.endTime
      this.priority = this.paperData.priority
      this.title = this.paperData.title
      this.openMobile = this.paperData.openMobile
    },
    selectedClassId: function(){
      this.selectedClassId.forEach((e)=>{
        Object.keys(this.classIdList).forEach((k)=>{
          this.classIdList[k].forEach((j)=>{
            j.submit = false
          })
        })
      })
      this.selectedClassId.forEach((e)=>{
        Object.keys(this.classIdList).forEach((k)=>{
          this.classIdList[k].forEach((j)=>{
            if(e===j.classid) j.submit = true
          })
        })
      })
      Object.keys(this.checkYear).forEach((e)=>{
        this.checkYear[e] = false
      })
      Object.keys(this.checkCourse).forEach((e)=>{
        this.checkCourse[e] = false
      })
      this.all = false
    }
  },
  methods: {
    submit: function(){
      this.changeClassId()
      const params = {
                     'endTime':this.endDate,
                     'priority':this.priority,
                     'title': this.title,
                     'openMobile': this.openMobile,
                     'docid': this.docid
                      }
      axios.put(process.env.httpUrl + '/api/doc',params)
      .then((response)=>{
      })
      .catch(e=>{
        console.log(e)
      })
    },
    changeClassId(){
      this.submitId.length = 0
      Object.keys(this.classIdList).forEach((e)=>{
        this.classIdList[e].forEach((i)=>{
            if(i.submit === true) this.submitId.push(i.classid)
        })
      })
      this.submitId.sort((a,b)=>{
        return a - b
      })
      if(this.submitId.length === 0||JSON.stringify(this.submitId)===JSON.stringify(this.selectedClassId)){
        if(this.submitId.length === 0){
          alert("クラスを選択してください")
        }
        return
      }
      axios.put(process.env.httpUrl + '/api/doc-class',{
        docid:this.docid,
        classids:this.submitId
      })
      .catch((err)=>{
        console.log(err)
      })
      this.$refs.changeClassIdModalRef.hide()
    },
    selectYear(key){
      if(this.checkYear[key] === false){
        this.classIdList[key].forEach((e)=>{
          e.submit = false
        })
      }
      else if(this.checkYear[key] === true){
        this.classIdList[key].forEach((e)=>{
          e.submit = true
        })
      }
    },
    selectCourse(key){
      if(this.checkCourse[key] === true){
        Object.keys(this.classIdList).forEach((e)=>{
          this.classIdList[e].forEach((i)=>{
            if(i.course===key)i.submit=true
          })
        })
      }
      else{
        Object.keys(this.classIdList).forEach((e)=>{
          this.classIdList[e].forEach((i)=>{
            if(i.course===key)i.submit=false
          })
        })
      }
    },
    selectAll(){
      if(this.all === false){
        Object.keys(this.classIdList).forEach((e)=>{
          this.classIdList[e].forEach((i)=>{
            i.submit = false
          })
        })
      }
      else{
        Object.keys(this.classIdList).forEach((e)=>{
          this.classIdList[e].forEach((i)=>{
            i.submit = true
          })
        })
      }
    }
  }
}
</script>

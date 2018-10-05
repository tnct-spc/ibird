<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
       <div class="modal-header"/>
        <div class="modal-body">
          <div id="style">
           <div class="my-2"><mark>ファイル名 : {{title}}</mark></div>
           <table style="width:500px;margin:0 auto;">
            <tbody>
            <tr>
            <td style="text-align:left;">
              <b-form-checkbox
                     @input="selectAll()"
                     v-model="all">
                     全て
              </b-form-checkbox>
            </td>
            <td
            style="text-align:left;"
            v-for="(item ,key ,index) in checkYear"
            :key="key">
                <b-form-checkbox
                @input="selectYear(index+1)"
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
            v-for="(item1 ,key ,index) in classIdList">
                <b-form-checkbox
                style="display:block"
                v-for = "(item2) in classIdList[index+1]"
                v-model = "item2.submit"
                :key = "item2.classid">
                {{key}}{{item2.course}}
                </b-form-checkbox>
            </td>
            </tr>
            </tbody>
           </table>
          </div>
         <div>
         <div id="style">
         <label>掲載開始日</label>
         <input type="date" v-model="startDate"/>
         </div>
         <div id="style">
         <label>掲載終了日</label>
         <input type="date" v-model="endDate"/>
         </div>
         <div id="style">
         </div>
         <div id="style">
         <!--div class="btn-group" data-toggle="buttons" style="display:inline">
          <label class="btn btn-secondary" v-for="item in priority">
           <input type="radio" :value=item.value v-model="selected">{{item.text}}
          </label>
         </div>
         <b-form-group>
         <b-form-checkbox-group buttons v-model="selected" :options="priority">
           {{selected}}
         </b-form-checkbox-group>
         </b-form-group-->
         <b-form-group label="<code>優先</code>">
         <b-form-radio-group
                          buttons
                          button-variant="outline-primary"
                          v-model="selected"
                          :options="priority"/>
         </b-form-group>
         </div>
         <div id="style">
          <b-form-checkbox style="display:block;margin-top:2%" v-model="openMobile">モバイル向けサイトでも公開</b-form-checkbox>
          <span v-if="openMobile">モバイル向けサイトでの表示名 </span>
          <input v-if="openMobile" v-model="title" placeholder="掲示物の表示名を入力">
         </div>
         </div>
         </div>
          <div class="modal-footer">
            <button class="btn btn-secondar mr-auto btn-primary" @click="cancel()">
              キャンセル
            </button>
            <button class="btn btn-primary" @click="submit()">
              アップロード
            </button>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import { w3cwebsocket } from 'websocket'

export default{
  props:{
   "classes":Array,
   "docid":String,
   "filename":String,
   "checkCourse":Object,
   "checkYear":Object
  },
  data:()=>{
   return{
    selected:0,
    startDate:null,
    endDate:null,
    classIdList:{},
    submitId:[],
    today:0,
    month:"",
    day:"",
    date:{},
    title: '',
    openMobile: true,
    priority:[{text:"しない",value:0},{text:"する",value:1}],
    all:false
   }
  },
  mounted(){
    this.date = new Date()
    this.month = this.date.getMonth()+1
    this.day = this.date.getDate()
    if(this.month<10) this.month = "0" + this.month
    if(this.day<10) this.day = "0" + this.day
    this.today = [this.date.getFullYear(),this.month,this.day]
    this.startDate = this.date.getFullYear()+"-"+this.month+"-"+this.day
    this.date.setDate((Number(this.day)+7))
    if(this.date.getDate()<this.day)this.month++
    this.day = this.date.getDate()
    if(this.day<10) this.day = "0" + this.day
    this.endDate = this.date.getFullYear()+"-"+this.month+"-"+this.day
    this.classes.sort((a,b)=>{
    return a.classid - b.classid
    })
    Object.keys(this.checkCourse).forEach((e,i)=>{
      console.log(e)
      this.classes.forEach((c)=> {
        if(!this.classIdList[c.year]){
          Vue.set(this.classIdList, c.year, [])
        }
        if(e === c.course){
          this.classIdList[c.year].push({classid: c.classid, course: e, submit:false})
        }
      })
    })
    this.title = this.filename
  },
  methods:{
    cancel(){
      this.$parent.showModal=false
    },
    submit(){
      this.date = new Date()
      this.month = this.date.getMonth()+1
      this.day = this.date.getDate()
      if(this.month<10) this.month = "0" + this.month
      if(this.day<10) this.day = "0" + this.day
      const checker = this.today.join('-')
      Object.keys(this.classIdList).forEach((e)=>{
        this.classIdList[e].forEach((i)=>{
            if(i.submit === true) this.submitId.push(i.classid)
        })
      })
      if(this.submitId.length === 0||this.endDate === null
        ||this.startDate >= this.endDate||checker > this.startDate){
        if(this.submitId.length === 0){
          alert("クラスを選択してください")
        }
        if(this.endDate === null){
          alert("掲載開始日、終了日を入力してください")
        }
        if(this.startDate >= this.endDate){
          alert("掲載開始日より前に終了日を設定することはできません")
        }
        if(checker > this.startDate){
          alert("掲載開始日を"+this.date.getFullYear()+"年"+this.month+"月"+this.date.getDate()+"日より前には設定できません")
        }
        this.submitId.length = 0
        return
      }
      const formData2 = {
                        'x': 0,
                        'y': 0,
                        'startTime':this.startDate,
                        'endTime':this.endDate,
                        'priority':this.selected,
                        'classids':this.submitId,
                        'title': this.title,
                        'openMobile': this.openMobile
                        }
      formData2.docid = this.docid
      console.log(this.docid)
      axios.post('../api/docs',formData2)
      .then((response)=>{
        console.log("add-doc")
      })
      .catch(e=>{
        console.log(e)
      })
      this.$parent.showModal = false
      this.$emit('submit')
    },
    selectYear(index){
      if(this.checkYear[index] === false){
        this.classIdList[index].forEach((e)=>{
          e.submit = false
        })
      }
      else if(this.checkYear[index] === true){
        this.classIdList[index].forEach((e)=>{
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
<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 650px;
  margin: 10px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-body {
  margin: 0 0;
}

#style{
  text-align: center;
  margin-top: 2%;
}
</style>

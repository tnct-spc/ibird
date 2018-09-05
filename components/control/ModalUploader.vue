<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
       <div class="modal-header"/>
        <div class="modal-body">
          <div id="style">
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
                @input="selectCource(key)"
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
         <b-form-group label="<code>優先度</code>">
         <b-form-radio-group
                          buttons
                          button-variant="outline-primary"
                          v-model="selected"
                          :options="priority"/>
         </b-form-group>
         </div>
         <div id="style">
          <span>タイトル</span>
          <input v-model="title" placeholder="掲示物のタイトルを入力">
          <b-form-checkbox style="display:block;margin-top:2%" v-model="openMobile">モバイル向けサイトでも公開</b-form-checkbox>
         </div>
         </div>
         </div>
          <div class="modal-footer">
            <button class="btn btn-secondar mr-auto btn-primary" @click="$emit('close')">
              やっぱりやめる
            </button>
            <button class="btn btn-primary" @click="submit()">
              ドキュメントの提出
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
   "files":Object
  },
  data:()=>{
   return{
    selected:0,
    startDate:null,
    endDate:null,
    classIdList:{},
    checkYear:{},
    checkCourse:{},
    submitId:[],
    month:"",
    day:"",
    date:{},
    title: '',
    openMobile: true,
    priority:[{text:"なし",value:0},{text:"あり",value:1}],
    course:[],
    all:false,
    class_matrix: {}
   }
  },
  mounted(){
    this.classes.forEach((c)=> {
      if(!this.course[c.course]){
        this.course.push(c.course)
      }
    })
    this.date = new Date()
    this.month = this.date.getMonth()+1
    this.day = this.date.getDate()
    if(this.month<10) this.month = "0" + this.month
    if(this.day<10) this.day = "0" + this.day
    const today = [this.date.getFullYear(),this.month,this.day]
    this.startDate = this.date.getFullYear()+"-"+this.month+"-"+this.day
    this.endDate = this.date.getFullYear()+"-"+this.month+"-"+String(Number(this.day)+7)
    this.classes.sort((a,b)=>{
    return a.classid - b.classid
    })
    this.classes.forEach((c)=> {
      if(!this.classIdList[c.year]){
        Vue.set(this.classIdList, c.year, [])
      }
      this.classIdList[c.year].push({classid: c.classid, course: c.course, submit:false})
    })
    Object.keys(this.classIdList).forEach((e)=>{
      Vue.set(this.checkYear,e,false)
    })
    this.course.forEach((e)=>{
      Vue.set(this.checkCourse,e,false)
    })
    this.title = this.files.files.name
  },
  methods:{
    submit(){
      this.date = new Date()
      this.month = this.date.getMonth()+1
      this.day = this.date.getDate()
      if(this.month<10) this.month = "0" + this.month
      if(this.day<10) this.day = "0" + this.day
      const today = [this.date.getFullYear(),this.month,this.day]
      const checker = today.join('-')
      Object.keys(this.classIdList).forEach((e)=>{
        this.classIdList[e].forEach((i)=>{
            if(i.submit === true) this.submitId.push(i.classid)
        })
      })
      if(this.submitId.length === 0||this.endDate === null
        ||this.startDate >= this.endDate){
        if(this.submitId.length === 0){
          alert("クラスを選択してください")
        }
        if(this.endDate === null){
          alert("掲載開始日、終了日を入力してください")
        }
        if(this.startDate >= this.endDate){
          alert("掲載開始日より前に終了日を設定することはできません")
        }
        this.submitId.length = 0
        return
      }
      const formData = new FormData()
      formData.append( 'file', this.files.files)
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
      axios.post('../api/upload-file',formData)
      .then((response)=>{
        formData2.docid = response.data.docid
        axios.post('../api/add-doc',formData2)
        .then((response)=>{
          this.$parent.text=this.submitId
          console.log(response)
          const refresh = new w3cwebsocket(process.env.wsUrl + '/ws/refresh')
          refresh.onopen = () => refresh.send('')
        })
        .catch((error) => {
          this.$parent.text=this.submitId
          console.log(error)
        })
      })
      .catch((error) => {
        this.$parent.text=error
      })
      this.$emit('close')
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
    selectCource(key){
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
  width: 90%;
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

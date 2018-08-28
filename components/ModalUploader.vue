<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
       <div class="modal-header"/>
        <div class="modal-body">
          <div id="style">
           <b-form-checkbox
           　　　　　　　class="checkbox-inline"
                       v-for="(item ,key ,index) in obj2"
                       v-model="obj2[index+1]"
                       :key = "key"
                       @input="bulkSelection(index+1)">
                       {{key}}年
           </b-form-checkbox>
         </div>
         <div id="style2">
         <div v-for="(item1 ,key ,index) in obj">
             <b-form-checkbox
                         v-for = "(item2) in obj[index+1]"
                         v-model = "item2.submit"
                         :key = "item2.classid">
                         {{key}}-{{item2.course}}
          </b-form-checkbox>
         </div>
         </div>
         <div>
         <div id="style2">
         <label>掲載開始日</label>
         <input type="date" v-model="startDate"/>
         </div>
         <div id="style2">
         <label>掲載終了日</label>
         <input type="date" v-model="endDate"/>
         </div>
         <div id="style2">
         <span>優先度</span>
         <select v-model="selected">
          <option disabled value="">優先度を選択してください</option>
          <option>0</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
         </select>
         </div>
         <div id="style2">
          <span>タイトル</span>
          <input v-model="title" placeholder="掲示物のタイトルを入力">
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
    obj:{},
    obj2:{},
    submitId:[],
    month:"",
    date:{},
    title: ''
   }
  },
  mounted(){
    this.date = new Date()
    this.month = this.date.getMonth()+1
    if(this.month<10) this.month = "0" + this.month
    const today = [this.date.getFullYear(),this.month,this.date.getDate()]
    this.startDate = today.join('-')
    this.classes.sort((a,b)=>{
    return a.classid - b.classid
    })
    this.classes.forEach((c)=> {
      if(!this.obj[c.year]){
        Vue.set(this.obj, c.year, [])
        this.grids++
      }
      this.obj[c.year].push({classid: c.classid, course: c.course, submit:false})
    })
    Object.keys(this.obj).forEach((e)=>{
      Vue.set(this.obj2,e,false)
    })
    this.title = this.files.files.name
  },
  methods:{
    submit(){
      this.date = new Date()
      this.month = this.date.getMonth()+1
      if(this.month<10) this.month = "0" + this.month
      const today = [this.date.getFullYear(),this.month,this.date.getDate()]
      const checker = today.join('-')
      for(let obj in this.obj){
        this.obj[obj].forEach((e,i)=>{
            if(e.submit === true) this.submitId.push(e.classid)
        })
      }
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
      const formData = new FormData()
      formData.append( 'file', this.files.files)
      const formData2 = { 'x': 0,
                        'y': 0,
                        'startTime':this.startDate,
                        'endTime':this.endDate,
                        'priority':this.selected,
                        'classids':this.submitId,
                        'title': this.title }
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
    bulkSelection(index){
      if(this.obj2[index] === false){
        this.obj[index].forEach((e)=>{
          e.submit = false
        })
      }
      else if(this.obj2[index] === true){
        this.obj[index].forEach((e)=>{
          e.submit = true
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
  width: 50%;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-body {
  margin: 10% 0;
}

#style{
  text-align: center;
  grid-template-rows: 5%;
}

#style2{
  text-align: center;
  margin-top: 5%;
}
</style>

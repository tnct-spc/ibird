<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
       <div class="modal-header"/>
        <div class="modal-body">
          <div id="style">
          <div v-for="(item1,key,index) in obj2" style="margin-left:5%;display:inline">
           <b-form-checkbox
           　　　　　　　class="checkbox-inline"
                       v-for="(item) in obj2[index+1]"
                       v-model="item.check"
                       :key = "item.id"
                       @input="accept(index+1)">
                       {{item.id}}年
           </b-form-checkbox>
         </div>
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
         <input type="date"/>
         </div>
         <div id="style2">
         <label>掲載終了日</label>
         <input type="date"/>
         </div>
         <div id="style2">
         <span>優先度</span>
         <select v-model="selected">
          <option disabled value="">優先度を選択してください</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
         </select>
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
export default{
  props:{
   "classes":Array,
   "files":Object
  },
  data:()=>{
   return{
    selected: '',
    obj:{},
    obj2:{},
    submitId:[]
   }
  },
  mounted(){
    this.classes.sort((a,b)=>{
    return a.classid - b.classid
    })
    this.classes.forEach((c)=> {
      if(!this.obj[c.year]){
        Vue.set(this.obj, c.year, [])
        this.grids++
      } //最初の型を決める
      this.obj[c.year].push({classid: c.classid, course: c.course, submit:false})
    })
    Object.keys(this.obj).forEach((e)=>{
      Vue.set(this.obj2,e,[])
      this.obj2[e].push({id:e,check:false})
    })
  },
  methods:{
    submit(){
      for(let obj in this.obj){
        this.obj[obj].forEach((e,i)=>{
            if(e.submit === true) this.submitId.push(e.classid)
        })
      }
      console.log(this.submitId)
      const formData = new FormData()
      formData.append( 'file', this.files.files)
      const str = this.submitId.join(',');
      console.log(this.submitId)
      formData.append('classids',"["+str+"]")
      axios.post('../api/upload-file',formData)
      .then((response)=>{
        this.$parent.text="classid:"+str
      })
      .catch((error) => {
        this.$parent.text=str
      })
      this.$emit('close')
    },
    accept(index){
      let checked = 0
      let count = 0
      this.obj[index].forEach((e)=>{
        count++
        if (e.submit == true) checked++
      })
      if(count === checked){
        this.obj[index].forEach((e)=>{
          e.submit = false
        })
      }
      else{
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
}
</style>

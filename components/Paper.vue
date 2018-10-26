<template>
  <div id="paper" 
    @contextmenu.prevent="openremovemenu"
    @mousedown="startFollow"
    @mouseup="stopFollow"
    @mouseout="stopFollow"
    ref="fieldElm">

    <!-- <p>{{ this.paper }}</p> -->
    <!-- <p>{{ controlSelecterSize }}</p> -->
    <img class="paper" :src="paper.imgUrl" id="drag"
      alt="" :style="{
        left: (this.paper.x*this.bbFieldSize.x/10000)+'px',
        top: (this.paper.y*this.bbFieldSize.y/10000)+'px',
        'max-width': 20.6767 * paper.sizeX / 1171 + '%',
        'z-index': paper.overlapPriority + zIndexPlus,
        //left: '0px',
        //top: '0px'
        }" ondragstart="return false;" >
    <b-list-group id="right-click-menu" tabindex="-1" v-if="showMenu" @blur="closeMenu" :style="{top: menuTop+'px', left: menuLeft+'px'}">
      <b-list-group-item button @click="remove">このクラスのみで削除</b-list-group-item>
      <b-list-group-item button @click="removeInAllClass">全てのクラスで削除</b-list-group-item>
      <b-list-group-item button @click="showResetPaperModal">掲示物の再設定</b-list-group-item>
      <b-list-group-item button @click="showDownloadUrl">ダウンロードリンクの取得</b-list-group-item>
      <b-list-group-item button @click="closeMenu">キャンセル</b-list-group-item>
    </b-list-group>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import axios from 'axios'
import { w3cwebsocket } from 'websocket'
import { setTimeout } from 'timers';
const W3cwebsocket = w3cwebsocket

export default {
  data:function(){
    return{
      menuTop: 1000,
      menuLeft: 1000,
      showMenu: false,
      zIndexPlus: 0
    }
  },
  props: {
    "classid": String,
    "paper": {},
    "wsClient": {}
  },
  computed: {
    ...mapState({
      cursorOffset: 'cursorOffset',
      bbFieldSize: 'bbFieldSize',
      BBxy: 'BBxy'
    })
  },
  methods: {
    ...mapMutations({
      selectedcard: 'selectCard',
      setCursorOffset: 'setCursorOffset'
    }),
    startFollow: function(e){
      this.setCursorOffset({x: e.offsetX, y: e.offsetY})
      this.selectedcard({docid: this.paper.docid})
      document.addEventListener('mousemove',this.mousemove)
      this.zIndexPlus = 100
    },
    stopFollow: function(e){
      this.savePosition()
      this.saveOrder()
      this.selectedcard({docid: null})
      document.removeEventListener('mousemove',this.mousemove)
      this.zIndexPlus = 0
    },
    mousemove: function(e){
      if(this.showMenu) return
      if(this.paper.isSelected){
        const x=(e.pageX-this.cursorOffset.x)*10000/this.bbFieldSize.x
        this.wsClient.send(JSON.stringify({
          classid: this.classid,
          docid: this.paper.docid,
          x: x<0?0:x,
          y: (e.pageY-this.cursorOffset.y - this.BBxy.y)*10000/this.bbFieldSize.y,
          // y: (e.y-this.cursorOffset.y)*10000/this.bbFieldSize.y,
        }))
      }
    },
    openremovemenu: function(e){
      this.showMenu = true
      this.menuTop = e.y - this.BBxy.y + window.pageYOffset
      this.menuLeft = e.x
      return false
    },
    closeMenu: function(){
      setTimeout(()=>{this.showMenu=false},100)
      //this.showMenu = false
    },
    changeEndDateModal: function(){
      axios.get(process.env.httpUrl + '/api/doc-end-time', {
        params: {
          docid: this.paper.docid
        }
      })
      .then((res)=>{
        let currentEndDate = res.data
        currentEndDate = currentEndDate.split('/')
        this.$parent.endDate = currentEndDate.join('-')
        this.$parent.selectedDocid = this.paper.docid
        this.closeMenu()
        this.$parent.$refs.changeEndDateModalRef.show()
      })
      .catch((e)=>{
        console.log(e)
      })
    },
    showResetPaperModal: function(){
      this.$parent.selectedDocid = this.paper.docid
      axios.get(process.env.httpUrl + '/api/doc', {
        params: {
          docid: this.paper.docid
        }
      }).then(res => {
        this.$parent.paperData = res.data
        this.closeMenu()
        axios.get(process.env.httpUrl + '/api/doc-class', {
          params: {
            docid: this.paper.docid
          }
        })
        .then((res)=>{
          this.$parent.selectedDocid = this.paper.docid
          this.$parent.selectedClassId = res.data
          this.$parent.selectedClassId.sort((a,b)=>{
            return a - b
          })
          this.$nextTick(() => {
            this.$parent.showResetModal = true
          })
        })
      }).catch(e => {
        console.log(e)
      })

    },
    changeClassIdModal: function(){
      axios.get(process.env.httpUrl + '/api/doc-class', {
        params: {
          docid: this.paper.docid
        }
      })
      .then((res)=>{
        this.$parent.selectedDocid = this.paper.docid
        this.$parent.selectedClassId = res.data
        this.$parent.selectedClassId.sort((a,b)=>{
          return a - b
        })
        this.closeMenu()
        this.$nextTick(() => {
          this.$parent.$refs.changeClassIdModalRef.show()
        })
      })
      .catch((e)=>{
        console.log(e)
      })
    },
    remove: function(){
      axios.delete(process.env.httpUrl + '/api/doc', {
        params: {
          classid: this.classid,
          docid: this.paper.docid
        }
      }).then( () => {
        const c = new W3cwebsocket(process.env.wsUrl + '/ws/refresh')
        c.onopen = () => c.send('{}')
      }).catch(e =>{
        console.log(e)
      })
    },
    removeInAllClass: function(){
      axios.delete(process.env.httpUrl + '/api/docs', {
        params: {
          docid: this.paper.docid
        }
      })
    },
    savePosition: function(){
        axios.put(process.env.httpUrl + '/api/doc', {
          classid: this.classid,
          docid: this.paper.docid,
          x: this.paper.x,
          y: this.paper.y
        }).catch(e =>{
          console.log(e)
        })
    },
    saveOrder: function(){
        axios.put(process.env.httpUrl + '/api/doc', {
          classid: this.classid,
          docid: this.paper.docid,
        }).catch(e =>{
          console.log(e)
        })
    },
    upPaper: function(){
      axios.put(process.env.httpUrl + '/api/doc', {
        classid: this.classid,
        docid: this.paper.docid
      }).then( () => {
        const c = new W3cwebsocket(process.env.wsUrl + '/ws/refresh')
        c.onopen = () => c.send('{}')
      }).catch(e =>{
        console.log(e)
      })
    },
    showDownloadUrl: function(){
      this.closeMenu()
      this.$parent.downloadUrl = process.env.httpUrl + '/download/' + this.paper.docid
      this.$parent.$refs.showUrlModal.show()
    }
  }
}
</script>
<style scoped>
img.paper {
  margin: 0px;
  box-shadow: 0.5rem 0.5rem 0.5rem 0.01rem;
  border:solid 0.1rem black;
  position: absolute;
  z-index:0;
}
img.paper:hover{
  box-shadow: 0.5rem 0.5rem 0.5rem 0.01rem;
  color: #0000CC;
}

#right-click-menu{
    position: absolute;
    width: 240px;
    z-index: 100000;
}
</style>

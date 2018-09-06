<template>
  <div id="paper" @contextmenu.prevent="openremovemenu" @mousedown="mousedown" @mouseup="mouseup" ref="fieldElm">

    <!-- <p>{{ this.paper }}</p> -->
    <!-- <p>{{ controlSelecterSize }}</p> -->
    <img class="paper" :src="paper.imgUrl" id="drag"
      alt="" :style="{
        left: (this.paper.x*this.bbFieldSize.x/10000)+'px',
        top: (this.paper.y*this.bbFieldSize.y/10000)+'px',
        //left: '0px',
        //top: '0px'
        }" ondragstart="return false;" >
    <ul id="right-click-menu" tabindex="-1" v-if="showMenu" @blur="closeMenu" :style="{top: menuTop+'px', left: menuLeft+'px'}">
      <li @click="remove">削除</li>
      <li @click="closeMenu">キャンセル</li>
    </ul>
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
      wsClient: null,
      menuTop: 1000,
      menuLeft: 1000,
      showMenu: false,
    }
  },
  props: {
    "classid": String,
    "paper": {}
  },
  created (){
    const startWebsocket = () => {
      this.wsClient = new W3cwebsocket(process.env.wsUrl+'/ws/move')
      this.wsClient.onclose=()=>{
        console.log('websocket disconnect /ws/move')
        setTimeout(() =>{startWebsocket()},1000)
      }
    }
    startWebsocket()
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
    mousedown: function(e){
      this.setCursorOffset({x: e.offsetX, y: e.offsetY})
      this.selectedcard({docid: this.paper.docid})
      document.addEventListener('mousemove',this.mousemove)
    },
    mouseup: function(e){
      this.savePosition()
      this.saveOrder()
      this.selectedcard({docid: null})
      document.removeEventListener('mousemove',this.mousemove)
    },
    mousemove: function(e){
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
      console.log("for-debug")
      this.showMenu = true
      console.log(this.showMenu)
      console.log(e.x)
      console.log(e.y)
      this.menuTop = e.y - this.BBxy.y + window.pageYOffset
      this.menuLeft = e.x
      return false
    },
    closeMenu: function(){
      setTimeout(()=>{this.showMenu=false},100)
      //this.showMenu = false
    },
    remove: function(){
      axios.delete(process.env.httpUrl + '/api/rm-doc', {
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
    savePosition: function(){
        axios.put(process.env.httpUrl + '/api/fix-position', {
          classid: this.classid,
          docid: this.paper.docid,
          x: this.paper.x,
          y: this.paper.y
        }).catch(e =>{
          console.log(e)
        })
    },
    saveOrder: function(){
        axios.put(process.env.httpUrl + '/api/order-doc', {
          classid: this.classid,
          docid: this.paper.docid,
        }).catch(e =>{
          console.log(e)
        })
    },
    upPaper: function(){
      axios.put(process.env.httpUrl + '/api/order-doc', {
        classid: this.classid,
        docid: this.paper.docid
      }).then( () => {
        const c = new W3cwebsocket(process.env.wsUrl + '/ws/refresh')
        c.onopen = () => c.send('{}')
      }).catch(e =>{
        console.log(e)
      })
    }
  }
}
</script>
<style scoped>
img.paper {
  margin: 0px;
  box-shadow: 0.5rem 0.5rem 0.5rem 0.01rem;
  border:solid 0.1rem black;
  max-width: 15%;;
  position: absolute;
  z-index:0;
}
img.paper:hover{
  box-shadow: 0.5rem 0.5rem 0.5rem 0.01rem;
  color: #0000CC;
}
#right-click-menu{
    background: #FAFAFA;
    border: 1px solid #BDBDBD;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12);
    display: block;
    list-style: none;
    margin: 0;
    padding: 0;
    position: absolute;
    width: 250px;
    z-index: 999999;
}

#right-click-menu li {
    border-bottom: 1px solid #E0E0E0;
    margin: 0;
    padding: 5px 35px;
}

#right-click-menu li:last-child {
    border-bottom: none;
}

#right-click-menu li:hover {
    background: #1E88E5;
    color: #FAFAFA;
}
</style>

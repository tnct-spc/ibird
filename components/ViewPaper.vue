<template>
  <section>
    <div class="modal-mask" @click="$emit('close')">
      <div class="modal-wrapper">
        <div class="modal-container" :style="style">
          <div class="modal-body">
            <img :id="docid" class="paper"
             :src="paper.imgUrl"
             :style="{
               left: (this.paper.x*this.bbFieldSize.x/10000)+'px',
               top: (this.paper.y*this.bbFieldSize.y/10000)+'px',
               }"/>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default{
  props:{
    "paper":Object,
    "docid":String
  },
  data(){
    return{
      width:0,
      height:0,
      style:""
    }
  },
  computed: {
    ...mapState({
      cursorOffset: 'cursorOffset',
      bbFieldSize: 'bbFieldSize',
      BBxy: 'BBxy'
    })
  },
  mounted(){
    const element = document.getElementById(this.docid)
    this.width = element.naturalWidth
    this.height = element.naturalHeight
    if((this.height/this.width)<0.9) this.style="max-width:"+60+"%;max-height:"+100+"%;"
    else this.style="max-width:"+30+"%;max-height:"+100+"%;"
  }
}
</script>
<style scoped>
img.paper {
  width: 100%;
  height: 100%;
}

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
  margin: 0px auto;
  padding: 10px;
  background-color: #000000;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-body {
  margin: 0 0;
}

</style>

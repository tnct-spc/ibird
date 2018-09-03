<template>
  <transition name="cacheTableModal">
    <div class="overlay" @click="$emit('close')">
      <div class="panel" @click.stop>
        <h3>CacheTableModal</h3>
        <button @click="$emit('close')">閉じる</button>
      </div>
    </div>
  </transition>
</template>

<script>
export default {

}
</script>
<style lang='scss' scoped>
.overlay {
  background: rgba(0, 0, 0, .8);
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 900;
  transition: all .5s ease;
}
 
.panel {
  width: 300px;
  height: 200px;
  background: #fff;
  padding: 20px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -150px;
  margin-top: -100px;
  transition: all .3s ease;
}
.cacheTableModal-enter,
.cacheTableModal-active {
  opacity: 0;
}
 
.cacheTableModal-enter .panel,
.cacheTableModal-leave-active .panel{
  top: -200px;
}
</style>


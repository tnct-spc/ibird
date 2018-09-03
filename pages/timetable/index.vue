<template>
<div id='app'>
  <button @click="showModal = true">モーダル表示</button>
  <modal v-if="showModal" @close="showModal = false">
    <CacheTableModal/>
  </modal>
</div>
</template>
<script>
import CacheTableModal from '~/components/timetable/CacheTableModal.vue'
export default{
  name: 'app',
  data() {
    return {
      showModal: false
    }
  },
  components: {
    CacheTableModal
  }
}
</script>
<style scoped>
</style>

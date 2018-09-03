<template>
<div>
  <button @click="openModal">モーダル表示</button>
  <cache-table-modal v-if="showModal" @close="closeModal"/>
</div>
</template>
<script>
import CacheTableModal from '~/components/timetable/CacheTableModal.vue'
export default{
  data() {
    return {
      showModal: false
    }
  },
  methods: {
    openModal() {
      this.showModal = true
    },
    closeModal() {
      this.showModal = false
    }
  },
  components: {
    CacheTableModal
  }
}
</script>
<style scoped>
</style>

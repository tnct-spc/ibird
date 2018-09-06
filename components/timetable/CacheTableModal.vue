<template>
  <b-modal id="modal1" title="時刻表設定" :visible="showModal" @hidden="close" :hide-footer="true">
    <transition name="cacheTableModal">
    <component :is="component" @add-station-view="switchAddStationView" @close="$emit('close')"/>
    </transition>
  </b-modal>
</template>

<script>
import CacheTableComponent from "./CacheTableComponent";
import AddStationComponent from "./AddStationComponent";
export default {
  props: {
    showModal: Boolean
  },
  components: {
    "cache-table-component": CacheTableComponent,
    "add-station-component": AddStationComponent
  },
  data() {
    return {
      component: "cache-table-component",
      localVisible: this.showModal
    };
  },
  methods: {
    switchAddStationView() {
      this.component = "add-station-component";
    },
    close() {
      this.component = "cache-table-component";
      this.$emit("close");
    }
  },
  watch: {
    localVisible(v) {
      if (v) {
        this.$emit("close");
      }
    }
  }
};
</script>
<style lang='scss' scoped>
.overlay {
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 900;
  transition: all 0.5s ease;
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
  transition: all 0.3s ease;
}
.cacheTableModal-enter,
.cacheTableModal-active {
  opacity: 0;
}

.cacheTableModal-enter .panel,
.cacheTableModal-leave-active .panel {
  top: -200px;
}
</style>

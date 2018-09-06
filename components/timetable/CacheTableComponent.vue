<template>
  <div>
    <stations-list :stations="cachedStations" @select="selectStation"/>
    <button class="btn" @click="$emit('add-station-view')">追加</button>
  </div>
</template>
<script>
import StationsList from "./StationsList";
export default {
  computed: {
    cachedStations() {
      return [
        {
          id: 0,
          name: "狭間"
        }
      ];
    }
  },
  components: {
    "stations-list": StationsList
  },
  methods: {
    selectStation(station) {
      this.$emit("select", station);
      this.$emit('close')
    }
  }
};
</script>

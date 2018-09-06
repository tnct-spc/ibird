<template>
  <ul>
    <li v-for="station in stations">
      <a @click="selectStation(station)">{{ station.name }}</a>
    </li>
  </ul>
</template>
<script>
export default {
  props: {
    stations: Array
  },
  methods: {
    selectStation(station) {
      this.$emit("select", station);
    }
  }
};
</script>
<style scoped>
a:hover {
  cursor: pointer;
}
</style>

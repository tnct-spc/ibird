<template>
  <div>
    <b-form-group
      description="駅名を入力してください"
      label="駅名"
      label-for="station-name"
      >
      <b-form-input name="station-name" v-model.trim="stationName"></b-form-input>
    </b-form-group>
    <stations-list :stations="foundStations" @select="selectStation" />
  </div>
</template>
<script>
import StationsList from "./StationsList";
export default {
  computed: {
    foundStations() {
      //仮
      const searching = this.stationName;
      if (!searching) {
        return [];
      }
      return [
        {
          id: 0,
          name: "狭間"
        },
        {
          id: 1,
          name: "めじろ台"
        },
        {
          id: 2,
          name: "座間"
        }
      ].filter(st => st.name.includes(searching));
    }
  },
  components: {
    "stations-list": StationsList
  },
  methods: {
    selectStation(station) {
      this.$emit("select", station);
      this.$emit("close");
    }
  },
  data() {
    return {
      stationName: ""
    };
  }
};
</script>

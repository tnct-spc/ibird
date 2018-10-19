<template>
  <section>
    <Timetable v-if="active" :stationData="timetable" :subStationData="timetable['timetable1']"/>
    <Timetable v-if="active" :stationData="timetable" :subStationData="timetable['timetable2']"/>
  </section>
</template>
<script>
import Timetable from '~/components/timetable/Timetable.vue'
import axios from 'axios'

export default {
  data:function(){
    return{
        active:false,
        timetable:null
    }
  },
  created(){
    axios.get(process.env.httpUrl + '/api/timetable')
    .then((res)=>{
       this.timetable = res.data
       this.active = true
    })
  },
  components: {
    Timetable
  },
}
</script>
<style>
</style>

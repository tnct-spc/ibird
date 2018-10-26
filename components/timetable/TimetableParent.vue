<template>
  <section>
    <b-card class="text-center">
      {{clockHour}}時 {{clockMinute}}分 {{clockSecond}}秒
    </b-card>
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
        clockHour : new Date().getHours(),
        clockMinute : new Date().getMinutes(),
        clockSecond : new Date().getSeconds(),
        active:false,
        timetable:null
    }
  },
  mounted(){
    this.clock()
  },
  methods:{
    clock : function(){
        this.clockHour = new Date().getHours(),
        this.clockMinute = new Date().getMinutes(),
        this.clockSecond = new Date().getSeconds()
        setTimeout(this.clock,100);
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

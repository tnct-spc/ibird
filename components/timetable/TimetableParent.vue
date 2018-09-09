<template>
  <section>
    <Timetable :holidayData="holidayData" :weekdaysData="weekdaysData" :weekenddaysData="weekenddaysData"/>
    <Timetable :holidayData="holidayData" :weekdaysData="weekdaysData" :weekenddaysData="weekenddaysData"/>
  </section>
</template>
<script>
import Timetable from '~/components/timetable/Timetable.vue'

export default {
  data:function(){
    return{
        holidayData: require("~/.timetable/holidays_22900_1532075792594.json"),
        weekdaysData: require("~/.timetable/weekdays_22900_1532075866616.json"),
        weekenddaysData: require("~/.timetable/weekenddays_22900_1532076033115.json")
    }
  },
  components: {
    Timetable
  },
}
</script>
<style>
</style>

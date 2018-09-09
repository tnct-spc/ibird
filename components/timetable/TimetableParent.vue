<template>
  <section>
    <Timetable :holidayData="holidayData1" :weekdaysData="weekdaysData1" :weekenddaysData="weekenddaysData1"/>
    <Timetable :holidayData="holidayData2" :weekdaysData="weekdaysData2" :weekenddaysData="weekenddaysData2"/>
  </section>
</template>
<script>
import Timetable from '~/components/timetable/Timetable.vue'

export default {
  data:function(){
    return{
        holidayData1: require("~/.timetable/holidays_22900_1532075792594.json"),
        weekdaysData1: require("~/.timetable/weekdays_22900_1532075866616.json"),
        weekenddaysData1: require("~/.timetable/weekenddays_22900_1532076033115.json"),
        holidayData2: require("~/.timetable/holidays_22900_1532075748963.json"),
        weekdaysData2: require("~/.timetable/weekdays_22900_1532076326046.json"),
        weekenddaysData2: require("~/.timetable/weekenddays_22900_1532076061582.json")
    }
  },
  components: {
    Timetable
  },
}
</script>
<style>
</style>

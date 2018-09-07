<template>
   <div class = "timetable">
        <h1>次の電車</h1>
        <p class="lineinfo">{{stationData.station,stationData.line,stationData.going}}</p>
        <p class="nowtime">現在時刻 {{ hour }}：{{ minute }} : {{ second }}</p>
  </div>
</template>

<script>
import axios from 'axios'
const holidayData = require("../.timetable/holidays_22900_1532075748963.json")
const weekdaysData = require("../.timetable/weekdays_22900_1532076326046.json")
const weekenddaysData = require("../.timetable/weekenddays_22900_1532076061582.json")

export default {
    data : function(){
        return {
            year : new Date().getFullYear(),
            day : new Date().getDate(),
            hour : new Date().getHours(),
            minute : new Date().getMinutes(),
            second : new Date().getSeconds(),
            dayOfWeek : new Date().getDay()
        }
    },
    created : function(){
        console.log(holidayData)
        this.timer();
    },
    computed : {
        stationData : function() {
            console.log(this.dayOfWeek)
            if(this.dayOfWeek == 0){
                return holidayData
            }else if(this.dayOfWeek == 6){
                return holidayData
            }else{
                return weekdaysData
            }
        }
    },
    methods : {
        timer : function(){
            this.year = new Date().getFullYear();
            this.day = new Date().getDate();
            this.hour = new Date().getHours();
            this.minute = new Date().getMinutes();
            this.second = new Date().getSeconds();
            this.dayOfWeek = new Date().getDay();
            setTimeout(this.timer,100);
        }
    },
}
</script>

<style scoped>
.timetable{
    left : 0;
    bottom : 0; 
    height : 40%;
    width : 40%;
    background-color : olivedrab;
    border : outset 1em forestgreen;
}

h1{
    color : white
  
}
.stationinfo{
    margin : 1em;
}

.traininfo{
    margin : 1em;
}

.nowtime{
    color : white;

}
</style>
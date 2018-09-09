<template>
   <div class = "timetable">
        <p class="lineinfo">{{stationData.station}} {{stationData.line}} {{stationData.going}}</p>
        <p v-for="(time, index) in nextTimes(5)" :key="index" class="traininfo">
            {{time.kind}} {{time.going}}行き {{time.hour}} : {{time.min}}
        </p>
        <p class="nowtime">{{ hour }}：{{ minute }}</p>
  </div>
</template>

<script>
import axios from 'axios'
const holidayData = require("~/.timetable/holidays_22900_1532075792594.json")
const weekdaysData = require("~/.timetable/weekdays_22900_1532075866616.json")
const weekenddaysData = require("~/.timetable/weekenddays_22900_1532076033115.json")

export default {
    data : function(){
        return {
            hour : new Date().getHours(),
            minute : new Date().getMinutes(),
            dayOfWeek : new Date().getDay()
        }
    },
    created : function(){
        console.log(this.stationData);
        this.timer();
    },
    computed : {
        stationData : function() {
            if(this.dayOfWeek == 0){
                return holidayData
            }else if(this.dayOfWeek == 6){
                return holidayData
            }else{
                return weekdaysData
            }
        },
    },
    methods : {
        nextTimes : function(elementNumber){ //何個の要素かを引数として取る
            const times = []
            var buff = null
            for(var i = 0; i< elementNumber; i++){
                console.log(i)
                if(!buff){
                    const firstTime = this.getNextTime(this.hour, this.minute)
                    times.push(firstTime)
                    buff = firstTime
                }else{
                    const time = this.getNextTime(buff.hour, buff.min)
                    times.push(time)
                    buff = time
                }
            }
            return times
        },
        getNextTime : function(nHour, nMinute){ //現在の時間と分が引数(0≦nHour≦24, 0≦nMinute≦59)
            nHour = nHour==0 ? 24 : nHour
            const times = this.stationData.timetable[nHour]
            for (var i = 0; i < times.length; i++) {
                if(times[i].min > nMinute){
                    times[i].hour = nHour
                    return times[i]
                }
            }
            var limitter = 0 //無限ループをしないため
            while(limitter<1000){
                nHour = nHour==24 ? 1 : nHour+1
                const times = this.stationData.timetable[nHour]
                if(times.length!==0){
                    times[0].hour = nHour
                    return times[0]
                }
                limitter++
            }
            return null
        },
        timer : function(){
            this.hour = new Date().getHours();
            this.minute = new Date().getMinutes();
            this.dayOfWeek = new Date().getDay();
            setTimeout(this.timer,1000);
        }
    },
}
</script>

<style scoped>
.timetable{
    background-color : olivedrab;
    border : outset 1em forestgreen;
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
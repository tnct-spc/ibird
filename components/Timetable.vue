<template>
   <div>
    <b-card :header="stationData.station + ' ' + stationData.line + ' ' + stationData.direction" no-body>
        <b-list-group flush>
            <b-list-group-item v-for="(time, index) in nextTimes(2)" :key="index">
                {{time.kind}} {{time.going}}行き {{time.hour}} : {{time.min}}
            </b-list-group-item>
        </b-list-group>
    </b-card>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    data : function(){
        return {
            year : new Date().getFullYear(),
            month : new Date().getMonth() + 1,
            day : new Date().getDate(),
            hour : new Date().getHours(),
            minute : new Date().getMinutes(),
            dayOfWeek : new Date().getDay(),
            holidays : [[1,1],[2,11],[4,29],[5,3],[5,4],[5,5],[8,11],[11,3],[11,23],[12,23],[3,this.VerinalEquinox(this.year)],[9,this.AutumnalEquinox(this.year)]],
        }
    },
    props: {
        "holidayData": Object,
        "weekdaysData": Object,
        "weekenddaysData": Object,
    },
    created : function(){
        console.log(this.stationData);
        this.timer();
    },
    computed : {
        stationData : function() {
            if(this.dayOfWeek == 6){
                return this.weekenddaysData
            }else if(this.dayOfWeek == 0
            ||this.holidays.indexOf([this.month,this.day]) != -1 || (this.month == 1 && this.dayOfWeek == 1 && 7 < this.day && this.day < 15)
            || (this.month == 7 && this.dayOfWeek == 1 && 14 < this.day && this.day < 22)
            || (this.month == 9 && this.dayOfWeek == 1 && 14 < this.day && this.day < 22)
            || (this.month == 10 && this.dayOfWeek == 1 && 7 < this.day && this.day < 15)
            || (this.SubstituteHoliday() == true)
            ){
                return this.holidayData
            }else{
                return this.weekdaysData
            }
        },
    },
    methods : {
        VerinalEquinox : function(year){
            switch(year % 4){
                case 0 : return year <= 2088 ? 20 : 19;
                break;
                case 1 : return 20;
                break;
                case 2 : return year <= 2022 ? 21 : 20;
                break;
                default : return year <= 2055 ? 21 : 20;
            }
        },
        AutumnalEquinox : function(year){
            switch(year % 4){
                case 0 : return 22;
                break;
            case 1 : return year <= 2041 ? 23 : 22
                break;
                case 2 : return year <= 2074 ? 23 : 22
                break;
                default : return 23;
            }
        },
        SubstituteHoliday : function(){
            var i = 0;
            while(false){
                if(this.holidays.indexOf([this.month,this.day - i]) == -1){
                    break;
                }else if(dayOfWeek - i != 0){
                    return true;
                    break;
                }else{
                    i++;
                }
            }
        },
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
            this.year = new Date().getFullYear();
            this.month = new Date().getMonth() + 1;
            this.day = new Date().getDate();
            this.holidays = [[1,1],[2,11],[4,29],[5,3],[5,4],[5,5],[8,11],[11,3],[11,23],[12,23],[3,this.VerinalEquinox(this.year)],[9,this.AutumnalEquinox(this.year)]];
            setTimeout(this.timer,1000);
        }
    },
}
</script>

<style scoped>
</style>
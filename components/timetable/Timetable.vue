<template>
   <div>
    <b-card :header="stationData.station + ' ' + stationData.line + ' ' + subStationData.direction" no-body>
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
            hour : new Date().getHours(),
            minute : new Date().getMinutes(),
            dayOfWeek : new Date().getDay()
        }
    },
    props: {
        "stationData": Object,
        "subStationData": Object
    },
    created : function(){
        //console.log(this.stationData)
        this.timer()
    },
    methods : {
        nextTimes : function(elementNumber){ //何個の要素かを引数として取る
            const times = []
            var buff = null
            for(var i = 0; i< elementNumber; i++){
                //console.log(i)
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
            const times = this.subStationData[nHour]
            for (var i = 0; i < times.length; i++) {
                if(times[i].min > nMinute){
                    times[i].hour = nHour
                    return times[i]
                }
            }
            var limitter = 0 //無限ループをしないため
            while(limitter<1000){
                nHour = nHour==24 ? 1 : nHour+1
                const times = this.subStationData[nHour]
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
</style>

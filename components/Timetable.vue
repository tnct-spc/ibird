<template>
   <div class = "timetable">
      <h1>次の電車</h1>
      <p v-if = "object !== undefined && holidays !== undefined" class = "lineinfo">{{object.station,object.line,object.going}}</p>
       <p v-if = "object !== undefined && holidays !== undefined" class = "traininfo">{{set.min,set.kind,set.going}}</p>
      <p class = "nowtime">現在時刻 {{ hour }}：{{ minute }}</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    name : 'Timetable',
    data :function() {
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
    computed : {
        object : function() {
            // var holidays = [[1,1],[2,11],[4,29],[5,3],[5,4],[5,5],[8,11],[11,3],[11,23],[12,23],[3,this.VerinalEquinox(this.year)],[9,this.AutumnalEquinox(this.year)]];
            // var holidaysresult = holidays.indexOf([this.month,this.day]);

            // if(this.hour < 5 && this.hour > 0){
            //     return null;
            // }

            if(this.dayOfWeek == 6){
                const params = {file : 'weekenddays_22900_1532076061582.json'};
                axios.get('/timetable',{ params })
                    .then((res) =>{
                        var o = JSON.parse(res);
                        return o;
                    });
            }else if(this.dayOfWeek == 0 ||this.holidays.indexOf([this.month,this.day]) != -1 || (this.month == 1 && this.dayOfWeek == 1 && 7 < this.day && this.day < 15)
            || (this.month == 7 && this.dayOfWeek == 1 && 14 < this.day && this.day < 22)
            || (this.month == 9 && this.dayOfWeek == 1 && 14 < this.day && this.day < 22)
            || (this.month == 10 && this.dayOfWeek == 1 && 7 < this.day && this.day < 15)
            || (this.SubstituteHoliday() == true)){
                const params = {file : 'holidays_22900_1532075748963.json'};
                axios.get('/timetable',{ params })
                    .then((res) =>{
                        var o = JSON.parse(res);
                        return o;
                    });
            } else {
                const params = {file : 'weekdays_22900_1532076326046.json'};
                axios.get('/timetable',{ params })
                    .then((res) =>{
                        var o = JSON.parse(res);
                        return o;
                    });
            }

        },
        set : function(){
            var i = 0;
            var make = object.timetable[this.hour];
                while(1){
                    if (make[i].min >= this.minute){
                        break;
                    }else if(make.length >= i){
                        make = object.timetable[this.hour + 1];
                    }else{
                        i++;
                    }
                }
                return make[i];
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
        SubstituteHoliday: function(){
            var i = 0;
            while(1){
                if(this.holidays.indexOf([this.month,this.day - i]) == -1){
                    break;
                }else if(dayOfWeek - i != 0){
                    return true;
                    break;
                }else{
                    i++;
                }
            }
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
<template>
   <div class = "timetable">
      <h1>次の電車</h1>
      <p class = "lineinfo">{{object.station,object.line,object.going}}</p>
      <p class = "traininfo">{{set.min,set.kind,set.going}}</p>
      <p class = "nowtime">現在時刻 {{ hour }}：{{ minute }}</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    name : 'Timetable',
    data () {
        return {
            year : new Date().getFullYear(),
            month : new Date().getMonth() + 1,
            day : new Date().getDate(),
            hour : new Date().getHours(),
            minute : new Date().getMinutes(),
            dayOfWeek : new Date().getDay(),
        }
    },
    computed : {
        object : function() {
            function VernalEquinox(year){
                switch(year % 4){
                    case 0 : return year <= 2088 ? 20 : 19;
                    break;
                    case 1 : return 20;
                    break;
                    case 2 : return year <= 2022 ? 21 : 20;
                    break;
                    default : return year <= 2055 ? 21 : 20;
                }
            }

            function AutumnalEquinox(year){
                switch(year % 4){
                    case 0 : return 22;
                    break;
                case 1 : return year <= 2041 ? 23 : 22
                    break;
                    case 2 : return year <= 2074 ? 23 : 22
                    break;
                    default : return 23;
                }
            }

            var holidays = [[1,1],[2,11],[4,29],[5,3],[5,4],[5,5],[8,11],[11,3],[11,23],[12,23],[3,VernalEquinox(year)],[9,AutumnalEquinox(year)]];
            var holidaysresult = holidays.indexOf([month,day]);

            function SubstituteHoliday(){
                while(1){
                    if(holidays.indexOf([month,day - i]) == -1){
                        break;
                    }else if(dayOfWeek - i != 0){
                        return true;
                        break;
                    }else{
                        i++;
                    }
                }
            }

            if(hour < 5 && hour > 0){
                return null;
            }

            if(dayOfWeek == 6){
                const params = {file : 'weekenddays_22900_1532076061582.json'};
                axios.get('/timetable',{ params })
                    .then((res) =>{
                    var o = new Object();
                        o = JSON.parse(res);
                    });
                    return o;
            }else if(dayOfWeek == 0 || holidaysresult != -1 || (month == 1 && dayOfWeek == 1 && 7 < day && day < 15)
            || (month == 7 && dayOfWeek == 1 && 14 < day && day < 22)
            || (month == 9 && dayOfWeek == 1 && 14 < day && day < 22)
            || (month == 10 && dayOfWeek == 1 && 7 < day && day < 15)
            || (SubstituteHoliday() == true)){
                const params = {file : 'holidays_22900_1532075748963.json'};
                axios.get('/timetable',{ params })
                    .then((res) =>{
                        var o = new Object();
                        o = JSON.parse(res);
                    });
                    return o;
            } else {
                const params = {file : 'weekdays_22900_1532076326046.json'};
                axios.get('/timetable',{ params })
                    .then((res) =>{
                    var o = new Object();
                    o = JSON.parse(res);
                    });
                    return o;
            }
        },

        set : function(){
            var i = 0;
            var make = object.timetable[hour];
                while(1){
                    if (make[i].min >= minute){
                       break;
                    }else if(make.length >= i){
                        make = object.timetable[hour + 1];
                    }else{
                        i++;
                    }
                }
            return make[i];
        },
    }
}
</script>

<style scoped>
.timetable{
    left : 0;
    bottom : 0; 
    height : 20%;
    width : 30%;
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
<script>
// object1 : function(){
//         function VernalEquinox(year){
//                 switch(year % 4){
//                     case 0 : return year <= 2088 ? 20 : 19;
//                     break;
//                     case 1 : return 20;
//                     break;
//                     case 2 : return year <= 2022 ? 21 : 20;
//                     break;
//                     default : return year <= 2055 ? 21 : 20;
//                 }
//         }

//             function AutumnalEquinox(year){
//                 switch(year % 4){
//                     case 0 : return 22;
//                     break;
//                 case 1 : return year <= 2041 ? 23 : 22
//                     break;
//                     case 2 : return year <= 2074 ? 23 : 22
//                     break;
//                     default : return 23;
//                 }
//         }

//             var holidays = [[1,1],[2,11],[4,29],[5,3],[5,4],[5,5],[8,11],[11,3],[11,23],[12,23],[3,VernalEquinox(year)],[9,AutumnalEquinox(year)]];
//             var holidaysresult = holidays.indexOf([month,day]);

//             function SubstituteHoliday(){
//                 while(1){
//                     if(holidays.indexOf([month,day - i]) == -1){
//                         break;
//                     }else if(dayOfWeek - i != 0){
//                         return true;
//                         break;
//                     }else{
//                         i++;
//                     }
//                 }
//             }

//             if(dayOfWeek = 6){
//                 const params1 = {file : 'weekenddays_22900_1532076033115.json'};
//                    axios.get('/timetable',{ params1 })
//                     .then((res) =>{
//                         var o = new Object();
//                     o = JSON.parse(res);
//                     });
//                     return o1;
//             }else if(dayOfWeek = 0 || holidaysresult != -1 || (month == 1 && dayOfWeek == 1 && 7 < day && day < 15)
//             || (month == 7 && dayOfWeek == 1 && 14 < day && day < 22)
//             || (month == 9 && dayOfWeek == 1 && 14 < day && day < 22)
//             || (month == 10 && dayOfWeek == 1 && 7 < day && day < 15)
//             || (SubstituteHoliday() == true)){
//                 const params1 = {file : 'holidays_22900_1532075792594.json'};
//                     axios.get('/timetable',{ params1 })
//                     .then((res) =>{
//                        var o1 = new Object();
//                     o1 = JSON.parse(res);
//                     });
//                     return o1;
//             }else{
//                 const params1 = {file : 'weekdays_22900_1532075866616.json'};
//                     axios.get('/timetable',{ params1 })
//                     .then((res) =>{
//                          var o1 = new Object();
//                     o1 = JSON.parse(res);
//                     });
//                     return o1;
//             }
//     },
</script>
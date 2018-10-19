'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('schools',
      [
        {
          name: 'tokyo-ct',
          background_image: 'minimal_background1.png',
          background_images: [
            'minimal_background1.png',
            'minimal_background2.png',
            'minimal_background3.png',
            'minimal_background4.png',
            'minimal_background5.png'
          ],
          timetable:(function() {[/*
            {
                "station":"狭間駅",
                "line":"京王高尾線",
                "day":"weekday",
                "timetable1":{
                    "direction":"新宿方面",
                    "1":[],
                    "2":[],
                    "3":[],
                    "4":[],
                    "5":[{"min":"10","kind":"各駅停車","going":"北野"},{"min":"35","kind":"準特急","going":"新宿"},{"min":"55","kind":"準特急","going":"新宿"}],
                    "6":[{"min":"04","kind":"各駅停車","going":"本八幡"},{"min":"14","kind":"各駅停車","going":"新宿"},{"min":"24","kind":"各駅停車","going":"高幡不動"},
                        {"min":"35","kind":"各駅停車","going":"新宿"},{"min":"43","kind":"各駅停車","going":"北野"},{"min":"53","kind":"各駅停車","going":"府中"}],
                    "7":[{"min":"01","kind":"各駅停車","going":"北野"},{"min":"11","kind":"各駅停車","going":"新宿"},{"min":"20","kind":"各駅停車","going":"府中"},
                        {"min":"33","kind":"快速","going":"新宿"},{"min":"44","kind":"各駅停車","going":"新宿"},{"min":"59","kind":"各駅停車","going":"新宿"}],
                    "8":[{"min":"11","kind":"各駅停車","going":"新宿"},{"min":"23","kind":"各駅停車","going":"新宿"},{"min":"33","kind":"各駅停車","going":"新宿"},
                        {"min":"44","kind":"各駅停車","going":"新宿"},{"min":"54","kind":"準特急","going":"新宿"}],
                    "9":[{"min":"13","kind":"各駅停車","going":"新宿"},{"min":"33","kind":"各駅停車","going":"新宿"},{"min":"39","kind":"各駅停車","going":"高幡不動"},
                        {"min":"52","kind":"各駅停車","going":"新宿"}],
                    "10":[{"min":"13","kind":"各駅停車","going":"新宿"},{"min":"19","kind":"各駅停車","going":"高幡不動"},{"min":"33","kind":"各駅停車","going":"高幡不動"},
                        {"min":"53","kind":"各駅停車","going":"新宿"}],
                    "11":[{"min":"13","kind":"各駅停車","going":"新宿"},{"min":"33","kind":"各駅停車","going":"新宿"},{"min":"53","kind":"各駅停車","going":"高幡不動"}],
                    "12":[{"min":"13","kind":"各駅停車","going":"新宿"},{"min":"33","kind":"各駅停車","going":"高幡不動"},{"min":"53","kind":"各駅停車","going":"新宿"}],
                    "13":[{"min":"13","kind":"各駅停車","going":"高幡不動"},{"min":"33","kind":"各駅停車","going":"新宿"},{"min":"53","kind":"各駅停車","going":"高幡不動"}],
                    "14":[{"min":"13","kind":"各駅停車","going":"新宿"},{"min":"33","kind":"各駅停車","going":"高幡不動"},{"min":"53","kind":"各駅停車","going":"新宿"}],
                    "15":[{"min":"13","kind":"各駅停車","going":"高幡不動"},{"min":"33","kind":"各駅停車","going":"新宿"},{"min":"53","kind":"各駅停車","going":"高幡不動"}],
                    "16":[{"min":"13","kind":"各駅停車","going":"新宿"},{"min":"33","kind":"各駅停車","going":"高幡不動"},{"min":"45","kind":"準特急","going":"新宿"},
                        {"min":"53","kind":"快速","going":"つつじヶ丘"}],
                    "17":[{"min":"03","kind":"準特急","going":"新宿"},{"min":"13","kind":"各駅停車","going":"高幡不動"},{"min":"23","kind":"準特急","going":"新宿"},
                        {"min":"33","kind":"快速","going":"つつじヶ丘"},{"min":"43","kind":"準特急","going":"新宿"},{"min":"53","kind":"準特急","going":"新宿"}],
                    "18":[{"min":"03","kind":"各駅停車","going":"新宿"},{"min":"13","kind":"快速","going":"つつじヶ丘"},{"min":"23","kind":"準特急","going":"新宿"},
                        {"min":"33","kind":"快速","going":"つつじヶ丘"},{"min":"43","kind":"準特急","going":"新宿"},{"min":"53","kind":"快速","going":"つつじヶ丘"}],
                    "19":[{"min":"01","kind":"各駅停車","going":"高幡不動"},{"min":"12","kind":"各駅停車","going":"高幡不動"},{"min":"21","kind":"快速","going":"新宿"},
                        {"min":"32","kind":"快速","going":"つつじヶ丘"},{"min":"42","kind":"各駅停車","going":"本八幡"},{"min":"52","kind":"各駅停車","going":"高幡不動"}],
                    "20":[{"min":"03","kind":"各駅停車","going":"本八幡"},{"min":"12","kind":"快速","going":"つつじヶ丘"},{"min":"21","kind":"快速","going":"本八幡"},
                        {"min":"32","kind":"快速","going":"つつじヶ丘"},{"min":"42","kind":"快速","going":"つつじヶ丘"},{"min":"52","kind":"各駅停車","going":"調布"}],
                    "21":[{"min":"04","kind":"各駅停車","going":"高幡不動"},{"min":"14","kind":"各駅停車","going":"新宿"},{"min":"23","kind":"各駅停車","going":"本八幡"},
                        {"min":"33","kind":"各駅停車","going":"本八幡"},{"min":"46","kind":"各駅停車","going":"本八幡"},{"min":"59","kind":"各駅停車","going":"高幡不動"}],
                    "22":[{"min":"10","kind":"各駅停車","going":"本八幡"},{"min":"21","kind":"各駅停車","going":"瑞江"},{"min":"33","kind":"各駅停車","going":"新宿"},
                        {"min":"46","kind":"各駅停車","going":"新宿"},{"min":"59","kind":"各駅停車","going":"新宿"}],
                    "23":[{"min":"10","kind":"各駅停車","going":"高幡不動"},{"min":"19","kind":"各駅停車","going":"高幡不動"},{"min":"25","kind":"各駅停車","going":"新宿"},
                        {"min":"38","kind":"区間急行","going":"桜上水"},{"min":"49","kind":"各駅停車","going":"北野"}],
                    "24":[{"min":"15","kind":"各駅停車","going":"高幡不動"}]
                },
                "timetable2":{
                    "direction":"高尾方面",
                    "1":[],
                    "2":[],
                    "3":[],
                    "4":[],
                    "5":[{"min":"21","kind":"各駅停車","going":"高尾山口"},{"min":"37","kind":"各駅停車","going":"高尾山口"},{"min":"48","kind":"各駅停車","going":"高尾山口"}],
                    "6":[{"min":"06","kind":"各駅停車","going":"高尾山口"},{"min":"15","kind":"準特急","going":"高尾山口"},{"min":"32","kind":"各駅停車","going":"高尾山口"},
                        {"min":"48","kind":"各駅停車","going":"高尾山口"},{"min":"55","kind":"準特急","going":"高尾山口"}],
                    "7":[{"min":"04","kind":"各駅停車","going":"高尾山口"},{"min":"09","kind":"各駅停車","going":"高尾山口"},{"min":"15","kind":"各駅停車","going":"高尾山口"},
                        {"min":"28","kind":"各駅停車","going":"高尾山口"},{"min":"32","kind":"各駅停車","going":"高尾山口"},{"min":"43","kind":"各駅停車","going":"高尾山口"},
                        {"min":"54","kind":"各駅停車","going":"高尾山口"}],
                    "8":[{"min":"05","kind":"各駅停車","going":"高尾山口"},{"min":"16","kind":"各駅停車","going":"高尾山口"},{"min":"27","kind":"各駅停車","going":"高尾山口"},
                        {"min":"38","kind":"各駅停車","going":"高尾山口"},{"min":"46","kind":"快速","going":"高尾山口"},{"min":"54","kind":"準特急","going":"高尾山口"}],
                    "9":[{"min":"04","kind":"準特急","going":"高尾山口"},{"min":"13","kind":"各駅停車","going":"高尾山口"},{"min":22,"kind":"各駅停車","going":"高尾山口"},
                        {"min":"38","kind":"各駅停車","going":"高尾山口"},{"min":"53","kind":"各駅停車","going":"高尾山口"}],
                    "10":[{"min":"01","kind":"各駅停車","going":"高尾山口"},{"min":"10","kind":"準特急","going":"高尾山口"},{"min":"18","kind":"各駅停車","going":"高尾山口"},
                        {"min":"36","kind":"各駅停車","going":"高尾山口"},{"min":"55","kind":"各駅停車","going":"高尾山口"}],
                    "11":[{"min":"15","kind":"各駅停車","going":"高尾山口"},{"min":"35","kind":"各駅停車","going":"高尾山口"},{"min":"55","kind":"各駅停車","going":"高尾山口"}],
                    "12":[{"min":"15","kind":"各駅停車","going":"高尾山口"},{"min":"35","kind":"各駅停車","going":"高尾山口"},{"min":"55","kind":"各駅停車","going":"高尾山口"}],
                    "13":[{"min":"15","kind":"各駅停車","going":"高尾山口"},{"min":"35","kind":"各駅停車","going":"高尾山口"},{"min":"55","kind":"各駅停車","going":"高尾山口"}],
                    "14":[{"min":"15","kind":"各駅停車","going":"高尾山口"},{"min":"35","kind":"各駅停車","going":"高尾山口"},{"min":"55","kind":"各駅停車","going":"高尾山口"}],
                    "15":[{"min":"15","kind":"各駅停車","going":"高尾山口"},{"min":"35","kind":"各駅停車","going":"高尾山口"},{"min":"55","kind":"各駅停車","going":"高尾山口"}],
                    "16":[{"min":"15","kind":"各駅停車","going":"高尾山口"},{"min":"28","kind":"各駅停車","going":"高尾山口"},{"min":"35","kind":"準特急","going":"高尾山口"},
                        {"min":"46","kind":"各駅停車","going":"高尾山口"},{"min":"55","kind":"準特急","going":"高尾山口"}],
                    "17":[{"min":"06","kind":"各駅停車","going":"高尾山口"},{"min":"16","kind":"準特急","going":"高尾山口"},{"min":"26","kind":"各駅停車","going":"高尾山口"},
                        {"min":"36","kind":"各駅停車","going":"高尾山口"},{"min":"46","kind":"各駅停車","going":"高尾山口"},{"min":"56","kind":"各駅停車","going":"高尾山口"}],
                    "18":[{"min":"07","kind":"各駅停車","going":"高尾山口"},{"min":"17","kind":"各駅停車","going":"高尾山口"},{"min":"27","kind":"各駅停車","going":"高尾山口"},
                        {"min":"37","kind":"各駅停車","going":"高尾山口"},{"min":"47","kind":"各駅停車","going":"高尾山口"},{"min":"57","kind":"各駅停車","going":"高尾山口"}],
                    "19":[{"min":"07","kind":"各駅停車","going":"高尾山口"},{"min":"18","kind":"各駅停車","going":"高尾山口"},{"min":"27","kind":"各駅停車","going":"高尾山口"},
                        {"min":"38","kind":"各駅停車","going":"高尾山口"},{"min":"47","kind":"各駅停車","going":"高尾山口"},{"min":"57","kind":"各駅停車","going":"高尾山口"}],
                    "20":[{"min":"07","kind":"各駅停車","going":"高尾山口"},{"min":"17","kind":"各駅停車","going":"高尾山口"},{"min":"27","kind":"各駅停車","going":"高尾山口"},
                        {"min":"37","kind":"各駅停車","going":"高尾山口"},{"min":"49","kind":"各駅停車","going":"高尾山口"},{"min":"58","kind":"各駅停車","going":"高尾山口"}],
                    "21":[{"min":"07","kind":"各駅停車","going":"高尾山口"},{"min":"17","kind":"快速","going":"高尾山口"},{"min":"27","kind":"各駅停車","going":"高尾山口"},
                        {"min":"37","kind":"各駅停車","going":"高尾山口"},{"min":"49","kind":"快速","going":"高尾山口"},{"min":"58","kind":"各駅停車","going":"高尾山口"}],
                    "22":[{"min":"07","kind":"各駅停車","going":"高尾山口"},{"min":"17","kind":"快速","going":"高尾山口"},{"min":"27","kind":"各駅停車","going":"高尾山口"},
                        {"min":"38","kind":"各駅停車","going":"高尾山口"},{"min":"50","kind":"快速","going":"高尾山口"},{"min":"59","kind":"各駅停車","going":"高尾山口"}],
                    "23":[{"min":"08","kind":"各駅停車","going":"高尾山口"},{"min":"22","kind":"各駅停車","going":"高尾山口"},{"min":"33","kind":"各駅停車","going":"高尾山口"},
                        {"min":"46","kind":"各駅停車","going":"高尾山口"},{"min":"59","kind":"各駅停車","going":"高尾山口"}],
                    "24":[{"min":"19","kind":"各駅停車","going":"高尾山口"},{"min":"42","kind":"各駅停車","going":"高尾山口"},{"min":"51","kind":"各駅停車","going":"高尾山口"}]
                }
            }
            */]}).toString().match(/\/\*([^]*)\*\//)[1]
        }
      ]
      , {})
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('schools', null, {})
  }
}

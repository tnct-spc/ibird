import { Router } from 'express'
import { readdirSync, readFileSync, writeJson } from 'fs-extra'
import { resolve } from 'path'
import { fetch } from 'cheerio-httpcli'
import { parse } from 'url'

const router = Router()
var dirPath = resolve('.timetable', '../.timetable') // jsonのパスを設定
var list = []

// 駅のタイムテーブルを取得してJSONを生成するAPI
router.get('/createtable', function (req, res) {
  var scrapeData
  var fetchURL = 'https://transit.yahoo.co.jp/station/time/22900/?gid=3071&done=time&tab=time'
  fetchYahoo(scrapeData, fetchURL, createJsonFile)
  res.send('ok')
})

// 表示できるJSONファイルの情報を返すAPI
router.get('/getfilelist', function (req, res) {
  var fileInfo = JSON.parse(readFileSync(dirPath + '/filename.json', 'utf8'))
  var todayFile = []
  list.length = 0
  getlist(todayFile)
  for (var i = 0; i < todayFile.length; i++) {
    for (var j = 0; j < fileInfo.length; j++) {
      if (todayFile[i] === fileInfo[j].name) {
        list.push(fileInfo[j])
      }
    }
  }
  res.json(list)
})

// 最終的に表示するJSONのタイムテーブルを返すAPI
/*
  このAPIのRequestで受け取るパラメータは、
  {
    "file":"ファイル名"
  }
  のような形式のJSONをQueryで送ります。また、1回のRequestで送るファイル名は1つだけです。
  狭間駅のサンプルで平日に新宿方面を表示したい場合は、
  {
    "file":"weekdays_22900_1532075866616.json"
  }
  のようになります。
*/
router.get('/sendtable', function (req, res) {
  var timeTableData = JSON.parse(readFileSync(dirPath + '/' + req.query.file, 'utf8'))
  res.json(timeTableData)
})

function getlist (todayFileList) {
  var filelist = readdirSync(dirPath) // 全ファイルのリストを生成
  var dt = new Date().getDay()

  if (dt === 0) {
    for (var i = 0; i < filelist.length; i++) {
      if (filelist[i].match(/holidays/)) {
        todayFileList.push(filelist[i])
      }
    }
  } else if (dt === 6) {
    for (var j = 0; j < filelist.length; j++) {
      if (filelist[j].match(/weekenddays/)) {
        todayFileList.push(filelist[j])
      }
    }
  } else {
    for (var k = 0; k < filelist.length; k++) {
      if (filelist[k].match(/weekdays/)) {
        todayFileList.push(filelist[k])
      }
    }
  }
}

function fetchYahoo (fullTimetableData, url, callback) {
  fullTimetableData = JSON.parse('{}')
  fetch(url).then(function (result) {
    var $ = result.$
    if (result.error) {
      console.log('Failed fetchYahoo : ' + result.error)
    }

    var anotherData = $('#cat-pass strong').text().split(' ')
    fullTimetableData['station'] = anotherData[0]
    fullTimetableData['direction'] = anotherData[2]
    fullTimetableData['line'] = anotherData[1]

    var kindList = JSON.parse('{}')
    var goingList = JSON.parse('{}')
    $('#timeNotice1 li').each(function () {
      var kind = $(this).text().split('：')
      kindList[kind[0]] = kind[1]
    })
    $('#timeNotice2 li').each(function () {
      var going = $(this).text().split('：')
      goingList[going[0]] = going[1]
    })

    var ariveHour = []
    $('.tblDiaDetail tr').each(function (i) {
      var id = $(this).attr('id')
      if (id) {
        var idToNum = id.replace('hh_', '')
        ariveHour.push(idToNum)
      }
    })

    var timetable = JSON.parse('{}')
    for (var i = 1; i <= 24; i++) {
      var fullHour = i.toString()
      for (var j = 0; j < ariveHour.length; j++) {
        if (ariveHour[j] === ariveHour[ariveHour.length - 1] && fullHour !== '24') {
          timetable[fullHour] = []
        }
        if (fullHour === ariveHour[j]) {
          var hourList = []
          $('#hh_' + ariveHour[j] + ' .timeNumb').each(function () {
            var trainData = JSON.parse('{}')
            trainData['min'] = ($(this).find('dt').text())
            if ($(this).find('.trainType').length) {
              var trainType = $(this).find('.trainType').text().replace('[', '')
                .replace(']', '')
              trainData['kind'] = kindList[trainType]
            } else {
              trainData['kind'] = kindList.無印
            }
            if ($(this).find('.trainFor').length) {
              var trainFor = $(this).find('.trainFor').text()
              trainData['going'] = goingList[trainFor]
            } else {
              trainData['going'] = goingList.無印
            }
            hourList.push(trainData)
          })
          timetable[fullHour] = hourList
          break
        }
      }
    }
    fullTimetableData['timetable'] = timetable
    callback(fullTimetableData, url)
  })
}

function createJsonFile (jsonData, URL) {
  var filename = '/'
  var dt = new Date().getDay()

  if (dt === 0) {
    filename += 'holiday_'
  } else if (dt === 6) {
    filename += 'weekendday_'
  } else {
    filename += 'weekday_'
  }
  var stationID = parse(URL).pathname.split('/')
  filename += stationID[3] + '_'
  filename += parse(URL, true).query.gid + '.json'

  writeJson(dirPath + filename, jsonData, {spaces: 2},
    function (error) {
      if (error) {
        console.log('Failed writeJson : ' + error)
      }
    }
  )
}

export default router

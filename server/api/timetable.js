import { Router } from 'express'
import { readdirSync, readFileSync } from 'fs'
import { resolve } from 'path'
import { fetch } from 'cheerio-httpcli'

const router = Router()
var dirPath = resolve('.timetable', '../.timetable') // jsonのパスを設定
var list = []

// 駅のタイムテーブルを取得してJSONを生成するAPI
router.get('/createtable', function (req, res) {
  var timetable, station, direction, line
  fetch('https://transit.yahoo.co.jp/station/time/22900/?gid=3071&kind=1&done=time').then(function (result) {
    var $ = result.$

    var testlist = JSON.parse('{}')
    var testlist2 = JSON.parse('{}')
    $('#timeNotice1 li').each(function () {
      var test = $(this).text().split('：')
      testlist[test[0]] = test[1]
    })
    $('#timeNotice2 li').each(function () {
      var test = $(this).text().split('：')
      testlist2[test[0]] = test[1]
    })
    console.log(testlist)
    console.log(testlist2)

    var timedata = []
    var trainType = []
    var trainFor = []
    $('tr#hh_18 .timeNumb').each(function () {
      timedata.push($(this).find('dt').text())
      if ($(this).find('.trainType').length) {
        trainType.push($(this).find('.trainType').test())
      } else {
        trainType.push(testlist.無印)
      }
      if ($(this).find('.trainFor').length) {
        trainFor.push($(this).find('.trainFor').test())
      } else {
        trainFor.push(testlist2.無印)
      }
    })
    console.log(timedata)
    console.log(trainType)
    console.log(trainFor)

    var anotherData = $('#cat-pass strong').text().split(' ')
    station = anotherData[0]
    line = anotherData[1]
    direction = anotherData[2]
    console.log(station)
    console.log(line)
    console.log(direction)
  })
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

export default router

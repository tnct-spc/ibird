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
    // timetable = $('.yj100per-2 tr#hh_5')
    var catPass = $('#cat-pass strong').text().split(' ')
    station = catPass[0]
    line = catPass[1]
    direction = catPass[2]
    // console.log(timetable)
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

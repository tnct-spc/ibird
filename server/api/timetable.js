import { Router } from 'express'
import { readdirSync, readFileSync, writeJson } from 'fs-extra'
import { resolve } from 'path'
import { fetch } from 'cheerio-httpcli'
import { parse } from 'url'

const router = Router()
var dirPath = resolve('.timetable', '../.timetable') // jsonのパスを設定
var list = []

// 駅のタイムテーブルを取得してJSONを生成するAPI
router.get('/createtable', (req, res) => {
  var fullTimetableData = JSON.parse('{}')
  fetch(req.query.url)
    .then(function (result) {
      var $ = result.$

      // 駅名、行き先、何線かを取得
      var anotherData = $('#cat-pass strong').text().split(' ')
      fullTimetableData['station'] = anotherData[0]
      fullTimetableData['direction'] = anotherData[2]
      fullTimetableData['line'] = anotherData[1]

      // 電車の車種と行き先のリストを作成
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

      // 電車が止まる時間帯だけのリストを作成
      var ariveHour = []
      $('.tblDiaDetail tr').each(function (i) {
        var id = $(this).attr('id')
        if (id) {
          var idToNum = id.replace('hh_', '')
          ariveHour.push(idToNum)
        }
      })

      // 時刻表とその電車の車種、行き先を取得
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
      console.log('createjson')
    })
    .then(function () {
      createJsonFile(fullTimetableData, req.query.url)
      console.log('createFile')
    })

    // エラー処理
    .catch(function (error) {
      console.log('Failed loadHTML: ' + error)
      res.send('サーバー内でエラーが起きました')
    })

    // 成功
    .finally(function () {
      console.log('end')
      res.send('ok')
    })
})

// 表示できるJSONファイルの情報を返すAPI
router.get('/getfilelist', (req, res) => {
  var fileInfo = JSON.parse(readFileSync(dirPath + '/filename.json', 'utf8'))
  list.length = 0
  for (var i = 0; i < getTodayList().length; i++) {
    for (var j = 0; j < fileInfo.length; j++) {
      if (getTodayList()[i] === fileInfo[j].name) {
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
router.get('/sendtable', (req, res) => {
  var timeTableData = JSON.parse(readFileSync(dirPath + '/' + req.query.file, 'utf8'))
  res.json(timeTableData)
})

// 実行したの日の曜日に合わせてサーバー内にあるファイルのリストを返す関数
var getTodayList = () => {
  var todayFileList = []
  var filelist = readdirSync(dirPath) // 全ファイルのリストを生成
  filelist.some(function (name, i) {
    if (name === 'filename.json') filelist.splice(i, 1) // リストからfilename.jsonを削除
  })
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
  return todayFileList
}

// fetchYahooのコールバックで呼び出すファイルを作成する関数
function createJsonFile (jsonData, URL) {
  var filename
  var dt = new Date().getDay()

  // ファイル名を作成
  if (dt === 0) filename = 'holidays_'
  else if (dt === 6) filename = 'weekenddays_'
  else filename = 'weekdays_'
  var stationID = parse(URL).pathname.split('/')
  filename += stationID[3] + '_'
  filename += parse(URL, true).query.gid + '.json'

  // 最終的なファイルを作成
  writeJson(dirPath + '/' + filename, jsonData, {spaces: 2},
    function (error) {
      if (error) console.log('Failed writeJson : ' + error)
    }
  )

  /* // filename.jsonを更新
  var fileInfo = JSON.parse(readFileSync(dirPath + '/filename.json', 'utf8'))
  var jsonInfo = JSON.parse('{}')
  jsonInfo['name'] = filename
  jsonInfo['station'] = jsonData.station
  jsonInfo['direction'] = jsonData.direction
  jsonInfo['line'] = jsonData.line
  for (var i = 0; i < fileInfo.length; i++) {
    if (fileInfo[i].name === filename) {
      break
    }
    if (fileInfo[i].name !== filename && fileInfo[fileInfo.length - 1] === fileInfo[i]) {
      fileInfo.push(jsonInfo)
    }
  }
  writeJson(dirPath + '/filename.json', fileInfo, {spaces: 2},
    function (error) {
      if (error) {
        console.log('Failed writeFilename : ' + error)
      }
    }
  ) */
}

export default router

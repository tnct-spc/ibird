import { Router } from 'express'
import { readdirSync, readFileSync, writeJson } from 'fs-extra'
import { resolve } from 'path'
import { fetch } from 'cheerio-httpcli'
import { parse, format } from 'url'
import { address } from 'ip'

const router = Router()
const dirPath = resolve('.timetable', '../.timetable') // jsonのパスを設定
const searchBaseURL = 'https://transit.yahoo.co.jp/station/time/search?srtbl=on&kind=1&done=time'
let list = []

// 送られた文字列で検索して行き先の一覧を表示するURLを取得するAPI
router.get('/searchstation', (req, res) => {
  var stationList = []
  if (req.query.station) {
    var baseURL = parse(searchBaseURL, true)
    fetch(updateQuery(baseURL, {q: req.query.station}))
      .then(function (result) {
        var $ = result.$
        var jsonbase = '{"station": "", "apiurl": ""}'
        // Requestから駅を特定できないなら候補の一覧を返す
        if ($('#cat-pass strong').text() === '駅の検索結果') {
          if ($('.labelSmall .title').text() === '駅') {
            $('.elmSearchItem li').each(function () {
              var stationParam = JSON.parse(jsonbase)
              stationParam.station = $(this).text()
              stationParam.apiurl = format({
                protocol: 'http',
                port: '3000',
                hostname: address(),
                query: {'url': 'https://transit.yahoo.co.jp/' + $(this).find('a').attr('href')},
                pathname: '/api/geturllist'
              })
              stationList.push(stationParam)
            })
          }
        } else {
          // Requestから駅を特定できたなら一つだけ返す
          var stationParam = JSON.parse(jsonbase)
          stationParam.station = req.query.station
          stationParam.apiurl = format({
            protocol: 'http',
            port: '3000',
            hostname: address(),
            query: {'url': result.response.request.uri.href},
            pathname: '/api/geturllist'
          })
          stationList.push(stationParam)
        }
      })
      // 成功
      .then(function () {
        res.json(stationList)
      })
      // エラー処理
      .catch(function (error) {
        console.log('Failed searchstation: ' + error)
        res.sendStatus(400)
      })
  } else {
    console.log('駅名が入力されていません')
    res.json(stationList)
  }
})

// 確定済みの駅のURLから行き先のリストを返すAPI
router.get('/geturllist', (req, res) => {
  var urlList = []
  fetch(req.query.url)
    .then(function (result) {
      var $ = result.$
      var jsonbase = '{"line":"", "direction":"", "weekdaysURL":"", "weekenddaysURL":"", "holidaysURL":""}'
      // 平日のurlを作成
      $('.elmSearchItem.direction li').each(function () {
        var line = $(this).find('dl dt').text()
        $(this).find('li').each(function () {
          var urlObject = parse($(this).find('a').attr('href'), true)
          var singleJson = JSON.parse(jsonbase)
          singleJson.line = line
          singleJson.direction = $(this).find('a').text()
          singleJson.weekdaysURL = urlObject.href
          singleJson.weekenddaysURL = updateQuery(urlObject, {kind: 2})
          singleJson.holidaysURL = updateQuery(urlObject, {kind: 4})
          urlList.push(singleJson)
        })
      })
    })
    // 成功
    .then(function () {
      res.json(urlList)
    })
    // エラー処理
    .catch(function (error) {
      console.log('Failed GetURLList: ' + error)
      res.sendStatus(400)
    })
})

// 駅のタイムテーブルを取得してJSONを生成するAPI
router.get('/createtable', async (req, res) => {
  var test = await fetchAnother(req.query.url)
  res.json(test)
  /* var fullTimetableData = JSON.parse('{}')
  var fileInfo = JSON.parse('{}')
  var name = ''
  fetch(req.query.url)
    .then(function (result) {
      var $ = result.$
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
      $('.tblDiaDetail tr').each(function () {
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
              trainData['min'] = $(this).find('dt').text().replace(/[^0-9]+/g, '')
              if (kindList.length) {
                if ($(this).find('.trainType').length) {
                  var trainType = $(this).find('.trainType').text().replace('[', '')
                    .replace(']', '')
                  trainData['kind'] = kindList[trainType]
                } else {
                  trainData['kind'] = kindList.無印
                }
              } else {
                trainData['kind'] = '各駅停車'
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
    })
    .then(function () {
      name = createJsonFile(fullTimetableData, req.query.url)
    })
    .then(function () {
      fileInfo['name'] = name
      fileInfo['station'] = fullTimetableData.station
      fileInfo['direction'] = fullTimetableData.direction
      fileInfo['line'] = fullTimetableData.line
    })
    // 成功
    .then(function () {
      res.json(fileInfo)
    })
    // エラー処理
    .catch(function (error) {
      console.log('Failed loadHTML: ' + error)
      res.sendStatus(400)
    })
    */
})

var fetchAnother = async (url) => {
  var scrapeAnotherData = JSON.parse('{}')
  await fetch(url)
    .then(function (result) {
      var $ = result.$
      // 駅名、行き先、何線かを取得
      var anotherData = $('#cat-pass strong').text().split(' ')
      scrapeAnotherData['station'] = anotherData[0]
      scrapeAnotherData['direction'] = anotherData[2]
      scrapeAnotherData['line'] = anotherData[1]
    })
  return scrapeAnotherData
}

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
  if (req.query.file) {
    var timeTableData = JSON.parse(readFileSync(dirPath + '/' + req.query.file, 'utf8'))
    res.json(timeTableData)
  } else {
    res.sendStatus(400)
  }
})

// urlのqueryをいじる関数
var updateQuery = (urlObject, object) => {
  urlObject.search = undefined
  Object.assign(urlObject.query, object)
  return format(urlObject)
}

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

// fetchのプロミスで呼び出すファイルを作成する関数
var createJsonFile = (jsonData, URL) => {
  var filename = ''

  // ファイル名を作成
  var q = parse(URL, true).query
  if (q.kind === '4') filename = 'holidays_'
  else if (q.kind === '2') filename = 'weekenddays_'
  else filename = 'weekdays_'
  var stationID = parse(URL).pathname.split('/')
  filename += stationID[3] + '_'
  filename += q.gid + '.json'
  // 最終的なファイルを作成
  writeJson(dirPath + '/' + filename, jsonData, {spaces: 2},
    function (error) {
      if (error) console.log('Failed writeJson : ' + error)
    }
  )

  // 上で作ったファイルのデータをまとめる
  var jsonInfo = JSON.parse('{}')
  jsonInfo['name'] = filename
  jsonInfo['station'] = jsonData.station
  jsonInfo['direction'] = jsonData.direction
  jsonInfo['line'] = jsonData.line
  // 今現在のfilename.jsonの状態と比べる
  var nowData = JSON.parse(readFileSync(dirPath + '/filename.json', 'utf8'))
  if (nowData.length) {
    for (var i = 0; i < nowData.length; i++) {
      if (nowData[i].name === filename) break // すでに登録しているファイルなら上書き
      if (nowData[i].name !== filename && nowData[nowData.length - 1] === nowData[i]) nowData.push(jsonInfo) // 一致するものがなかったら追加
    }
  } else {
    nowData.push(jsonInfo)
  }
  writeJson(dirPath + '/filename.json', nowData, {spaces: 2},
    function (error) {
      if (error) console.log('Failed writeFilename : ' + error)
    }
  )
  return filename
}

export default router

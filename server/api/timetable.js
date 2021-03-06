import { Router } from 'express'
import { readFileSync, writeJson } from 'fs-extra'
import { resolve } from 'path'
import { fetch } from 'cheerio-httpcli'
import { parse, format } from 'url'
import { address } from 'ip'

const router = Router()
const dirPath = resolve('.timetable', '../.timetable') // jsonのパスを設定
const searchBaseURL = 'https://transit.yahoo.co.jp/station/time/search?srtbl=on&kind=1&done=time'

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
        console.log('searchstation ' + error)
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
      console.log('GetURLList ' + error)
      res.sendStatus(400)
    })
})

// 駅のタイムテーブルを取得してJSONを生成するAPI
router.get('/createtable', async (req, res) => {
  var another = await fetchAnother(req.query.weekdaysURL)
  var weekdays = await fetchTimetable(req.query.weekdaysURL)
  var weekenddays = await fetchTimetable(req.query.weekenddaysURL)
  var holidays = await fetchTimetable(req.query.holidaysURL)
  var fullTimetableData = await Object.assign(another, weekdays, weekenddays, holidays)
  res.json(createJsonFile(fullTimetableData, req.query.weekdaysURL))
})

// 表示できるJSONファイルの情報を返すAPI
router.get('/getfilelist', (req, res) => {
  var allFilelist = JSON.parse(readFileSync(dirPath + '/filename.json', 'utf8'))
  res.json(allFilelist)
})

// 最終的に表示するJSONのタイムテーブルを返すAPI
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

// timetableをyahooからスクレイピングする関数
var fetchTimetable = async (url) => {
  var timeTableData = JSON.parse('{}')
  var urlKind = await parse(url, true).query.kind
  if (urlKind === '1') urlKind = 'weekdays'
  else if (urlKind === '2') urlKind = 'weekenddays'
  else urlKind = 'holidays'
  await fetch(url)
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
      timeTableData[urlKind] = timetable
    })
    .catch(function (error) {
      console.log('fetchTimetable ' + error)
    })
  return timeTableData
}

// timetable以外に必要なデータをスクレイピングする関数
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
    .catch(function (error) {
      console.log('fetchAnother' + error)
    })
  return scrapeAnotherData
}

// ファイルを作成する関数
var createJsonFile = (jsonData, URL) => {
  // ファイル名を作成
  var urlObject = parse(URL, true)
  var stationID = urlObject.pathname.split('/')
  var filename = stationID[3] + '_' + urlObject.query.gid + '.json'
  // 最終的なファイルを作成
  writeJson(dirPath + '/' + filename, jsonData, {spaces: 2},
    function (error) {
      if (error) console.log('writeJson ' + error)
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
      if (error) console.log('writeFilename ' + error)
    }
  )
  return jsonInfo
}

export default router

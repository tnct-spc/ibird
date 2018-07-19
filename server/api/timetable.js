import { Router } from 'express'
import 'date-utils'
import { readdirSync, readFileSync } from 'fs'
import { resolve } from 'path'

const router = Router()
const date = new Date()
var dirPath = resolve('assets', '../assets') // assetsのパスを設定
var list = []

// 駅のタイムテーブルを取得してJSONを生成するAPI
router.get('/creatTable', function (req, res) {
  res.send('設定ファイルの作成に成功しました')
})

// 表示できるJSONファイルの情報を返すAPI
router.get('/getFileList', function (req, res) {
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
router.get('/sendTable', function (req, res) {
  list.length = 0
  for (var i = 0; i < req.query.file.length; i++) {
    list.push(JSON.parse(readFileSync(dirPath + '/' + req.query.file[i], 'utf8')))
  }
  res.json(list)
})

function getlist (todayFileList) {
  var filelist = readdirSync(dirPath) // 全ファイルのリストを生成
  var dt = date.toFormat('DDDD')

  if (dt === 'Sunday') {
    for (var i = 0; i < filelist.length; i++) {
      if (filelist[i].match(/holidays/)) {
        todayFileList.push(filelist[i])
      }
    }
  } else if (dt === 'Saturday') {
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

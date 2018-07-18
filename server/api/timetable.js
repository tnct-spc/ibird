import { Router } from 'express'
import 'body-parser'
import 'date-utils'
import {readdirSync, readFileSync} from 'fs'
import {resolve} from 'path'

const router = Router()
const date = new Date()
var dirPath = resolve('assets', '../assets') // assetsのパスを取得
var list = []

// 駅のタイムテーブルを取得してJSONを生成するAPI
router.get('/creatTable', function (req, res) {
  res.send('設定ファイルの作成に成功しました')
})

// 表示できるJSONファイルの情報を返すAPI
router.get('/getFileList', function (req, res) {
  var fileInfo = JSON.parse(readFileSync(dirPath + '/filename.json', 'utf8'))
  var ans = []
  list.length = 0
  getlist()
  for (var i = 0; i < list.length; i++) {
    for (var j = 0; j < fileInfo.length; j++) {
      if (list[i] === fileInfo[j].name) {
        ans.push(fileInfo[j])
      }
    }
  }
  res.json(ans)
})

// 最終的に表示するJSONのタイムテーブルを返すAPI
router.get('/sendTable', function (req, res) {
  console.log(req.query)
  res.json(req.query)
})

function getlist () {
  var filelist = readdirSync(dirPath) // 全ファイルのリストを生成
  var dt = date.toFormat('DDDD')

  if (dt === 'Sunday') {
    for (var i = 0; i < filelist.length; i++) {
      if (filelist[i].match(/holidays/)) {
        list.push(filelist[i])
      }
    }
  } else if (dt === 'Saturday') {
    for (var j = 0; j < filelist.length; j++) {
      if (filelist[j].match(/weekenddays/)) {
        list.push(filelist[j])
      }
    }
  } else {
    for (var k = 0; k < filelist.length; k++) {
      if (filelist[k].match(/weekdays/)) {
        list.push(filelist[k])
      }
    }
  }
}

export default router

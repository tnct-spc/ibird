import { Router } from 'express'
import 'date-utils'
import {readdirSync} from 'fs'
import {resolve} from 'path'

const router = Router()
const date = new Date()

router.get('/gettable', function (req, res, next) {
  res.json()
})

router.get('/settable', function (dirPath, res) {
  dirPath = resolve('assets', '../assets')
  var filename = readdirSync(dirPath)
  var dt = date.toFormat('DDDD')
  var list = []

  if (dt === 'Sunday') {
  } else if (dt === 'Saturday') {
  } else {
    for (var i = 0; i < filename.length; i++) {
      if (filename[i].match(/weekdays/)) {
        list.push(filename[i])
      }
    }
  }
  res.json(list)
})

export default router

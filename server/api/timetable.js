import { Router } from 'express'
import 'date-utils'
import {readdirSync} from 'fs'
import {resolve} from 'path'

const router = Router()
const date = new Date()
var list = []

router.get('/gettable', function (req, res, next) {
  res.json()
})

router.get('/settable', function (req, res, next) {
  list.length = 0
  getlist()
  res.json(list)
})

function getlist () {
  var dirPath = resolve('assets', '../assets')
  var filename = readdirSync(dirPath)
  var dt = date.toFormat('DDDD')

  if (dt === 'Sunday') {
    for (var i = 0; i < filename.length; i++) {
      if (filename[i].match(/holidays/)) {
        list.push(filename[i])
      }
    }
  } else if (dt === 'Saturday') {
    for (var j = 0; j < filename.length; j++) {
      if (filename[j].match(/weekenddays/)) {
        list.push(filename[j])
      }
    }
  } else {
    for (var k = 0; k < filename.length; k++) {
      if (filename[k].match(/weekdays/)) {
        list.push(filename[k])
      }
    }
  }
}

export default router

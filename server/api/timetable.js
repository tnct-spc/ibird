import { Router } from 'express'
import 'puppeteer'
import 'date-utils'

const router = Router()

router.get('/gettable', function (req, res, next) {
  res.json()
})

router.get('/settable', function (req, res, next) {
  var dt = new Date()
  var time = dt.toFormat('YYYYMMDDHH24MISS')
  console.log(time)
  res.json(time)
})

export default router

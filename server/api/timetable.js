import { Router } from 'express'
import 'date-utils'

const router = Router()

router.get('/settable', function (req, res, next) {
  var dt = new Date()
  var time = dt.toFormat('YYYYMMDDHH24MISS')
  console.log(time)
  res.json(time)
})

export default router

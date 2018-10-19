import { Router } from 'express'
import parser from 'body-parser'
import models from '../models'

const schools = models.schools
const router = Router()
router.use(parser.urlencoded({ extended: false }))
router.use(parser.json())

const schoolId = 1
// まだ複数学校に対応していないのでハードコーディング

router.put('/alert', (req, res, next) => {
  const message = req.body.message
  let endDate = new Date()
  endDate.setMinutes(endDate.getMinutes() + 30)
  schools.findById(schoolId).then(school => {
    school.message = message
    school.messageEndDate = endDate
    school.save().then(() => {
      res.send('ok')
    })
  }).catch(() => {
    res.sendStatus(400)
  })
})

router.get('/alert', (req, res, next) => {
  schools.findById(schoolId).then(school => {
    const message = school.message
    const endDate = school.messageEndDate.getTime()
    if (endDate > new Date().getTime()) {
      res.json({message: message, endDate: endDate})
    } else {
      res.json({message: '', endDate: 0})
    }
  }).catch(err => {
    console.log(err)
    res.sendStatus(400)
  })
})

router.delete('/alert', (req, res, next) => {
  schools.findById(schoolId).then(school => {
    school.messageEndDate = 0
    school.save().then(() => {
      res.sendStatus(200)
    })
  }).catch(() => {
    res.sendStatus(400)
  })
})
export default router

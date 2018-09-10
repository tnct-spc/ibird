import { Router } from 'express'
import parser from 'body-parser'
import models from '../models'
import sortDocs from '../lib/sortdocs'

const classes = models.classes
const router = Router()
router.use(parser.urlencoded({ extended: false }))
router.use(parser.json())

router.put('/sort-docs', (req, res, next) => {
  const classid = req.body.classid
  sortDocs(classid)
  res.sendStatus(200)
})

router.get('/RandomSort', (req, res, next) => {
  const classid = req.query.classid
  classes.findOne({where: {classid: classid}})
    .then(result => {
      res.json({isRandom: result.randomSort})
    }).catch(err => {
      res.sendStatus(200)
      console.log(err)
    })
})

router.put('/RandomSort', (req, res, next) => {
  const classid = req.body.classid
  const isRandom = req.body.isRandom
  classes.findById(classid)
    .then(result => {
      result.randomSort = isRandom
      result.save()
      res.sendStatus(200)
    }).catch(err => {
      console.log(err)
      res.sendStatus(400)
    })
})

export default router

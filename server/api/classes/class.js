import { Router } from 'express'
import parser from 'body-parser'
import models from '../../models'

const classes = models.classes
const router = Router()
router.use(parser.urlencoded({ extended: false }))
router.use(parser.json())

router.get('/', (req, res, next) => {
  const course = req.query.course
  const year = req.query.year
  classes.findOne(
    {where:{
      course: course,
      year: year
  }}).then(result => {
    res.json({classid: result.classid})
  }).catch(err => {
    console.log(err)
    res.sendStatus(500)
  })
})

export default router

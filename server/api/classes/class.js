import { Router } from 'express'
import parser from 'body-parser'
import models from '../../models'

const classes = models.classes
const router = Router()
router.use(parser.urlencoded({ extended: false }))
router.use(parser.json())

router.get('/', (req, res, next) => {
  classes.findOne(
    {where: {
      year: req.query.year,
      course: req.query.course
    }}).then(c => {
    res.json(c.classid)
  })
})

export default router

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
      classid: req.query.classid
    }}).then(c => {
    res.json({year: c.year, course: c.course})
  })
})

export default router

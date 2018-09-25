import { Router } from 'express'
import parser from 'body-parser'
import models from '../../models'

const classes = models.classes
const router = Router()
router.use(parser.urlencoded({ extended: false }))
router.use(parser.json())

router.get('/', (req, res, next) => {
  let courseset = new Set()
  let yearset = new Set()
  classes.findAll()
    .then(result => {
      result.forEach(e => {
        courseset.add(e.year)
        yearset.add(e.course)
      })
      const obj = {
        years: Array.from(courseset.values()),
        courses: Array.from(yearset.values())
      }
      console.log(obj)
      res.json(obj)
    })
})

export default router

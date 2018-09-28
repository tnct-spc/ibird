import { Router } from 'express'
import parser from 'body-parser'
import models from '../../models'

const classes = models.classes
const router = Router()
router.use(parser.urlencoded({ extended: false }))
router.use(parser.json())

router.get('/', (req, res, next) => {
  let courses = []
  classes.findAll()
    .then(results => {
      results.sort((a, b) => {
        if (a.index > b.index) return 1
        if (a.index < b.index) return -1
        return 0
      })
      results.forEach(result => {
        if (courses.indexOf(result.course) === -1) {
          courses.push(result.course)
        }
      })
      res.json({courses: courses})
    }).catch(err => {
      console.log(err)
      res.status(400).send('faild')
    })
})

export default router

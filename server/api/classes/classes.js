import { Router } from 'express'
import parser from 'body-parser'
import models from '../../models'

const classes = models.classes
const documents = models.documents
const router = Router()
router.use(parser.urlencoded({ extended: false }))
router.use(parser.json())

router.get('/', (req, res, next) => {
  classes.findAll().then(c => {
    const list = []
    c.forEach((value, index, array) => {
      delete value.dataValues.documents
      list.push(value.dataValues)
    })
    res.json(list)
  })
})

router.post('/', (req, res, next) => {
  const yearNum = req.body.yearNum
  const courses = req.body.courses
  documents.destroy({where: {}})
  let insertData = []
  for (let y = 1; y <= yearNum; y++) {
    for (let ci = 0; ci < courses.length; ci++) {
      insertData.push({
        year: y,
        course: courses[ci],
        index: ci,
        randomSort: true
      })
    }
  }
  classes.destroy({where: {}}).then(() => {
    classes.bulkCreate(insertData).then(() => {
      res.sendStatus(200)
    })
  })
})

export default router

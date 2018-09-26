import { Router } from 'express'
import parser from 'body-parser'
import models from '../../models'

const classes = models.classes
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

export default router

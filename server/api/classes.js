import { Router } from 'express'
import parser from 'body-parser'
import models from '../models'
import docList from '../lib/doclist'

const classes = models.classes
const router = Router()
router.use(parser.urlencoded({ extended: false }))
router.use(parser.json())


router.get('/classes-list', (req, res, next) => {
  classes.findAll().then(c => {
    const list = []
    c.forEach((value, index, array) => {
      delete value.dataValues.documents
      list.push(value.dataValues)
    })
    res.json(list)
  })
})

router.get('/class-docs', (req, res, next) => {
  const classid = req.query.classid
  docList(classid).then(list => {
    res.json(list)
  })
})

router.get('/class-docs-mobile', (req, res, next) => {
  const classid = req.query.classid
  docList(classid).then(list => {
    var returndata = list.filter(p => {
      console.log(p.openMobile)
      return p.openMobile
    })
    res.json(returndata)
    console.log(returndata)
  }).catch(err => {
    console.log(err)
    res.statu(404)
  })
})

router.put('/class', (req, res, next) => {
  const year = req.body.year
  const course = req.body.course
  return classes.create({
    year: year,
    course: course
  }).then(result => {
    res.sendStatus(200)
  }).catch(err => {
    console.log(err)
    res.sendStatus(400)
  })
})
router.delete('/class', (req, res, next) => {
  const classid = req.query.classid
  console.log(classid)
  return classes.destroy({
    where: {classid: classid}
  }).then(result => {
    res.sendStatus(200)
  }).catch(err => {
    console.log(err)
    res.sendStatus(400)
  })
})
router.get('/years-and-courses', (req, res, next) => {
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

router.get('/classid', (req, res, next) => {
  const course = req.query.course
  const year = req.query.year
  classes.findOne({where: {
    course: course,
    year: year
  }}).then(result => {
    res.json({classid: result.classid})
  }).catch(err => {
    console.log(err)
    res.sendStatus(400)
  })
})

export default router

import { Router } from 'express'
import parser from 'body-parser'
import models from '../../models'
import sortDocs from '../../lib/sortdocs'

const documents = models.documents
const router = Router()
router.use(parser.urlencoded({ extended: false }))
router.use(parser.json())

router.delete('/', (req, res, next) => {
  const classid = req.query.classid
  const docid = req.query.docid
  documents.destroy({
    where: {
      classid: classid,
      docid: docid
    }
  }).then(result => {
    res.sendStatus(200)
    sortDocs(classid)
  }).catch(err => {
    console.log(err)
    res.sendStatus(400)
  })
})

router.get('/', (req, res, next) => {
  const docid = req.query.docid
  documents.findOne({where: {docid: docid}})
    .then(doc => {
      let endTime = doc.endTime.toISOString().substr(0, 10)
      res.json({
        priority: doc.priority,
        endTime: endTime,
        title: doc.title,
        openMobile: doc.openMobile
      })
    })
})

router.put('/', (req, res, next) => {
  console.log(req.body)
  const classid = req.body.classid
  const docid = req.body.docid
  const x = req.body.x
  const y = req.body.y
  const endTime = new Date(req.body.endTime)
  const title = req.body.title
  const openMobile = req.body.openMobile
  const priority = req.body.priority
  if (typeof classid !== 'undefined') {
    documents.update(
      {x: x, y: y},
      {where: {classid: classid, docid: docid}}
    ).then(result => {
      res.sendStatus(200)
    }).catch(() => {
      res.sendStatus(400)
    })
  } else {
    documents.update({
      endTime: endTime,
      title: title,
      openMobile: openMobile,
      priority: priority
    }, {where: {docid: docid}
    }).then(() => {
      res.sendStatus(200)
    }).catch(() => {
      res.sendStatus(400)
    })
  }
})

export default router

import { Router } from 'express'
import parser from 'body-parser'
import models from '../../models'
import sortDocs from '../../lib/sortdocs'
import docList from '../../lib/doclist'

const documents = models.documents
const router = Router()
router.use(parser.urlencoded({ extended: false }))
router.use(parser.json())

router.get('/', (req, res, next) => {
  const classid = req.query.classid
  docList(classid).then(list => {
    res.json(list)
  })
})

router.post('/', (req, res, next) => {
  const classids = req.body.classids
  const doc = req.body
  console.log(doc)
  const startTime = new Date(doc.startTime)
  const endTime = new Date(doc.endTime)
  let insertData = []
  classids.forEach(id => {
    insertData.push(
      {
        classid: id,
        docid: doc.docid,
        x: doc.x,
        y: doc.y,
        priority: doc.priority,
        openMobile: doc.openMobile,
        title: doc.title,
        startTime: startTime,
        endTime: endTime,
        sizeX: doc.imgsize.width,
        sizeY: doc.imgsize.height
      })
  })
  documents.bulkCreate(insertData)
    .then(result => {
      res.sendStatus(200)
      classids.forEach(e => { sortDocs(e) })
    }).catch(err => {
      console.log(err)
      res.sendStatus(400)
    })
})

export default router

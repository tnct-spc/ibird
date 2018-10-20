import { Router } from 'express'
import parser from 'body-parser'
import models from '../../models'
import sortDocs from '../../lib/sortdocs'

const documents = models.documents
const router = Router()
router.use(parser.urlencoded({ extended: false }))
router.use(parser.json())

router.get('/', (req, res, next) => {
  const docid = req.query.docid
  documents.findAll({where: {docid: docid}})
    .then(docs => {
      let classesIds = []
      docs.forEach(d => classesIds.push(d.classid))
      res.send(classesIds)
    })
    .catch(err => {
      console.log(err)
      res.sendStatus(400)
    })
})

router.put('/', (req, res, next) => {
  const docid = req.body.docid
  const classids = req.body.classids
  documents.findOne({where: {docid: docid}})
    .then(result => {
      let insertData = []
      classids.forEach(id => {
        insertData.push(
          {
            classid: id,
            docid: docid,
            x: 0,
            y: 0,
            priority: result.priority,
            openMobile: result.openMobile,
            title: result.title,
            startTime: result.startTime,
            endTime: result.endTime,
            sizeX: result.sizeX,
            sizeY: result.sizeY
          })
      })
      documents.destroy({where: {docid: docid}})
        .then(() => {
          documents.bulkCreate(insertData)
            .then(() => {
              classids.forEach(i => sortDocs(i))
              res.sendStatus(200)
            })
        })
    }).catch(err => {
      console.log(err)
      res.sendStatus(400)
    })
})

export default router

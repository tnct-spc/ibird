import { Router } from 'express'
import parser from 'body-parser'
import models from '../../models'
import sortDocs from '../../lib/sortdocs'
import docList from '../../lib/doclist'

const documents = models.documents
const temporaryDatas = models.temporaryDatas
const router = Router()
router.use(parser.urlencoded({ extended: false }))
router.use(parser.json())

router.get('/', (req, res, next) => {
  const classid = req.query.classid
  docList(classid).then(list => {
    res.json(list)
  })
})

router.delete('/', (req, res, next) => {
  const docid = req.query.docid
  let classids = new Set()
  documents.findAll({where: {docid: docid}})
    .then(docs => {
      docs.forEach(doc => classids.add(doc.classid))
      documents.destroy({where: {docid: docid}})
      classids.forEach(classid => sortDocs(classid))
      res.sendStatus(200)
    }).catch(err => {
      console.log(err)
      res.sendStatus(400)
    })
})

router.post('/', (req, res, next) => {
  const doc = req.body
  const docid = req.body.docid
  temporaryDatas.create({
    uniqueId: docid,
    data: doc,
    isActive: true
  }).then(respons => {
    res.sendStatus(200)
  }).catch(() => {
    temporaryDatas.findOne({where: {isActive: true, uniqueId: docid}})
      .then(temporary => {
        temporary.isActive = false
        temporary.save()
        const classids = req.body.classids.filter(function (x, i, self) {
          return self.indexOf(x) === i
        })
        const sizeX = temporary.data.width
        const sizeY = temporary.data.height
        const startTime = new Date(doc.startTime)
        const endTime = new Date(doc.endTime)
        let insertData = []
        classids.forEach(id => {
          insertData.push(
            {
              classid: id,
              docid: docid,
              x: doc.x,
              y: doc.y,
              priority: doc.priority,
              openMobile: doc.openMobile,
              title: doc.title,
              startTime: startTime,
              endTime: endTime,
              sizeX: sizeX,
              sizeY: sizeY
            })
        })
        documents.bulkCreate(insertData)
          .then(() => {
            res.sendStatus(200)
            classids.forEach(e => { sortDocs(e) })
          }).catch(err => {
            console.log(err)
            res.sendStatus(400)
          })
      })
  })
})
export default router

import { Router } from 'express'
import parser from 'body-parser'
import models from '../../models'
import sortDocs from '../../lib/sortdocs'
import docList from '../../lib/doclist'

const documents = models.documents
const router = Router()
router.use(parser.urlencoded({ extended: false }))
router.use(parser.json())

router.get('/docs', (req, res, next) => {
  const classid = req.query.classid
  docList(classid).then(list => {
    res.json(list)
  })
})

router.get('/docs-mobile', (req, res, next) => {
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

router.post('/docs', (req, res, next) => {
  const classids = req.body.classids
  const doc = req.body
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

router.delete('/doc', (req, res, next) => {
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

router.put('/doc', (req, res, next) => {
  const classid = req.body.classid
  const docid = req.body.docid
  const x = req.body.x
  const y = req.body.y
  documents.update(
    {updatedAt: Date.now()},
    {where: {classid: classid, docid: docid}}
  ).then(result => {
    if (x && y) {
      documents.update(
        {x: x, y: y},
        {where: {classid: classid, docid: docid}}
      ).then(result => {
        res.sendStatus(200)
      }).catch(err => {
        console.log(err)
        res.sendStatus(400)
      })
    } else {
      res.sendStatus(200)
    }
  }).catch(err => {
    console.log(err)
    res.sendStatus(400)
  })
})

export default router

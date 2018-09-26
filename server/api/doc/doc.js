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

router.put('/', (req, res, next) => {
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

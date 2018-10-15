import { Router } from 'express'
import parser from 'body-parser'
import models from '../../models'

const documents = models.documents
const router = Router()
router.use(parser.urlencoded({ extended: false }))
router.use(parser.json())

router.get('/', (req, res, next) => {
  const docid = req.query.docid
  documents.findOne({
    where: {docid: docid}
  }).then(doc => {
    const endTime = doc.endTime.toISOString()
    const strDate = endTime.substr(0, 4) + '/' + endTime.substr(5, 2) + '/' + endTime.substr(8, 2)
    res.send(strDate)
  }).catch(err => {
    console.log(err)
    res.sendStatus(400)
  })
})

router.put('/', (req, res, next) => {
  const docid = req.body.docid
  const endTime = new Date(req.body.endTime)
  documents.update(
    {endTime: endTime},
    {where: {docid: docid}}
  ).then(() => {
    res.sendStatus(200)
  }).catch(() => {
    res.sendStatus(400)
  })
})

export default router

import { Router } from 'express'
import parser from 'body-parser'
import models from './models'

const documents = models.documents
const router = Router()
router.use(parser.urlencoded({ extended: false }))
router.use(parser.json())

router.get('/:docid', (req, res, next) => {
  const docid = req.params.docid
  documents.findOne({where: {docid: docid}})
    .then(doc => {
      const filename = doc.filename
      const ext = filename.split('.').pop()
      res.download(`.document/${docid}.${ext}`, filename)
    })
})

export default router

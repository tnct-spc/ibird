import { Router } from 'express'
import {savefile, upload} from '../lib/savefile'

const router = Router()
router.post('/upload-file', upload.single('file'), (req, res, next) => {
  savefile(req.file.path).then((docid) => {
    console.log(docid)
    res.status(200).json({docid: docid})
  }).catch(e => {
    console.log(e)
    res.sendStatus(400)
  })
})

export default router

import { Router } from 'express'
import app from 'express'

import multer from 'multer'

const router = Router()

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './pdf/')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + '.pdf')
  }
})

const upload = multer({ storage: storage })

router.post('/pdf', upload.single('pdf'), (req, res, next) => {
  console.log(req.body)
  res.send(req.body)
  //grade , cls , coordinate
})

export default router

import { Router } from 'express'
import app from 'express'

import multer from 'multer'
import { extname } from 'path';

const router = Router()

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    //拡張子(.で切って一番最後の要素)をみる
    switch(file.originalname.split('.').pop()){
      case 'pdf':
        cb(null, '.document/pdf')
        break;
      case 'docx':
      case 'doc':
        cb(null, '.document/docx')
        break
      default:
        cb(null, '.document/unknown')
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '.' + file.originalname.split('.').pop())
  }
})

const upload = multer({ storage: storage })

router.post('/upload-file', upload.single('file'), (req, res, next) => {
  console.log(req.body)
  res.send(req.body)
})

export default router

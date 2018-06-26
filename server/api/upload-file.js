import { Router } from 'express'

import multer from 'multer'

const router = Router()

//拡張子(.で切って一番最後の要素)を返す関数
var extension = (filename) => {
  return filename.split('.').pop()
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    switch(extension(file.originalname)){
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
    cb(null, Date.now() + '.' + extension(file.originalname))
  }
})

const upload = multer({ storage: storage })

router.post('/upload-file', upload.single('file'), (req, res, next) => {
  res.send(req.body)
})

export default router

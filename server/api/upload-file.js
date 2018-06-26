import { Router } from 'express'

import multer from 'multer'
import Converter from 'office-convert'

const router = Router()
const converter = Converter.createConverter();
const office_extensions = ['docx','doc','xls','xlsx','ppt','pptx']

//拡張子(.で切って一番最後の要素)を返す関数
var extension = (filename) => {
  return filename.split('.').pop()
}

//officeファイルをpdfに変換する関数
function officeToPDF(filepath){
  var output = filepath.slice(0, filepath.lastIndexOf('.')) + '.pdf'
  converter.generate(filepath, 'pdf', output)
    .then(console.log).catch(console.error)
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
      case 'xls':
      case 'xlsx':
        cb(null, '.document/xlsx')
        break
      case 'ppt':
      case 'pptx':
        cb(null, '.document/pptx')
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
  var ext = extension(req.file.path)
  if(ext === 'docx' || ext === 'doc'){
    officeToPDF(req.file.path)
  }
  res.send(req.body)
})

export default router

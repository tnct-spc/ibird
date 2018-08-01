import { Router } from 'express'

import multer from 'multer'
import Converter from 'office-convert'
import child_process from 'child_process'

const router = Router()
const converter = Converter.createConverter();
const office_extensions = ['docx','doc','xls','xlsx','ppt','pptx']

//拡張子(.で切って一番最後の要素)を返す関数
const extension = (filename) => {
  return filename.split('.').pop()
}

//officeファイルをpdfに変換する関数
const officeToPDF = (filepath) => {
  const output = filepath.slice(0, filepath.lastIndexOf('.')) + '.pdf'
  return converter.generate(filepath, 'pdf', output)
}

const pdfToJpg = (pdfname) => {
  var filename = pdfname.slice(0,-4) + ".jpg"
  filename = filename.slice(filename.lastIndexOf('/') - filename.length+1) //(jpg拡張子つきの)ファイル名だけ取り出す
  filename = 'static/jpg/' + filename
  child_process.exec('convert -density 300  ' + pdfname.slice(0,-4) + ".pdf " + filename, (err, stdout, stderr) => {
    if (err) { console.log(err); }
    console.log(stdout)
  });
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
  const ext = extension(req.file.path)
  if(office_extensions.indexOf(ext) >= 0){
    officeToPDF(req.file.path).then( (output)=> {
      pdfToJpg(output.outputFile)
      res.send(req.body)
    })
  }else{
    pdfToJpg(req.file.path)
    res.send(req.body)
  }
})

export default router

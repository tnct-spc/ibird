import { Router } from 'express'

import multer from 'multer'
import Converter from 'office-convert'
import childProcess from 'child_process'
import sizeOf from 'image-size'

const router = Router()
const converter = Converter.createConverter()
const officeExtensions = ['docx', 'doc', 'xls', 'xlsx', 'ppt', 'pptx']

// 拡張子(.で切って一番最後の要素)を返す関数
const extension = (filename) => {
  return filename.split('.').pop()
}

// ファイルの名前だけ取る関数
const filename = (filename) => {
  return filename.slice(filename.lastIndexOf('/') - filename.length + 1)
}

// officeファイルをpdfに変換する関数
const officeToPDF = (filepath) => {
  const output = filepath.slice(0, filepath.lastIndexOf('.')) + '.pdf'
  return converter.generate(filepath, 'pdf', output)
}

// pdfをjpgに変換する関数
const pdfToJpg = (pdfPath) => {
  var jpgPath = pdfPath.slice(0, -4) + '.jpg'
  jpgPath = 'static/jpg/' + filename(jpgPath)
  childProcess.execSync('convert -density 300  ' + pdfPath.slice(0, -4) + '.pdf ' + jpgPath)

  // pdfの枚数を取得
  const pdfinfo = childProcess.execSync('pdfinfo  ' + pdfPath.slice(0, -4) + '.pdf ').toString()
  const pages = Number(pdfinfo.split(/\r\n|\r|\n/)[6].slice(-3))
  if (pages > 1) {
    childProcess.execSync(`convert +append ${jpgPath.slice(0, -4)}-0.jpg ${jpgPath.slice(0, -4)}-1.jpg ${jpgPath}`)
  }
  return filename(jpgPath)
}

const upload = multer({ storage: multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '.document/')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '.' + extension(file.originalname))
  }
})})

async function run (path) {
  // 拡張子がofficeだったらconvertしてpathにpdfのpathを入れる
  if (officeExtensions.indexOf(extension(path)) >= 0) {
    const result = await officeToPDF(path)
    path = result.outputFile
  }
  var docid = pdfToJpg(path)
  docid = docid.slice(0, -4)
  const imgsize = sizeOf(`static/jpg/${docid}.jpg`)
  return {docid: docid, imgsize: imgsize}
}

router.post('/upload-file', upload.single('file'), (req, res, next) => {
  run(req.file.path).then((doc) => {
    console.log(doc.docid)
    res.status(200).json(doc)
  }).catch(e => {
    console.log(e)
    res.sendStatus(400)
  })
})

export default router

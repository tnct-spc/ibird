import multer from 'multer'
import Converter from 'office-convert'
import childProcess from 'child_process'

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
  console.log(jpgPath)
  childProcess.execSync('convert -density 300  ' + pdfPath.slice(0, -4) + 'pdf' + jpgPath)
  return filename(jpgPath)
}

export const upload = multer({ storage: multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '.document/')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '.' + extension(file.originalname))
  }
})})

export async function savefile (path) {
  // 拡張子がofficeだったらconvertしてpathにpdfのpathを入れる
  if (officeExtensions.indexOf(extension(path)) >= 0) {
    const result = await officeToPDF(path)
    path = result.outputFile
  }
  var docid = pdfToJpg(path)
  docid = docid.slice(0, -4)
  return docid
}

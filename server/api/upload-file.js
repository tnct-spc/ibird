import { Router } from 'express'

import multer from 'multer'
import Converter from 'office-convert'
import child_process from 'child_process'
import { w3cwebsocket } from 'websocket'
import sizeOf from "image-size";
import axios from 'axios'
const W3cwebsocket = w3cwebsocket
import models from '../models'

const router = Router()
const converter = Converter.createConverter();
const office_extensions = ['docx','doc','xls','xlsx','ppt','pptx']
const temporaryDatas = models.temporaryDatas

//拡張子(.で切って一番最後の要素)を返す関数
const extension = (filename) => {
  return filename.split('.').pop()
}

//ファイルの名前だけ取る関数
const filename = (filename) => {
  return filename.slice(filename.lastIndexOf('/') - filename.length+1)
}

//officeファイルをpdfに変換する関数
const officeToPDF = (filepath) => {
  const output = filepath.slice(0, filepath.lastIndexOf('.')) + '.pdf'
  return converter.generate(filepath, 'pdf', output)
}

//pdfをjpgに変換する関数
const pdfToJpg = (pdfPath) => {
  var jpgPath = pdfPath.slice(0,-4) + ".jpg"
  jpgPath = 'static/jpg/' + filename(jpgPath)
  child_process.execSync('convert -density 300  ' + pdfPath.slice(0,-4) + ".pdf[0] " + jpgPath)
  return filename(jpgPath)
}

const upload = multer({ storage: multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '.document/')
  },
  filename: (req, file, cb) => {
    cb(null, req.body.docid + '.' + extension(file.originalname))
  }
})})

async function run(path, docid){
  //拡張子がofficeだったらconvertしてpathにpdfのpathを入れる
  if(office_extensions.indexOf(extension(path)) >= 0){
    const result = await officeToPDF(path)
    path = result.outputFile
  }
  var docid = pdfToJpg(path)
  docid = docid.slice(0, -4)
  const imgsize = sizeOf(`static/jpg/${docid}.jpg`);
  return imgsize
}

router.post('/upload-file', upload.single('file'), (req, res, next) => {
  const docid = req.body.docid
  run(req.file.path, docid).then((imgsize) =>{
    temporaryDatas.find({where: {
      isActive: true,
      NoCollisonKey: docid
    }}).then(temporary => {
      if (temporary === null) {
        temporaryDatas.create({
          NoCollisonKey: docid,
          data: imgsize,
          isActive: true
        })
      } else {
        temporary.isActive = false
        temporary.save()
        const doc = temporary.data
        const sizeX = imgsize.width
        const sizeY = imgsize.height
        const classids = req.doc.classids
        const startTime = new Date(doc.startTime)
        const endTime = new Date(doc.endTime)
        classids.forEach(id => {
          insertData.push(
            {
              classid: id,
              docid: docid,
              x: doc.x,
              y: doc.y,
              priority: doc.priority,
              openMobile: doc.openMobile,
              title: doc.title,
              startTime: startTime,
              endTime: endTime,
              sizeX: sizeX,
              sizeY: sizeY
            })
        })
        documents.bulkCreate(insertData)
          .then(result => {
            res.sendStatus(200)
            classids.forEach(e => { sortDocs(e) })
          }).catch(err => {
            console.log(err)
            res.sendStatus(400)
          })
        }
    }).catch(e =>{
      console.log(e)
      res.sendStatus(400)
    })
  })
})

export default router

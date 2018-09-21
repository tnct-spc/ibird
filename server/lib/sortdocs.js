import { w3cwebsocket } from 'websocket'
import models from '../models'
import docList from './doclist'

const W3cwebsocket = w3cwebsocket
const classes = models.classes

const laiderSearch = (right, width, matrix) => {
  let sealings = []
  for (let i = 0; i <= 4; i++) {
    let x = right + (width * i / 4)
    matrix.forEach(m => {
      if (m.left <= x && x <= m.right) {
        sealings.push(m.bottom)
      }
    })
  }
  if (sealings.length === 0) return 0
  return Math.max.apply(null, sealings)
}

export default classid => {
  var makeRandom = ''
  classes.findById(classid)
    .then(result => {
      makeRandom = result.randomSort
    }).catch(err => {
      console.log(err)
      return 400
    })
  docList(classid).then(list => {
    // list並べる順番にsortする処理
    let temp = list
    temp.sort((a, b) => {
      if (a.endTime < b.endTime) return -1
      if (a.endTime > b.endTime) return 1
      if (a.docid < b.docid) return -1
      if (a.docid > b.docid) return 1
      return 0
    })
    let plis = []
    let lis = []
    temp.forEach(v => {
      if (v.priority === 1) plis.push(v)
      else lis.push(v)
    })
    let sortedList = plis.concat(lis)
    let cleanX = 0
    let cleanY = 300
    let oldPaperSizeX = 0
    let paperMatrix = []
    for (let i = 0; i < sortedList.length; i++) {
      let sizeX = sortedList[i].sizeX * 0.60
      let sizeY = sortedList[i].sizeY * 1.06
      if (cleanX + oldPaperSizeX + 200 < 10000 - sizeX) {
        cleanX += oldPaperSizeX + 200
      } else {
        cleanX = 0
        cleanY = 5000
        cleanX += 200
      }
      cleanY = laiderSearch(cleanX, sizeX, paperMatrix) + 300
      paperMatrix.push({
        bottom: cleanY + sizeY,
        right: cleanX + sizeX,
        left: cleanX
      })
      sortedList[i].x = cleanX
      sortedList[i].y = cleanY
      if (makeRandom && (i < 9 || sortedList.length === 10)) {
        sortedList[i].x += Math.random() * 140 - 70
        sortedList[i].y += Math.random() * 140 - 70
      }
      sortedList[i].save()
      oldPaperSizeX = sizeX
    }
    const c = new W3cwebsocket('ws://localhost:3000/ws/refresh')
    c.onopen = () => c.send('{}')
  })
}

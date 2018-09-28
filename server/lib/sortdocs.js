import { w3cwebsocket } from 'websocket'
import models from '../models'
import docList from './doclist'

const W3cwebsocket = w3cwebsocket
const classes = models.classes

// 上方向にあるドキュメントの高さを求める
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
    // 掲示物どうしの間隔
    const paperCloseX = 100
    const paperCloseY = 300
    let cleanX = 0
    let cleanY = paperCloseY
    let oldPaperSizeX = 0
    let paperMatrix = []
    // ソートされたものを配置するfor
    for (let i = 0; i < sortedList.length; i++) {
      let sizeX = sortedList[i].sizeX * 0.60 // 紙の解像度と謎な座標系を合わせるための定数
      let sizeY = sortedList[i].sizeY * 1.06
      // 左側に飛び出したときの場合分け
      if (cleanX + oldPaperSizeX + paperCloseX < 10000 - sizeX) {
        cleanX += oldPaperSizeX + paperCloseX
      } else {
        cleanX = 0
        cleanY = 5000
        cleanX += paperCloseX
      }
      cleanY = laiderSearch(cleanX, sizeX, paperMatrix) + paperCloseY
      // あとからx軸がかぶってる紙の高さを得るためにストック
      paperMatrix.push({
        bottom: cleanY + sizeY,
        right: cleanX + sizeX,
        left: cleanX
      })
      if (cleanY + sizeY > 10000) {
        sortedList[i - 1].x = 8000
        sortedList[i - 1].y = 5000
        cleanX = 8000
        cleanY = 5000
      }
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

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
  let makeRandom
  classes.findById(classid)
    .then(result => {
      makeRandom = result.randomSort
    }).catch(err => {
      console.log(err)
      return 400
    })
  docList(classid).then(list => {
    // 日付順に並べる処理
    let temp = list
    temp.sort((a, b) => {
      if (a.endTime < b.endTime) return -1
      if (a.endTime > b.endTime) return 1
      if (a.docid < b.docid) return -1
      if (a.docid > b.docid) return 1
      return 0
    })
    // 優先度の実装
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
    let cleanY = 0
    let paperMatrix = []
    let startXS = [paperCloseX]
    let overflowDisp = 0
    let randFlag
    let incrementIndex
    // ソートされたものを配置するfor
    for (var i = 0; i < sortedList.length; i++) {
      const sizeX = sortedList[i].sizeX * 0.60 // 紙の解像度と謎な座標系を合わせるための定数
      const sizeY = sortedList[i].sizeY * 1.06
      cleanX = null
      randFlag = true
      for (var i2 = 0; i2 < startXS.length; i2++) {
        if (startXS[i2] + sizeX + paperCloseX < 10000) {
          cleanX = startXS[i2]
          startXS[i2] += sizeX + paperCloseX
          incrementIndex = i2
          break
        }
      }
      if (!cleanX) {
        cleanX = paperCloseX
        startXS.push(paperCloseX * 2 + sizeX)
      }
      // Y座標の計算
      cleanY = laiderSearch(cleanX, sizeX, paperMatrix) + paperCloseY
      if (cleanY + sizeY > 8200) {
        if (cleanX + sizeX > 6000 || cleanY + sizeY > 10000) {
          cleanX = 10000 - sizeX - overflowDisp
          cleanY = 8200 - sizeY
          overflowDisp += 100
          randFlag = false
          startXS[incrementIndex] -= sizeX + paperCloseX
        }
      }
      // あとからx軸がかぶってる紙の高さを得るためにストック
      paperMatrix.push({
        bottom: cleanY + sizeY,
        right: cleanX + sizeX,
        left: cleanX
      })

      sortedList[i].x = cleanX
      sortedList[i].y = cleanY
      if (makeRandom && randFlag) {
        sortedList[i].x += Math.random() * 140 - 70
        sortedList[i].y += Math.random() * 140 - 70
      }
      sortedList[i].save()
    }
    const c = new W3cwebsocket('ws://localhost:3000/ws/refresh')
    c.onopen = () => c.send('{}')
  })
}

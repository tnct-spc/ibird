import { w3cwebsocket } from 'websocket'
import models from '../models'
import docList from './doclist'

const W3cwebsocket = w3cwebsocket
const classes = models.classes

export default classid => {
  var makeRandom = ''
  classes.findById(classid)
    .then(result => {
      makeRandom = result.randomSort
    }).catch(err => {
      console.log(err)
      return 400
    })
  // 並べる場所,今はてきとう
  let cleanXYS = [
    {x: 200, y: 400},
    {x: 2200, y: 400},
    {x: 4200, y: 400},
    {x: 6200, y: 400},
    {x: 8200, y: 400},
    {x: 200, y: 5000},
    {x: 2200, y: 5000},
    {x: 4200, y: 5000},
    {x: 6200, y: 5000},
    {x: 8200, y: 5000}
  ]
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
    for (let i = 0; i < sortedList.length; i++) {
      if (cleanXYS.length <= i) {
        cleanXYS.push({
          x: cleanXYS[i - 1].x + 50,
          y: cleanXYS[i - 1].y + 50
        })
      }
      sortedList[i].x = cleanXYS[i].x
      sortedList[i].y = cleanXYS[i].y
      if (makeRandom && (i < 9 || sortedList.length === 10)) {
        sortedList[i].x += Math.random() * 250 - 125
        sortedList[i].y += Math.random() * 250 - 125
      }
      sortedList[i].save()
    }
    const c = new W3cwebsocket('ws://localhost:3000/ws/refresh')
    c.onopen = () => c.send('{}')
  })
}

import models from '../models'
const documents = models.documents

export default classid => {
  return documents.findAll({
    where: {classid: classid}
  }).then(c => {
    var returndata = c.filter(p => {
      var startTime = new Date(p.startTime)
      startTime = new Date(startTime.setHours(startTime.getHours() - 9))
      var endTime = new Date(p.endTime)
      endTime = new Date(endTime.setHours(endTime.getHours() - 9))
      endTime.setDate(endTime.getDate() + 1)
      const a = new Date() - startTime > 0 // 開始日を過ぎているかどうか(当日はtrue)
      const b = endTime - new Date() > 0 // 終了日より前(当日はtrue)
      return a && b
    })
    return returndata
  })
}

import Router from 'express'

import fetch from 'node-fetch'

const router = Router()

router.get('/yolp', function (req, res, next) {
    const lat = '35.632789'
    const lon = '139.294293'
    const z = '15'
    const width = req.query.width
    const height = req.query.height

    var alignment = function(number) {
        if (number < 10) {
            number = "0" + number
        }
        return number
    }

    var now = new Date()
    var year = String(alignment(now.getFullYear()))
    var month = String(alignment(now.getMonth() + 1))
    var date = String(alignment(now.getDate()))
    var hour = String(alignment(now.getHours()))
    var minute = String(alignment(now.getMinutes()))

    var url = 'https://map.yahooapis.jp/map/V1/static?appid=dj0zaiZpPXVZaDlrczVieXNFYSZzPWNvbnN1bWVyc2VjcmV0Jng9ZGE-&lat=' + lat + '&lon=' + lon + '&z=' + z + '&width=' + width + '&height=' + height + '&mode=map&overlay=type:rainfall|date:' + year + month + date + hour + minute + '|datelabel:off&output=jpeg'

    fetch(url)
    .then(data => data.buffer())
    .then(data => {
        res.writeHead(200, { 'Content-Type': 'image/jpeg' })
        res.write(data)
        res.send()
    })
    .catch(err => console.error(err))
})

export default router

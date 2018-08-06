import Router from 'express'

import fetch from 'node-fetch'

const router = Router()

router.get('/yolp', function (req, res, next) {
    const lat = req.query.lat
    const lon = req.query.lon
    const z = req.query.z
    const width = req.query.width
    const height = req.query.height

    const alignment = function(number) {
        if (number < 10) {
            number = "0" + number
        }
        return number
    }

    const now = new Date()
    const year = String(alignment(now.getFullYear()))
    const month = String(alignment(now.getMonth() + 1))
    const day = String(alignment(now.getDay()))
    const hour = String(alignment(now.getHours()))
    const minute = String(alignment(now.getMinutes()))

    const url = 'https://map.yahooapis.jp/map/V1/static?appid=dj0zaiZpPXVZaDlrczVieXNFYSZzPWNvbnN1bWVyc2VjcmV0Jng9ZGE-&lat=' + lat + '&lon=' + lon + '&z=' + z + '&width=' + width + '&height=' + height + '&mode=map&overlay=type:rainfall|date:' + year + month + day + hour + minute + '|datelabel:on&output=jpeg'

    console.log(year,month,day,hour,minute)
    console.log(url)

    fetch(url)
    .then(data => data.buffer())
    .then(data => {
        res.writeHead(200, { 'Content-Type': 'image/jpeg' })
        res.write(data)
        res.send()
    })
    .catch(err => sendStatus(400))
})

export default router
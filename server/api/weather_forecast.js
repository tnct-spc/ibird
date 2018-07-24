import { Router } from 'express'

const router = Router()

const fetch = require('node-fetch')

router.get("/yolp", function (req, res, next) {
    const yahooAppId = "dj0zaiZpPXVZaDlrczVieXNFYSZzPWNvbnN1bWVyc2VjcmV0Jng9ZGE-"
    const lat = req.query.lat
    const lon = req.query.lon
    const z = req.query.z
    const width = req.query.width
    const height = req.query.height
    const addmin = req.query.addmin - 0

    if (addmin > 60) {
        res.sendStatus(400)
    }

    console.log(lat)
    console.log(lon)
    console.log(z)
    console.log(width)
    console.log(height)
    console.log(addmin)

    const now = new Date()
    const time = new Date()
    time.setMinutes(now.getMinutes() + addmin)

    console.log(now.toLocaleString("ja-JP"))
    console.log(time.toLocaleString("ja-JP"))

    var year = time.getFullYear()
    var month = time.getMonth() + 1
    var date = time.getDate()
    var hour = time.getHours()
    var minute = time.getMinutes()

    console.log(year)
    console.log(month)
    console.log(date)
    console.log(hour)
    console.log(minute)

    var yyyymmddhhmm = function (a) {
        if (a < 10) {
            a = "0" + a
        }
        return a
    }

    month = yyyymmddhhmm(month)
    date = yyyymmddhhmm(date)
    hour = yyyymmddhhmm(hour)
    minute = yyyymmddhhmm(minute)

    console.log(year)
    console.log(month)
    console.log(date)
    console.log(hour)
    console.log(minute)


    const url = "https://map.yahooapis.jp/map/V1/static?appid=" + yahooAppId + "&lat=" + lat + "&lon=" + lon + "&z=" + z + "&width=" + width + "&height=" + height + "&mode=map&overlay=type:rainfall|date:" + year + month + date + hour + minute + "|datelabel:on&output=jpeg"

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

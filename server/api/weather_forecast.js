import { Router } from 'express'

import fetch from "node-fetch"

const router = Router()

router.get("/yolp", function (req, res, next) {
    const lat = req.query.lat
    const lon = req.query.lon
    const z = req.query.z
    const width = req.query.width
    const height = req.query.height
    var yyyy = req.query.yyyy
    var MM = req.query.MM - 1
    var dd = req.query.dd
    var HH = req.query.HH
    var mm = req.query.mm

    const now = new Date()
    const pass = new Date(yyyy,MM,dd,HH,mm)

    if (now < pass) {
        res.sendStatus(400)
    }

    MM = MM + 1

    const tuning = function (a) {
        if (a < 10) {
            a = "0" + a
        }
        return a
    }

    MM = tuning(MM)
    dd = tuning(dd)
    HH = tuning(HH)
    mm = tuning(mm)
    
    const url = "https://map.yahooapis.jp/map/V1/static?appid=dj0zaiZpPXVZaDlrczVieXNFYSZzPWNvbnN1bWVyc2VjcmV0Jng9ZGE-&lat=" + lat + "&lon=" + lon + "&z=" + z + "&width=" + width + "&height=" + height + "&mode=map&overlay=type:rainfall|date:" + yyyy + MM + dd + HH + mm + "|datelabel:on&output=jpeg"

    console.log(yyyy,MM,dd,HH,mm,now,pass)
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

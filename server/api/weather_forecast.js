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
    const yyyymmdd = req.query.yyyymmdd
    
    console.log(lat)
    console.log(lon)
    console.log(z)
    console.log(width)
    console.log(height)
    console.log(yyyymmdd)
    
    const url = "https://map.yahooapis.jp/map/V1/static?appid=" + yahooAppId + "&lat=" + lat + "&lon=" + lon + "&z=" + z + "&width=" + width + "&height=" + height + "&mode=map&overlay=type:rainfall|date:" + yyyymmdd + "1200|datelabel:on&output=jpeg"

    console.log(url)

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

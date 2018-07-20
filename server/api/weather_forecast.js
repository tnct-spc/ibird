import { Router } from 'express'

const router = Router()

const fetch = require('node-fetch')

router.get("/yolp", function (req, res, next) {
    const yahooAppId = "dj0zaiZpPXVZaDlrczVieXNFYSZzPWNvbnN1bWVyc2VjcmV0Jng9ZGE-" // Yahooで登録してこのIDを取得しないといけない。それをここに書く。
    const lat = req.query.lat
    const lon = req.query.lon
    const z = req.query.z
    const width = req.query.width
    const height = req.query.height
    const yyyymmdd = req.query.yyyymmdd
    
    console.log(lat)
    console.log(lon)
    console.log(z)
    
    const url = "https://map.yahooapis.jp/map/V1/static?appid=" + yahooAppId + "&lat=" + lat + "&lon=" + lon + "&z=" + z + "&width=" + width + "&height=" + height + "&mode=map&overlay=type:rainfall|date:" + yyyymmdd + "1200|datelabel:on&output=jpeg"

    console.log(url)
     fetch(url)
         // 結果は画像のバイナリデータとして返ってくる。
         .then(data => data.buffer()) // ここでBuffer型オブジェクトにする。※これはブラウザであるようなfetchではなくnode-fetchだけの拡張機能。
         .then(data => {
             res.writeHead(200, { 'Content-Type': 'image/jpeg' }); // レスポンスとしてjpeg送るぞ！という情報をセット
             res.write(data); // レスポンスに値書き込む。
             res.send(); // レスポンス送る
         })
         .catch(err => console.error(err)); // Promiseのチェーンでエラーが起きたときにそれをログとして吐き出している。
    res.sendStatus(200)
});

export default router

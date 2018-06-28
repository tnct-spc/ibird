import { Router } from 'express'

const router = Router()

router.get("/yolp/:yyyymmdd", function (req, res, next) {
    const yahooAppId = req.params.yahooAppId; // Yahooで登録してこのIDを取得しないといけない。それをここに書く。これは僕のIDなので、試す目的以外で使わないでね！
    const lat = req.params.lat;
    const lon = req.params.lon;
    const z = req.params.z;
    const width = req.params.width;
    const height = req.params.height;
    const yyyymmdd = req.params.yyyymmdd
    
    const url = "https://map.yahooapis.jp/map/V1/static?appid=" + yahooAppId + "&lat=" + lat + "&lon=" + lon + "&z=11&width=300&height=200&mode=map&overlay=type:rainfall|date:" + yyyymmdd + "1200|datelabel:on&output=jpeg"

    fetch(url)
        // 結果は画像のバイナリデータとして返ってくる。
        .then(data => data.buffer()) // ここでBuffer型オブジェクトにする。※これはブラウザであるようなfetchではなくnode-fetchだけの拡張機能。
        .then(data => {
            res.writeHead(200, { 'Content-Type': 'image/jpeg' }); // レスポンスとしてjpeg送るぞ！という情報をセット
            res.write(data); // レスポンスに値書き込む。
            res.send(); // レスポンス送る
        })
        .catch(err => console.error(err)); // Promiseのチェーンでエラーが起きたときにそれをログとして吐き出している。
});

export default router

import { Router } from 'express'
import parser from 'body-parser'
import sechash from 'sechash'
import models from '../../models'

const classes = models.classes
const router = Router()
router.use(parser.urlencoded({ extended: false }))
router.use(parser.json())

const hashopt = {
  algorithm: 'md5', // アルゴリズム
  iterations: 2000, // 繰り返し回数
  salt: 'asdfghjk' // ソルトの設定
}

router.get('/', (req, res, next) => {
  const classid = req.query.classid
  classes.findOne({where: {classid: classid}}).then(result => {
    let pass = result.qrLoginPassword + Math.round(new Date().getTime() / (1000 * 20))
    let uri = sechash.strongHashSync(pass, hashopt).slice(22)
    res.send(uri)
  }).catch(() => {
    res.sendStatus(400)
  })
})

export default router

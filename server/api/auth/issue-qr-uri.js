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

router.post('/', (req, res, next) => {
  const classid = req.body.classid
  const reqpass = req.body.pass
  classes.findOne({where: {classid: classid}}).then(result => {
    let pass = (result.qrLoginPassword + Math.round(new Date().getTime() / (1000 * 20)))
    let nowpass = sechash.strongHashSync(pass, hashopt).slice(22)
    pass = (result.qrLoginPassword + Math.round(new Date().getTime() / (1000 * 20) - 1))
    let oldpass = sechash.strongHashSync(pass, hashopt).slice(22)
    if (nowpass === reqpass || oldpass === reqpass) {
      req.session.hoge = {
        username: 'mobileUser',
        bb: false,
        mobile: true,
        control: false,
        allClass: false,
        classes: [classid]
      }
      return res.send('success')
    } else {
      return res.send('false')
    }
  }).catch(() => {
    return res.send('false')
  })
})

export default router

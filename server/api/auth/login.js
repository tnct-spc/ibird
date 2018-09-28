import { Router } from 'express'
import parser from 'body-parser'
import sechash from 'sechash'
import models from '../../models'

const users = models.users
const router = Router()
router.use(parser.urlencoded({ extended: false }))
router.use(parser.json())

const hashopt = {
  algorithm: 'sha512', // アルゴリズム
  iterations: 2000, // 繰り返し回数
  salt: 'asdfghjkl' // ソルトの設定
}

router.post('/', (req, res, next) => {
  const password = req.body.password
  const username = req.body.username
  // console.log(sechash.strongHashSync(username, hashopt))
  users.findOne({where: {username: username}}).then(user => {
    if (!user) {
      res.status(401).json({ message: 'ユーザーネーム又はパスワードが間違っています' }).send()
    } else if (user.hashedPassword === sechash.strongHashSync(password, hashopt)) {
      // hash化して確認
      // 認証
      req.session.authUser = {
        username: username,
        bb: user.openBB,
        mobile: user.openMobile,
        control: user.openControl,
        allclass: user.allclass,
        Classes: user.authorityClasses
      }
      return res.json({ username: username })
    } else {
      res.status(401).json({ message: 'ユーザーネーム又はパスワードが間違っています' })
    }
  }).catch(err => {
    console.log(err)
    res.status(401).json({ message: 'エラーが発生しました' })
  })
})

export default router

import { Router } from 'express'
import parser from 'body-parser'

const router = Router()
router.use(parser.urlencoded({ extended: false }))
router.use(parser.json())

router.post('/', (req, res, next) => {
  delete req.session.authUser
  res.json({ ok: true })
})

export default router

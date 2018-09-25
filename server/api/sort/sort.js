import { Router } from 'express'
import parser from 'body-parser'
import sortDocs from '../../lib/sortdocs'

const router = Router()
router.use(parser.urlencoded({ extended: false }))
router.use(parser.json())

router.put('/', (req, res, next) => {
  const classid = req.body.classid
  sortDocs(classid)
  res.sendStatus(200)
})

export default router

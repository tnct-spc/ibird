import { Router } from 'express'
import parser from 'body-parser'
import docList from '../../lib/doclist'

const router = Router()
router.use(parser.urlencoded({ extended: false }))
router.use(parser.json())

router.get('/', (req, res, next) => {
  const classid = req.query.classid
  docList(classid).then(list => {
    var returndata = list.filter(p => {
      console.log(p.openMobile)
      return p.openMobile
    })
    res.json(returndata)
    console.log(returndata)
  }).catch(err => {
    console.log(err)
    res.statu(404)
  })
})

export default router

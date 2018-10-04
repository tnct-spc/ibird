import { Router } from 'express'
import parser from 'body-parser'
import models from '../../models'

const schools = models.schools
const router = Router()
router.use(parser.urlencoded({ extended: false }))
router.use(parser.json())

const schoolId = 1
// まだ複数学校に対応していないのでハードコーディング

router.get('/', (req, res, next) => {
  schools.findById(schoolId).then(school => {
    res.status(200).send(school.background_images)
  }).catch(err => {
    console.log(err)
    res.sendStatus(500)
  })
})

export default router

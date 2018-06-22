import { Router } from 'express'
import app from 'express'

import parser from 'body-parser'
import multer from 'multer'

const router = Router()
const upload = multer({ dest: './pdf/' });

router.use(parser.urlencoded({
    extended: true
}));
router.use(parser.json());

router.post('/users', upload.single('pdf'), (req, res, next) => {
  console.log(req.body.grade)
  console.log(req.body.cls)
  console.log('success')
})

export default router

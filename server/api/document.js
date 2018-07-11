import { Router } from 'express'
const router = Router()
import models from '../models'

router.get('/class', (req, res, next) => {
  res.send("HELLO")
})
export default router

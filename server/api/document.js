import { Router } from 'express'
const router = Router()

router.get('/class', (req, res, next) => {
  res.send("HELLO")
})
export default router

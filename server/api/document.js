import { Router } from 'express'
const models = require("../../models")
const router = Router()

router.get('/class', (req, res, next) => {
  res.send("HELLO")
})
export default router

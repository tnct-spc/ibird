import { Router } from 'express'

const router = Router()

const users = [
    { test: 'hello1' },
    { test: 'hello2' },
    { test: 'hello3' },
]

router.get('/test', function (req, res, next) {
  res.json(users)
})

export default router

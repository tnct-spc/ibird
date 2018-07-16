import { Router } from 'express'

const router = Router()

router.get('/class', (req, res, next) => {
    console.log("HelloWorld")
    res.sendStatus(200)
})

export default router

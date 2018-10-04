import { Router } from 'express'

import login from './login'
import logout from './logout'

const router = Router()

router.use('/login', login)
router.use('/logout', logout)

export default router

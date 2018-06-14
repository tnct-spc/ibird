import { Router } from 'express'

import users from './users'
import arrangement from './arrangement'

const router = Router()

// Add USERS Routes
router.use(users)
router.use(arrangement)

export default router

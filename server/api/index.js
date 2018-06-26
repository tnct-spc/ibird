import { Router } from 'express'

import users from './users'
import timetable from './timetable'

const router = Router()

// Add USERS Routes
router.use(users)

router.use(timetable)

export default router

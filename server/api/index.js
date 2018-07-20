import { Router } from 'express'

import users from './users'
import timetable from './timetable'
import upload_file from './upload-file'

const router = Router()

// Add USERS Routes
router.use(users)
router.use(upload_file)
router.use(timetable)

export default router

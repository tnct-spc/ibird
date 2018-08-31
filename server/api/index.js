import { Router } from 'express'

import users from './users'
import timetable from './timetable'
import weather from './weather_forecast'
import upload_file from './upload-file'
import classes from './classes'
import auth from './auth'

const router = Router()

// Add USERS Routes
router.use(users)
router.use(weather)
router.use(upload_file)
router.use(classes)
router.use(timetable)
router.use(auth)

export default router

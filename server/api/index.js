import { Router } from 'express'

import users from './users'
import weather from './weather_forecast'
import upload_file from './upload-file'

const router = Router()


// Add USERS Routes
router.use(users)
router.use(weather)
router.use(upload_file)

export default router

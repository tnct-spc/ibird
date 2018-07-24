import { Router } from 'express'

import users from './users'
import weather from './weather_forecast'

const router = Router()

// Add USERS Routes
router.use(users)
router.use(weather)

export default router

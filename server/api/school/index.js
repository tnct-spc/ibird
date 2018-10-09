import { Router } from 'express'

import background from './background'
import backgrounds from './backgrounds'
import timetable from './timetable'

const router = Router()

router.use('/background', background)
router.use('/backgrounds', backgrounds)
router.use('/timetable', timetable)

export default router

import { Router } from 'express'

import timetable from './timetable'
import weather from './weather_forecast'
import uploadFile from './upload-file'
import auth from './auth'
import sort from './sort'
import doc from './doc'
import classes from './classes'
import background from './background'

const router = Router()

router.use(weather)
router.use(uploadFile)
router.use(timetable)
router.use(auth)
router.use(sort)
router.use(doc)
router.use(classes)
router.use(background)

export default router

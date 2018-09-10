import { Router } from 'express'

import timetable from './timetable'
import weather from './weather_forecast'
import uploadFile from './upload-file'
import classes from './classes'
import auth from './auth'
import sort from './sort'
import doc from './doc'

const router = Router()

router.use(weather)
router.use(uploadFile)
router.use(classes)
router.use(timetable)
router.use(auth)
router.use(sort)
router.use(doc)

export default router

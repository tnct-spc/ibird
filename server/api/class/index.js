import { Router } from 'express'

import classid from './class-id'
import classes from './classes'
import yearAndCourses from './year-and-courses'

const router = Router()

router.use('/class-id', classid)
router.use('/classes', classes)
router.use('/year-and-courses', yearAndCourses)

export default router

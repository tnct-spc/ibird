import { Router } from 'express'

import classid from './class-id'
import classes from './classes'
import yearsAndCourses from './years-and-courses'
import courses from './courses'

const router = Router()

router.use('/class-id', classid)
router.use('/classes', classes)
router.use('/years-and-courses', yearsAndCourses)
router.use('/courses', courses)

export default router

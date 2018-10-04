import { Router } from 'express'

import classid from './class-id'
import classes from './classes'
import yearsAndCourses from './years-and-courses'
import courses from './courses'
import yearAndCourse from './year-and-course'

const router = Router()

router.use('/class-id', classid)
router.use('/classes', classes)
router.use('/years-and-courses', yearsAndCourses)
router.use('/courses', courses)
router.use('/year-and-course', yearAndCourse)

export default router

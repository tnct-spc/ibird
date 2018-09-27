import { Router } from 'express'

import classid from './class-id'
import classes from './classes'
import yearsAndCourses from './years-and-courses'
import classApi from './class'

const router = Router()

router.use('/class-id', classid)
router.use('/classes', classes)
router.use('/years-and-courses', yearsAndCourses)
router.use('/class', classApi)

export default router

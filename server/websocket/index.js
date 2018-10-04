import Router from 'express'

import arrangement from './arrangement'
import alert from './alert'
import refresh from './refresh'

const router = Router()

router.use(alert)
router.use(arrangement)
router.use(refresh)

export default router

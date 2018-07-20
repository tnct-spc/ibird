import Router from 'express'

import arrangement from './arrangement'
import alert from './alert'

const router = Router()

router.use(alert)
router.use(arrangement)

export default router
import Router from 'express'

import arrangement from './arrangement'
import alert from './alert'
import refresh from './refresh'
import refreshSetting from './refresh-setting'

const router = Router()

router.use(alert)
router.use(arrangement)
router.use(refresh)
router.use(refreshSetting)

export default router

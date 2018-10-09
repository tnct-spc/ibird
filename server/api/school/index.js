import { Router } from 'express'

import background from './background'
import backgrounds from './backgrounds'

const router = Router()

router.use('/background', background)
router.use('/backgrounds', backgrounds)

export default router

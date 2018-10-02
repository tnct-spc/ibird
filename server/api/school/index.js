import { Router } from 'express'

import background from './background'

const router = Router()

router.use('/background', background)

export default router

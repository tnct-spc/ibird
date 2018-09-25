import { Router } from 'express'

import sort from './sort'
import RandomSort from './RandomSort'

const router = Router()

router.use('/sort', sort)
router.use('/Randomsort', RandomSort)

export default router

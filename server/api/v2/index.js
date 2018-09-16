import { Router } from 'express'

import doc from './doc'
import classes from './classes'

const router = Router()

router.use(doc)
router.use(classes)

export default router

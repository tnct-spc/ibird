import { Router } from 'express'

import doc from './doc'
import docs from './docs'
import docsmobile from './docs-mobile'

const router = Router()

router.use('/doc', doc)
router.use('/docs', docs)
router.use('/docs-mobile', docsmobile)

export default router

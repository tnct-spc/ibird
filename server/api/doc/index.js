import { Router } from 'express'

import doc from './doc'
import docs from './docs'
import docsmobile from './docs-mobile'
import docEndTime from './doc-end-time'

const router = Router()

router.use('/doc', doc)
router.use('/docs', docs)
router.use('/docs-mobile', docsmobile)
router.use('/doc-end-time', docEndTime)

export default router

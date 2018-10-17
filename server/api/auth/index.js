import { Router } from 'express'

import login from './login'
import logout from './logout'
import issueQrUri from './issue-qr-uri'

const router = Router()

router.use('/login', login)
router.use('/logout', logout)
router.use('/issue-qr-uri', issueQrUri)

export default router

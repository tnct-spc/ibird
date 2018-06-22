import { Router } from 'express'

import users from './users'
import pdf_upload from './pdf_upload'

const router = Router()

// Add USERS Routes
router.use(users)
router.use(pdf_upload)

export default router

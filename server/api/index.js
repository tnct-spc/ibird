import { Router } from 'express'

import users from './users'
import upload_file from './upload-file'

const router = Router()

// Add USERS Routes
router.use(users)
router.use(upload_file)

export default router

import { Router } from 'express'

import users from './users'
import upload_file from './upload-file'
import classes from './classes'

const router = Router()

// Add USERS Routes
router.use(users)
router.use(upload_file)
router.use(classes)

export default router

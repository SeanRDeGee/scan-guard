import express from 'express'

import { jobs_get, jobs_post } from '@/endpoints/jobs/jobs.controller'

const router = express.Router()
router.get('/', jobs_get)
router.post('/', jobs_post)

export default router

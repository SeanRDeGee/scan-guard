import express from 'express'

import { jobs_post } from '@/endpoints/jobs/jobs.controller'

const router = express.Router()

router.post('/', jobs_post)

export default router

import express from 'express'

import { version } from '@endpoints/nmap/nmap.controller'

const router = express.Router()

router.get('/version', version)

export default router

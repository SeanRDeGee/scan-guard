import express from 'express'

import { status } from '@endpoints/root/root.controller'
import nmap from '@endpoints/nmap/nmap.route'

const router = express.Router()

router.get('/status', status)
router.use('/nmap', nmap)

export default router

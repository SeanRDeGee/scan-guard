import cors from 'cors'
import express from 'express'

import apiRoot from '@endpoints/root/root.route'

const app = express()

const port = process.env.API_PORT || 5010
const clientUrl = process.env.CLIENT_URL || `http://localhost:3000`

app.use(express.json())
app.use(
    cors({
        origin: clientUrl,
        credentials: true,
    })
)

// API entry point
app.use('/api', apiRoot)

// Start the API server
app.listen(port, () => {
    console.log(`🚀 ScanGuard API started on port ${port}`)
})

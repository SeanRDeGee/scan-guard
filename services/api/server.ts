import http from 'http'
import cors from 'cors'
import express from 'express'
import { Server as SocketServer } from 'socket.io'

import apiRoot from '@endpoints/root/root.route'

const port = process.env.API_PORT || 5000
const clientUrl = process.env.CLIENT_URL || `http://localhost:3000`

const app = express()

app.use(express.json())
app.use(
    cors({
        origin: clientUrl,
        credentials: true,
    })
)

// API entry point
app.use('/api', apiRoot)

const server = http.createServer(app)

export const io = new SocketServer(server, {
    cors: {
        origin: clientUrl,
        methods: ['GET', 'POST'],
        credentials: true,
    },
})

export const startServer = function () {
    server.listen(port, () => {
        console.log(`🚀 ScanGuard API started on port ${port}`)
    })
}

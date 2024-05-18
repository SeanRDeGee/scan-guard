import http from 'http'
import express from 'express'
import { Server as SocketServer } from 'socket.io'
import nmap from '@scan-guard/nmap-service'

const port = process.env.API_PORT || 5000
const clientUrl = process.env.CLIENT_URL || `http://localhost:3000`

const app = express()
const server = http.createServer(app)
const io = new SocketServer(server, {
    cors: {
        origin: clientUrl,
        methods: ['GET', 'POST'],
        credentials: true,
    },
})

io.on('connect', socket => {
    socket.on('nmap-check', async () => {
        try {
            const isInstalled = await nmap.isInstalled()
            socket.emit('nmap-check', isInstalled)
        } catch {
            socket.emit('nmap-check', false)
        }
    })
})

server.listen(port, () => {
    console.log(`🚀 ScanGuard Request Service started on port ${port}`)
})

import http from 'http'
import express from 'express'
import { Server as SocketServer } from 'socket.io'

const app = express()
const server = http.createServer(app)
const io = new SocketServer(server)

const port = process.env.API_PORT || 5000

server.listen(port, () => {
    console.log(`🚀 ScanGuard Request Service started on port 3000`)
})

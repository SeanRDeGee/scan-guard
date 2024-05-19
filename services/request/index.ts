import http from 'http'
import express from 'express'
import { Server as SocketServer } from 'socket.io'
import nmap from '@scan-guard/nmap-service'

import type { IncomingRequest, RequestCreateSingleIP, RequestResponseSingleIP } from '@/interfaces'

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

    socket.on('nmap-request', async (data: IncomingRequest) => {
        if (data.type === 'single-ip') {
            try {
                const request: RequestCreateSingleIP = data as RequestCreateSingleIP

                const result = await nmap.scanSingleIP(request.data.ip)

                // Is host reachable?
                const up = result.includes('Host is up')

                // Host unreachable
                if (!up) {
                    const response: RequestResponseSingleIP = {
                        id: data.id,
                        completedAt: Date.now(),
                        status: 'completed',
                        data: {
                            up: false,
                            result: null,
                        },
                    }
                    socket.emit('nmap-response', response)
                    return
                }

                // Host reachable

                // Extract latency
                const latencyMatch = result.match(/Host is up \((\d+\.\d+)s latency\)/)
                const latency = latencyMatch ? parseFloat(latencyMatch[1]) : 0

                // Extract ports
                const portMatches = result.matchAll(/(\d+)\/(tcp|udp)\s+(\w+)\s+(\w+)/g)

                const ports = []
                for (const match of portMatches) {
                    const port = parseInt(match[1])
                    const state = match[3]
                    const service = match[4]
                    ports.push({ port, state, service })
                }

                const response: RequestResponseSingleIP = {
                    id: data.id,
                    completedAt: Date.now(),
                    status: 'completed',
                    data: {
                        up: true,
                        result: {
                            latency: latency,
                            ports: ports,
                        },
                    },
                }

                socket.emit('nmap-response', response)
            } catch (error) {
                const response: RequestResponseSingleIP = {
                    id: data.id,
                    completedAt: Date.now(),
                    status: 'failed',
                    data: null,
                    error: error,
                }
                socket.emit('nmap-response', response)
            }
        }
    })
})

server.listen(port, () => {
    console.log(`🚀 ScanGuard Request Service started on port ${port}`)
})

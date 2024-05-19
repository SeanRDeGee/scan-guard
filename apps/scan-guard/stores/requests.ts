import { defineStore } from 'pinia'
import { v4 as uuid } from 'uuid'

import type { RequestCreateSingleIP, RequestResponseSingleIP } from '@scan-guard/request-service/interfaces'

export const useRequestsStore = defineStore('requests', () => {
    const requestSocket = useSocket()

    const localDatabase = useLocalDatabase()
    const db = localDatabase.db

    // 🦖 Request Types
    // ----------------------------------------------------------------------------------------------
    type GenericRequest = {
        id: string
        type: string
        status: string
        createdAt: number
        completedAt: number | null
        requestPayload: unknown | null
        data: unknown | null
        error: unknown | null
    }

    type RequestSingleIP = {
        id: string
        type: 'single-ip'
        status: string
        createdAt: number
        completedAt: number | null
        requestPayload: {
            ip: string
        }
        data: {
            up: boolean
            result: {
                latency: number
                ports: {
                    port: number
                    state: string
                    service: string
                }[]
            } | null
        } | null
        error: unknown | null
    }

    // 🚀 Requests
    // ----------------------------------------------------------------------------------------------
    const requests = ref<GenericRequest[]>([])

    const singleIPRequests = computed<RequestSingleIP[]>(() => {
        return requests.value
            .filter(request => request.type === 'single-ip')
            .sort((a, b) => b.createdAt - a.createdAt) as RequestSingleIP[]
    })

    const getRequests = async function () {
        requests.value = await db.requests.toArray()
    }

    // ➕ Create Requests
    // ----------------------------------------------------------------------------------------------
    const createSingleIPRequest = async function (ip: string) {
        const id = uuid()

        const request: RequestSingleIP = {
            id,
            type: 'single-ip',
            status: 'pending',
            createdAt: Date.now(),
            completedAt: null,
            requestPayload: { ip },
            data: null,
            error: null,
        }

        await db.requests.add(request)
        await getRequests()

        const requestCreate: RequestCreateSingleIP = {
            id,
            type: 'single-ip',
            data: { ip },
        }

        requestSocket.emit('nmap-request', requestCreate)
    }

    // 👂 Requests Listener
    // ----------------------------------------------------------------------------------------------
    requestSocket.on('nmap-response', async requestResponse => {
        // Find request in store by request.id
        const storeRequest = await db.requests.get(requestResponse.id)

        // Drop request response if not found in store
        if (!storeRequest) return

        if (storeRequest.type === 'single-ip') {
            const response = requestResponse as RequestResponseSingleIP

            const request: RequestSingleIP = {
                id: storeRequest.id,
                type: 'single-ip',
                status: response.status,
                createdAt: storeRequest.createdAt,
                completedAt: response.completedAt,
                requestPayload: storeRequest.requestPayload as { ip: string },
                data: response.data,
                error: response.data ? null : response.error,
            }

            await db.requests.put(request)
            await getRequests()
        }
    })

    return {
        requests,
        singleIPRequests,
        getRequests,
        createSingleIPRequest,
    }
})

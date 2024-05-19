export type RequestType = 'single-ip' | 'subnet'

export type RequestStatus = 'pending' | 'completed' | 'failed'

export type Request<T> = {
    id: string
    type: RequestType
    status: RequestStatus
    createdAt: number
    completedAt: number
    data: T
}

export type IncomingRequest = {
    id: string
    type: RequestType
    data: unknown
}

export type RequestCreate<T> = {
    id: string
    type: RequestType
    data: T
}

export type RequestResponse<T> =
    | {
          id: string
          completedAt: number
          status: RequestStatus
          data: T
      }
    | {
          id: string
          completedAt: number
          status: RequestStatus
          data: null
          error: unknown
      }

// Single IP Request
export type RequestCreateSingleIP = RequestCreate<{ ip: string }>
export type RequestResponseSingleIP = RequestResponse<{
    up: boolean
    result: {
        latency: number
        ports: {
            port: number
            state: string
            service: string
        }[]
    } | null
}>

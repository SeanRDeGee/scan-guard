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

export type RequestCreate<T> = {
    id: string
    type: RequestType
    data: T
}

export type RequestResponse<T> = {
    id: string
    completedAt: number
    status: RequestStatus
    data: T
}

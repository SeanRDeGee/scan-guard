export type JobType = 'single-host'
export type JobStatus = 'pending' | 'completed' | 'failed'

export interface Job<P, D> {
    id: string
    createdAt: number
    completedAt: number | null
    type: JobType
    status: JobStatus
    payload: P
    data: D | null
    error: unknown | null
}

export interface UnknownJob extends Job<unknown, unknown> {}

export interface SingleHostPortScanJobPayload {
    ip: string
}

export interface SingleHostPortScanJobData {
    reachable: boolean
    ports: { port: number; state: string; service: string }[]
}

export interface SingleHostPortScanJob extends Job<SingleHostPortScanJobPayload, SingleHostPortScanJobData> {
    type: 'single-host'
}

// Base shape for all API responses
export type APIResponse<T> = {
    status: number
    error: unknown | null
    data: T | null
}

// API response with no data
export type APIResponseNoData = APIResponse<null>

// Data interfaces (mirrored from the database module. TODO: move to a shared module)
// --------------------------------------------------------------------------------------
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

// API Path: /api/status
// -------------------------------------------------------------------------
export type ResponseStatus = APIResponse<{ version: string }>

// API Path: /api/nmap/version
// -------------------------------------------------------------------------
export type ResponseNmapVersion = APIResponse<string>

// API Path: /api/jobs
// -------------------------------------------------------------------------
export type ResponseGetJobs = APIResponse<UnknownJob[]>
export type ResponseCreateJob = APIResponse<{ jobID: string }>

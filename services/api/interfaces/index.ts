// Base shape for all API responses
export type APIResponse<T> = {
    status: number
    error: unknown | null
    data: T | null
}

// API response with no data
export type APIResponseNoData = APIResponse<null>

// API Path: /api/status
// -------------------------------------------------------------------------
export type ResponseStatus = APIResponse<{ version: string }>

// API Path: /api/nmap/version
// -------------------------------------------------------------------------
export type ResponseNmapVersion = APIResponse<string>

// API Path: /api/jobs
// -------------------------------------------------------------------------
export type ResponseCreateJob = APIResponse<{ jobID: string }>

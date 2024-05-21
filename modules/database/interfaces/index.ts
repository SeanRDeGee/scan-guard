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
}

export interface UnknownJob extends Job<unknown, unknown> {}

export interface SingleHostPortScanJob
    extends Job<{ ip: string }, { reachable: boolean; ports: { port: number; state: string; service: string }[] }> {
    type: 'single-host'
}

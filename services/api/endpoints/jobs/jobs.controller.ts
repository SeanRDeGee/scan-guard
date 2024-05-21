import { v4 as uuid } from 'uuid'

import jobs from '@scan-guard/database/jobs'
import nmap from '@scan-guard/nmap'

import { io } from '@/server'

import type { Request, Response } from 'express'
import type { APIResponseNoData, ResponseCreateJob } from '@/interfaces'
import type { SingleHostPortScanJob, SingleHostPortScanJobPayload } from '@scan-guard/database/interfaces'

export const jobs_post = async function (req: Request, res: Response) {
    try {
        const { type, payload } = req.body

        if (!type || !payload) {
            const response: APIResponseNoData = {
                status: 400,
                error: 'Missing required fields',
                data: null,
            }

            res.json(response)
            return
        }

        if (type === 'single-host') {
            // Check if the payload is valid
            if (typeof payload.ip !== 'string') {
                const response: APIResponseNoData = {
                    status: 400,
                    error: 'Invalid payload',
                    data: null,
                }

                res.json(response)
                return
            }

            const jobID = uuid()
            const jobPayload: SingleHostPortScanJobPayload = payload
            const jobCreatedAt = Date.now()

            // Create the job
            const job: SingleHostPortScanJob = {
                id: jobID,
                createdAt: jobCreatedAt,
                completedAt: null,
                type: 'single-host',
                status: 'pending',
                payload: jobPayload,
                data: null,
                error: null,
            }

            // Save the job to the database
            await jobs.createSingleHostPortScanJob(job)

            // Run the job asynchronously
            nmap.scanSingleIP(jobPayload.ip)
                .then(async data => {
                    const updatedJob: SingleHostPortScanJob = {
                        ...job,
                        completedAt: Date.now(),
                        status: 'completed',
                        data: data,
                    }

                    // Update the job in the database
                    await jobs.updateSingleHostPortScanJob(updatedJob)

                    // Emit an event to notify the client
                    io.sockets.emit('job-completed', { jobID })
                })
                .catch(async error => {
                    const updatedJob: SingleHostPortScanJob = {
                        ...job,
                        completedAt: Date.now(),
                        status: 'failed',
                        data: null,
                        error: error,
                    }

                    // Update the job in the database
                    await jobs.updateSingleHostPortScanJob(updatedJob)

                    // Emit an event to notify the client
                    io.sockets.emit('job-completed', { jobID })
                })

            // Return the job ID
            const response: ResponseCreateJob = {
                status: 200,
                error: null,
                data: { jobID },
            }

            res.json(response)
        }
    } catch (error) {
        const response: APIResponseNoData = {
            status: 500,
            error: `Failed to create job: ${error}`,
            data: null,
        }

        res.json(response)
    }
}

import type { SingleHostPortScanJob, UnknownJob } from '@/interfaces'

import { client, database } from '@/connection'

const jobsCollection = 'jobs'

// ==== General Jobs =====================================================================================
const getAllJobs = async function (): Promise<UnknownJob[]> {
    try {
        await client.connect()

        const collection = client.db(database).collection(jobsCollection)

        return await collection.find<UnknownJob>({}).toArray()
    } catch (error) {
        throw new Error(`Database Error - Failed to get jobs: ${error}`)
    }
}

const deleteJob = async function (id: string): Promise<void> {
    try {
        await client.connect()

        const collection = client.db(database).collection(jobsCollection)

        await collection.deleteOne({ id })
    } catch (error) {
        throw new Error(`Database Error - Failed to delete job: ${error}`)
    }
}

// ==== Single Host Port Scan Jobs ======================================================================
const createSingleHostPortScanJob = async function (job: SingleHostPortScanJob): Promise<void> {
    try {
        await client.connect()

        const collection = client.db(database).collection(jobsCollection)

        await collection.insertOne(job)
    } catch (error) {
        throw new Error(`Database Error - Failed to create single host port scan job: ${error}`)
    }
}

const updateSingleHostPortScanJob = async function (job: SingleHostPortScanJob): Promise<void> {
    try {
        await client.connect()

        const collection = client.db(database).collection(jobsCollection)

        await collection.updateOne({ id: job.id }, { $set: job })
    } catch (error) {
        throw new Error(`Database Error - Failed to update single host port scan job: ${error}`)
    }
}

const getSingleHostPortScanJobs = async function (): Promise<SingleHostPortScanJob[]> {
    try {
        await client.connect()

        const collection = client.db(database).collection(jobsCollection)

        return await collection.find<SingleHostPortScanJob>({ type: 'single-host' }).toArray()
    } catch (error) {
        throw new Error(`Database Error - Failed to get single host port scan jobs: ${error}`)
    }
}

const getSingeHostPortScanJob = async function (id: string): Promise<SingleHostPortScanJob | null> {
    try {
        await client.connect()

        const collection = client.db(database).collection(jobsCollection)

        return await collection.findOne<SingleHostPortScanJob>({ id })
    } catch (error) {
        throw new Error(`Database Error - Failed to get single host port scan job by id: ${error}`)
    }
}

export default {
    getAllJobs,
    deleteJob,
    createSingleHostPortScanJob,
    updateSingleHostPortScanJob,
    getSingleHostPortScanJobs,
    getSingeHostPortScanJob,
}

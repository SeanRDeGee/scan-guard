import { defineStore } from 'pinia'

import type { ResponseGetJobs, UnknownJob } from '@scan-guard/api/interfaces'

export const useJobStore = defineStore('jobs', () => {
    const scanGuardJobSocket = useScanGuardJobSocket()
    const scanGuardAPI = useScanGuardAPI()

    const jobs = ref<UnknownJob[]>([])

    const fetchJobs = async function () {
        try {
            const response = await scanGuardAPI.get<ResponseGetJobs>('/jobs')

            if (response.data.status === 200 && response.data.data) {
                jobs.value = response.data.data
                return
            }
        } catch (error) {}
    }

    scanGuardJobSocket.on('job-completed', ({ jobID: string }) => {
        fetchJobs()
    })

    return {
        jobs,
        fetchJobs,
    }
})

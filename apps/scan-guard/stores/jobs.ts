import { defineStore } from 'pinia'

export const useJobStore = defineStore('jobs', () => {
    const jobSocket = useScanGuardJobSocket()
})

import { defineStore } from 'pinia'

export const useRequestStore = defineStore('requests', () => {
    const requestSocket = useScanGuardRequestSocket()
})

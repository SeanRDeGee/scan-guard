import { defineStore } from 'pinia'

export const useRequestsStore = defineStore('requests', () => {
    const socket = useSocket()
})

import { defineStore } from 'pinia'

export const useRequestsStore = defineStore('requests', () => {
    const socket = useSocket()

    const isNmapInstalled = ref<boolean | null>(null)

    socket.on('nmap-check', (isInstalled: boolean) => {
        isNmapInstalled.value = isInstalled
    })

    const makeIsNmapInstalledRequest = async () => {
        socket.emit('nmap-check')
    }

    return {
        isNmapInstalled,
        makeIsNmapInstalledRequest,
    }
})

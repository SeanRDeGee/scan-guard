import { io } from 'socket.io-client'

export default function useScanGuardJobSocket() {
    const runtimeConfig = useRuntimeConfig()

    const socket = io(runtimeConfig.public.API_SERVER, {
        withCredentials: true,
    })

    return socket
}

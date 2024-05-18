import { io } from 'socket.io-client'

export default function useSocket() {
    // TODO: Make the connection URL configurable via environment variables
    const socket = io('http://localhost:5000', {
        withCredentials: true,
    })

    return socket
}

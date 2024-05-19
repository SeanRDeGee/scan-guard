import axios from 'axios'

export default function useScanGuardAPI() {
    const runtimeConfig = useRuntimeConfig()

    const scanGuardAPI = axios.create({
        baseURL: runtimeConfig.public.API_ENDPOINT,
        withCredentials: true,
    })

    return scanGuardAPI
}

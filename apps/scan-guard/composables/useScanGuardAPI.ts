import axios from 'axios'

export default function () {
    const runtimeConfig = useRuntimeConfig()

    const scanGuardAPI = axios.create({
        baseURL: runtimeConfig.public.API_ENDPOINT,
        withCredentials: true,
    })

    return scanGuardAPI
}

import execute from './util/execute'

const isInstalled = async function (): Promise<boolean> {
    try {
        await execute('nmap --version')
        return true
    } catch {
        return false
    }
}

export default {
    isInstalled,
}

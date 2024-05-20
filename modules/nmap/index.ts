import execute from './util/execute'

// Return the version of Nmap installed on the system
const version = async function (): Promise<string> {
    try {
        const consoleOutput = await execute('nmap --version')

        // Extract version number from console output
        const match = consoleOutput.match(/Nmap version (\d+\.\d+)/)

        if (match) {
            return match[1]
        } else {
            throw new Error('Version number not found')
        }
    } catch (error) {
        throw new Error(`Failed to get Nmap version: ${error}`)
    }
}

const scanSingleIP = async function (ip: string): Promise<string> {
    try {
        return await execute(`nmap ${ip}`)
    } catch (error) {
        throw new Error(`Failed to scan IP: ${error}`)
    }
}

export default {
    version,
    scanSingleIP,
}

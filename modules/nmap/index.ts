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

const scanSingleIP = async function (ip: string) {
    try {
        const consoleOutput = await execute(`nmap ${ip}`)

        // Is host reachable?
        const up = consoleOutput.includes('Host is up')

        // Return if host is not reachable
        if (!up) {
            return {
                reachable: false,
                ports: [],
            }
        }

        // Extract ports
        const portMatches = consoleOutput.matchAll(/(\d+)\/(tcp|udp)\s+(\w+)\s+(\w+)/g)

        const ports = []
        for (const match of portMatches) {
            const port = parseInt(match[1])
            const state = match[3]
            const service = match[4]
            ports.push({ port, state, service })
        }

        return {
            reachable: true,
            ports,
        }
    } catch (error) {
        throw new Error(`Failed to scan IP: ${error}`)
    }
}

export default {
    version,
    scanSingleIP,
}

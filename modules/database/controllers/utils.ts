import { client, database } from '@/connection'

const testDatabaseConnection = async function (): Promise<{ success: boolean; error: unknown | null }> {
    try {
        await client.connect()

        await client.db(database).command({ ping: 1 })

        return { success: true, error: null }
    } catch (error) {
        return { success: false, error: error }
    } finally {
        await client.close()
    }
}

export default testDatabaseConnection

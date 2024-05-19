import dexie from 'dexie'

type GenericRequest = {
    id: string
    type: string
    status: string
    createdAt: number
    completedAt: number | null
    requestPayload: unknown | null
    data: unknown | null
    error: unknown | null
}

export default function useLocalDatabase() {
    class Database extends dexie {
        requests!: dexie.Table<GenericRequest>

        constructor() {
            super('scan-guard')

            this.version(1).stores({
                requests: 'id',
            })
        }
    }

    const db = new Database()

    return {
        db,
    }
}

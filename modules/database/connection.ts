import { MongoClient } from 'mongodb'

const host = process.env.MONGODB_HOST
const username = process.env.MONGODB_USERNAME
const password = process.env.MONGODB_PASSWORD
const connectionTimeout = Number(process.env.MONGODB_TIMEOUT) || 5000

const connectionString = `mongodb://${username}:${password}@${host}:27017`

export const database = process.env.MONGODB_DB || ''

export const client = new MongoClient(connectionString, {
    connectTimeoutMS: connectionTimeout,
    serverSelectionTimeoutMS: connectionTimeout,
})

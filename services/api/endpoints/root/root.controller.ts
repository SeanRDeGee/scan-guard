import { version } from '@/package.json'

import type { Request, Response } from 'express'
import type { ResponseStatus, APIResponseNoData } from '@interfaces/index'

export const status = async function (_req: Request, res: Response) {
    try {
        const response: ResponseStatus = {
            status: 200,
            error: null,
            data: {
                version: version,
            },
        }

        res.json(response)
    } catch (error) {
        const response: APIResponseNoData = {
            status: 500,
            error: error,
            data: null,
        }

        res.json(response)
    }
}

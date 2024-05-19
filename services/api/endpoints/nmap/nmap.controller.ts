import nmap from '@scan-guard/nmap-service'

import type { Request, Response } from 'express'
import type { APIResponseNoData, ResponseNmapVersion } from '@interfaces/index'

export const version = async function (_req: Request, res: Response) {
    try {
        const data = await nmap.version()

        const response: ResponseNmapVersion = {
            status: 200,
            error: null,
            data: data,
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

/*import { l10n } from '../../l10n/l10n.js';*/
import { ClientClientService } from '../../services/client/client/client.client.service.js'
import { ErrorResponse, OriginHttpError } from '../error-response/error-response.js'

/**
 * 
 * @param {import('express').Response} res 
 * @param {OriginResponse} originResponse 
 */
const handleSuccess = (res, originResponse) => {
    res.status(200)
        .set({'Content-Type': 'application/json'})
        .set({'ETag': originResponse.headers.etag})
        .end(JSON.stringify(originResponse.body))
}

/**
 * 
 * @param {import('express').Response} res 
 * @param {OriginResponse} originResponse 
 */
const handleError = (res, originResponse) => {
    const err = new ErrorResponse(originResponse.statusCode, originResponse.body)
    return err.send(res)
}

/**
 * 
 * @param {import('express').Response} res 
 * @param {OriginResponse} originResponse 
 */
const handleNotChanged = (res, originResponse) => {
    res.status(304)
        .set({'ETag': originResponse.headers.etag})
        .end()
}

/**
 * 
 * @param {import('express').Response} res 
 * @param {OriginResponse} originResponse 
 */
const handleOriginResponse = (res, originResponse) => {
    switch (originResponse.statusCode) {
    case 200 :
        return handleSuccess(res, originResponse)
    case 304 :
        return handleNotChanged(res, originResponse)
    default :
        return handleError(res, originResponse)
    }
}

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
export const get = async (req, res) => {
    try {
        const originResponse = await ClientClientService.get(req) 
        return handleOriginResponse(res, originResponse)
    } catch (err) {
        res.locals.originError = err
        return OriginHttpError(res)
    }
}

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
export const getByID = async (req, res) => {
    try {
        const originResponse = await ClientClientService.getByID(req) 
        return handleOriginResponse(res, originResponse)
    } catch (err) {
        res.locals.originError = err
        return OriginHttpError(res)
    }
}

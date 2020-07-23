import { ClientClientService } from '../../services/client/client/client.client.service.js'
import { ClientPolicyService } from '../../services/client/policy/client.policy.service.js'
import { OriginHttpError, genericOriginErrorResponse, unauthorizedErrorResponse, ErrorResponse } from '../error-response/error-response.js'
import { l10n } from '../../l10n/l10n.js'

/**
 * @param {import('express').Response} res
 * @param {OriginClientsResponse} originResponse 
 */
const handleNotFound = (res, originResponse) => {
    res.set({'ETag': originResponse.headers.etag})
    const errorResponse = new ErrorResponse(404, l10n.client.not_found)
    return errorResponse.send(res)
}

/**
 * @param {import('express').Response} res 
 * @param {OriginClientsResponse} originResponse 
 */
const handleSuccess = (res, originResponse) => {
    res.status(200)
        .set({'Content-Type': 'application/json'})
        .set({'ETag': originResponse.headers.etag})
        .end(JSON.stringify(originResponse.body))
}

/**
 * @param {import('express').Response} res 
 * @param {OriginClientsResponse} originResponse 
 */
const handleOriginSuccess = (res, originResponse) => {
    return originResponse.body.length === 0 
        ? handleNotFound(res, originResponse)
        : handleSuccess(res, originResponse)

}
/**
 * @param {import('express').Response} res 
 * @param {OriginResponse} originResponse 
 */
const handleNotChanged = (res, originResponse) => {
    res.status(304)
        .set({'ETag': originResponse.headers.etag})
        .end()
}

/**
 * @param {import('express').Response} res 
 * @param {OriginResponse} originResponse 
 */
const handleOriginResponse = (res, originResponse) => {
    switch (originResponse.statusCode) {
    case 200 :
        return handleOriginSuccess(res, originResponse)
    case 304 :
        return handleNotChanged(res, originResponse)
    case 401 :
        return unauthorizedErrorResponse(res, originResponse)
    default :
        return genericOriginErrorResponse(res, originResponse)
    }
}

/**
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

/**
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
export const getPoliciesByID  = async (req, res) => {
    try {
        const originResponse = await ClientPolicyService.getByClientId(req)
        return handleOriginResponse(res, originResponse)
    } catch (err) {
        res.locals.originError = err
        return OriginHttpError(res)
    }
}
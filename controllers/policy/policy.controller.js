import { ClientPolicyService } from '../../services/client/policy/client.policy.service.js'
import { OriginHttpError, genericOriginErrorResponse, unauthorizedErrorResponse, ErrorResponse } from '../error-response/error-response.js'
import { l10n } from '../../l10n/l10n.js'

/**
 * @param {import('express').Response} res 
 * @param {OriginPoliciesResponse} originResponse 
 */
const handleNotFound = (res, originResponse) => {
    console.log(originResponse.headers)
    res.set({'ETag': originResponse.headers.etag})
    const errorResponse = new ErrorResponse(404, l10n.policy.not_found)
    return errorResponse.send(res)
}

/**
 * @param {import('express').Response} res 
 * @param {OriginPoliciesResponse} originResponse 
 */
const handleSuccess = (res, originResponse) => {
    res.status(200)
        .set({'Content-Type': 'application/json'})
        .set({'ETag': originResponse.headers.etag})
        .end(JSON.stringify(originResponse.body))
}

/**
 * @param {import('express').Response} res 
 * @param {OriginPoliciesResponse} originResponse 
 */
const handleOriginSuccess = (res, originResponse) => {
    return originResponse.body.length === 0 
        ? handleNotFound(res, originResponse)
        : handleSuccess(res, originResponse)
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
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
export const get = async (req, res) => {
    try {
        const originResponse = await ClientPolicyService.get(req) 
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
        const originResponse = await ClientPolicyService.getById(req) 
        return handleOriginResponse(res, originResponse)
    } catch (err) {
        res.locals.originError = err
        return OriginHttpError(res)
    }
}



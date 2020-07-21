import { ClientPolicyService } from '../../services/client/policy/client.policy.service.js'
import { OriginHttpError, genericOriginErrorResponse, unauthorizedErrorResponse } from '../error-response/error-response.js'

/**
 * 
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



import { ClientPolicyService } from '../../services/client/policy/client.policy.service.js'
import { ErrorResponse, OriginHttpError } from '../error-response/error-response.js'

const handleSuccess = (res, originResponse) => {
    res.status(200)
        .set({'Content-Type': 'application/json'})
        .set({'ETag': originResponse.headers.etag})
        .end(JSON.stringify(originResponse.body))
}

const handleError = (res, originResponse) => {
    const err = new ErrorResponse(originResponse.statusCode, originResponse.message)
    return err.send(res)
}

const handleNotChanged = (res, originResponse) => {
    res.status(304)
        .set({'ETag': originResponse.headers.etag})
        .end()
}

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

export const get = async (req, res) => {
    try {
        const originResponse = await ClientPolicyService.get(req) 
        return handleOriginResponse(res, originResponse)
    } catch (err) {
        res.locals.originError = err
        return OriginHttpError(res)
    }
}

export const getByID = async (req, res) => {
    try {
        const originResponse = await ClientPolicyService.getById(req) 
        return handleOriginResponse(res, originResponse)
    } catch (err) {
        res.locals.originError = err
        return OriginHttpError(res)
    }
}



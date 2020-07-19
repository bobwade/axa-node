import { ClientPolicyService } from '../../services/client/policy/client.policy.service.js'
import { OriginHttpError } from '../../services/client/index.js'

const handleOriginResponse = (req, res, originResponse) => {
    res.status(200)
        .end(JSON.stringify(originResponse))
}

export const get = async (req, res, next) => {
    try {
        const originResponse = await ClientPolicyService.get(req) 
        return handleOriginResponse(req, res, originResponse)
    } catch (err) {
        res.locals.originError = err;
        return OriginHttpError(req, res)
    }
}

export const getByID = async (req, res, next) => {
    
}



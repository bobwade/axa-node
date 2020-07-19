import { l10n } from '../../l10n.js';
import { ClientLoginService } from '../../services/client/login/client.login.service.js';

import { OriginHttpError } from '../../services/client/index.js'

const isABadPostRequest = body => {
    return Object.keys(body).length === 2
        && body.hasOwnProperty('username')
        && body.hasOwnProperty('password')
        && typeof body.username === 'string'
        && typeof body.password === 'string'
    ? false
    : true
}

const respondToBadRequest = (req, res) => {
    res.status(400)
        .set({'Content-Type': 'application/json'})
        .end(JSON.stringify({
            "code": 0,
            "message": l10n.login.badRequest
        }))
}
const respondToUnauthorisedRequest = (req, res) => {
    res.status(502)
        .set({'Content-Type': 'application/json'})
        .end(JSON.stringify({
            "code": 0,
            "message": l10n.login.unauthorised
        }))
}

const handleOriginResponse = (req, res, originResponse) => {
    if (originResponse.statusCode !== 200) return respondToUnauthorisedRequest(req, res)
    const body = JSON.parse(originResponse.body)
    res.status(200)
        .set({'Content-Type': 'application/json'})
        .end(JSON.stringify({
            "token": body.token,
            "type": body.type,
            "expires": 0
        }))
}

const post = async (req, res) => {
    if(isABadPostRequest(req.body)) return respondToBadRequest(req, res)
    try {
        const originResponse = await ClientLoginService.login(req.body) 
        return handleOriginResponse(req, res, originResponse)
    } catch (err) {
        res.locals.originError = err;
        return OriginHttpError(req, res)
    }
}

export { post, respondToBadRequest, isABadPostRequest }
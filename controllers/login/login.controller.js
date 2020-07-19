import { l10n } from '../../l10n/l10n.js';
import { ClientLoginService } from '../../services/client/login/client.login.service.js';
import { ErrorResponse, OriginHttpError } from '../error-response/error-response.js'

const isABadPostRequest = body => {
    return Object.keys(body).length === 2
        && body.hasOwnProperty('username')
        && body.hasOwnProperty('password')
        && typeof body.username === 'string'
        && typeof body.password === 'string'
    ? false
    : true
}

const respondToBadRequest = (res) => {
    const errorResponse = new ErrorResponse(400, l10n.login.badRequest)
    return errorResponse.send(res)
}
const respondToUnauthorisedRequest = (res) => {
    const errorResponse = new ErrorResponse(502, l10n.login.unauthorised)
    return errorResponse.send(res)
}

const handleOriginResponse = (res, originResponse) => {
    if (originResponse.statusCode !== 200) return respondToUnauthorisedRequest(res)
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
    if(isABadPostRequest(req.body)) return respondToBadRequest(res)
    try {
        const originResponse = await ClientLoginService.login(req.body)
        console.log(originResponse)
        return handleOriginResponse(res, originResponse)
    } catch (err) {
        res.locals.originError = err;
        return OriginHttpError(res)
    }
}

export { post, respondToBadRequest, isABadPostRequest }
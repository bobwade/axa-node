import { l10n } from '../../l10n/l10n.js'
import { ClientLoginService } from '../../services/client/login/client.login.service.js'
import { ErrorResponse, OriginHttpError } from '../error-response/error-response.js'

/**
 * @param {import('express').Response} res 
 */
const respondToUnauthorisedRequest = (res) => {
    const errorResponse = new ErrorResponse(401, l10n.login.unauthorised)
    return errorResponse.send(res)
}

/**
 * @param {import('express').Response} res 
 * @param {OriginLoginSuccessResponse} originResponse 
 */
const handleOriginResponse = (res, originResponse) => {
    if (originResponse.statusCode !== 200) return respondToUnauthorisedRequest(res)
    /**@type LoginSuccess */
    const response ={
        'token': originResponse.body.token,
        'type': originResponse.body.type,
        'expires': 0
    }
    res.status(200)
        .set({'Content-Type': 'application/json'})
        .end(JSON.stringify(response))
}

/**
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
const post = async (req, res) => {
    try {
        const originResponse = await ClientLoginService.login(req.body)
        return handleOriginResponse(res, originResponse)
    } catch (err) {
        res.locals.originError = err
        return OriginHttpError(res)
    }
}

export { post }
import { l10n } from '../l10n/l10n.js'
import { ErrorResponse } from '../controllers/error-response/error-response.js'

/**
 * @param {ClientLogin} body
 * @returns {boolean} 
 */
const isABadPostRequest = body => {
    return Object.keys(body).length === 2
        && Object.prototype.hasOwnProperty.call(body, 'username')
        && Object.prototype.hasOwnProperty.call(body, 'password')
        && typeof body.username === 'string'
        && typeof body.password === 'string'
        ? false
        : true
}

/**
 * @param {import('express').Response} res 
 */
const respondToBadRequest = (res) => {
    const errorResponse = new ErrorResponse(400, l10n.login.badRequest)
    return errorResponse.send(res)
}

/**
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {import('express').NextFunction} next 
 */
const loginDataGuard = (req, res, next) => {
    if(isABadPostRequest(req.body)) return respondToBadRequest(res)
    next()
}

export { loginDataGuard, respondToBadRequest, isABadPostRequest }
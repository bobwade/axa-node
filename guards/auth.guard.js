import { l10n } from '../l10n/l10n.js'
import { ErrorResponse } from '../controllers/error-response/error-response.js'

/**
 * 
 * @param {import('http').IncomingHttpHeaders} headers
 * @returns {boolean}
 */
export const hasNoAuthorisationHeader = (headers) => {
    return Object.prototype.hasOwnProperty.call(headers, 'authorization')
        && typeof headers['authorization'] === 'string'
        ? false
        : true
}

/**
 * 
 * @param {import('http').IncomingHttpHeaders} headers
 * @returns {boolean}
 */
export const hasMalformedAuthorisationHeader = (headers) => {
    return !/^Bearer .+/.test(headers.authorization)
}

/**
 * 
 * @param {import('express').Response} res 
 */
const handleNoAuthorisationHeader = (res) => {
    const errorResponse = new ErrorResponse(401, l10n.noAuthorisationHeader)
    errorResponse.send(res)
}

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {import('express').NextFunction} next 
 */
export const authorise = (req, res, next) => {
    if(hasNoAuthorisationHeader(req.headers)
    || hasMalformedAuthorisationHeader(req.headers)) return handleNoAuthorisationHeader(res)
    next()
}

import { l10n } from '../l10n/l10n.js'
import { ErrorResponse } from '../controllers/error-response/error-response.js'

export const hasNoAuthorisationHeader = (headers) => {
    return headers.hasOwnProperty('authorization')
        && typeof headers['authorization'] === 'string'
        ? false
        : true
}
export const hasMalformedAuthorisationHeader = (headers) => {
    return !/^Bearer .+/.test(headers.authorization)
}

const handleNoAuthorisationHeader = (res) => {
    const errorResponse = new ErrorResponse(401, l10n.noAuthorisationHeader)
    errorResponse.send(res)
}

export const authorise = (req, res, next) => {
    if(hasNoAuthorisationHeader(req.headers)
    || hasMalformedAuthorisationHeader(req.headers)) return handleNoAuthorisationHeader(res)
    next()
}

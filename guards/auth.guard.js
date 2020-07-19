import { l10n } from '../l10n.js'
const hasAuthorisationHeader = (headers) => {
    return headers.hasOwnProperty('authorization')
        && typeof headers['authorization'] === 'string'
        ? true
        : false
}
const handleNoAuthorisationHeader = (req, res) => {
    res.status(401)
        .set({'Content-Type': 'application/json'})
        .end(JSON.stringify({
            "code": 0,
            "message": l10n.noAuthorisationHeader
        }))
}
export const authorise = (req, res, next) => {
    if(!hasAuthorisationHeader(req.headers)) return handleNoAuthorisationHeader(req, res)
    next()
}
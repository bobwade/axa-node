import { ErrorResponse } from '../error-response/error-response.js'
import { l10n } from '../../l10n/l10n.js'

export const notFound = (req, res) => {
    const message = l10n.error.not_found(req.method, req.path)
    const errorResponse = new ErrorResponse(404, message)
    return errorResponse.send(res)
}

import { l10n } from '../../l10n/l10n.js'

export class ErrorResponse {
    constructor(code, message) {
        this.setCode(code)
        this.setMessage(message)
        this.resBody = JSON.stringify({
            code: this.code,
            message: this.message
        })
    }
    setCode(code) {
        this.code = typeof code === 'number'
        && code.toString().length === 3
        && (code.toString()[0] === '4' || code.toString()[0] === '5')
            ? code
            : 500
    }
    setMessage(message) {
        this. message = typeof message === 'string' ? message : l10n.error.fallbackErrorMessage
    }
    send(res) {
        return res.status(this.code)
            .set({'Content-Type': 'application/json'})
            .end(this.resBody)
    }
}

export const OriginHttpError = (res) => {
    const errorResponse = new ErrorResponse(502, `${l10n.error.upstreamError}${res.locals.originError ? '\n' + res.locals.originError: ''}`)
    return errorResponse.send(res)
}

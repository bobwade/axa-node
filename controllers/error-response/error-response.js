import { l10n } from '../../l10n/l10n.js'

export class ErrorResponse {
    /**
     * @param {number} code 
     * @param {string} message
     */
    constructor(code, message) {
        this.setCode(code)
        this.setMessage(message)
        this.resBody = JSON.stringify({
            code: this.code,
            message: this.message
        })
    }

    /**
     * @param {number} code 
     */
    setCode(code) {
        this.code = typeof code === 'number'
        && code.toString().length === 3
        && (code.toString()[0] === '4' || code.toString()[0] === '5')
            ? code
            : 500
    }

    /**
     * @param {string} message 
     */
    setMessage(message) {
        this.message = typeof message === 'string' ? message : l10n.error.fallbackErrorMessage
    }

    /**
     * @param {import('express').Response} res
     */
    send(res) {
        return res.status(this.code)
            .set({'Content-Type': 'application/json'})
            .end(this.resBody)
    }
}

/**
 * 
 * @param {import('express').Response} res
 */
export const OriginHttpError = (res) => {
    const errorResponse = new ErrorResponse(502, `${l10n.error.upstreamError}${res.locals.originError ? '\n' + res.locals.originError: ''}`)
    return errorResponse.send(res)
}


/**
 * 
 * @param {import('express').Response} res
 * @param {OriginErrorResponse} originResponse 
 */
export const genericOriginErrorResponse = (res, originResponse) => {
    /**@type {OriginError} */
    const originBody = originResponse.body
    const errorResponse = new ErrorResponse(originBody.statusCode, originBody.message)
    return errorResponse.send(res)
}

/**
 * 
 * @param {import('express').Response} res 
 * @param {OriginErrorResponse} originResponse 
 */
export const unauthorizedErrorResponse = (res, originResponse) => {
    /**@type {OriginError} */
    const originBody = originResponse.body
    const authExpired = /expired/.test(originBody.message)
    const err = new ErrorResponse(originResponse.statusCode, authExpired ? l10n.error.authExpired : l10n.error.invalidAuthHeader)
    res.set('WWW-Authenticate',`Bearer error="${authExpired ? 'invalid_token' : 'invalid_request'}", error_description="${authExpired ? l10n.error.authExpired : l10n.error.invalidAuthHeader}"`)
    return err.send(res)
}

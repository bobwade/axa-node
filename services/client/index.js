import { l10n } from '../../l10n.js';

/**
 * @param { Request } req
 * @param { Response } res
 */
export const OriginHttpError = (req, res) => {
    res.status(502)
        .set({'Content-Type': 'application/json'})
        .send({
            code: 0,
            message: `${l10n.upstreamError}${res.locals.originError ? '\n' + res.locals.originError: ''}`
        })
}

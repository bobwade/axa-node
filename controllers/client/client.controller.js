/*import { l10n } from '../../l10n.js';
import { ClientClientService } from '../../services/client/client/client.client.service.js';
import { OriginHttpError } from '../../services/client/index.js'



const get = async (req, res) => {
    try {
        const originResponse = await ClientClientService.get(req) 
        return handleOriginResponse(req, res, originResponse)
    } catch (err) {
        res.locals.originError = err;
        return OriginHttpError(req, res)
    }
}

export { get }*/
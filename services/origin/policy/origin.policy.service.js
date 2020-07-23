import { Request } from '../request/request.service.js'
import { makeRequestOptions } from '../index.js'

export class OriginPolicyService {
    static endpoint = 'policies';
    /**
         * @param {import('http').IncomingHttpHeaders} headers
     * @returns {Promise<OriginResponse>}
     */
    static get(headers) {
        const request = new Request(makeRequestOptions('GET', this.endpoint, headers))
        return request.send()
    }
}

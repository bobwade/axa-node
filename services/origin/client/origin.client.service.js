import { Request } from '../request/request.service.js'
import { makeRequestOptions } from '../index.js'

export class OriginClientService {
    static endpoint = 'clients';
    static get(headers) {
        const request = new Request(makeRequestOptions('GET', this.endpoint, headers))
        return request.send()
    }
}
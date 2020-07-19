import { Request } from '../request/request.service.js'
import { makeRequestOptions } from '../index.js'

export class OriginLoginService {
    static endpoint = 'login';
    static post(id, secret) {
        const request = new Request(makeRequestOptions('POST', this.endpoint, {'content-type': 'application/json'}))
        return request.send({
            client_id: id,
            client_secret: secret
        })
    }
}

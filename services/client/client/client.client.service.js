import { OriginClientService } from '../../origin/client/origin.client.service.js'
import { ClientPolicyService } from '../../client/policy/client.policy.service.js'

import { isJsonResponse, isParsableJson, paginate } from '../utils.js'
import { l10n } from '../../../l10n/l10n.js'

export class ClientClientService {
    static async get(req) {
        try {
            const originResponse = await this.getAll(req)
            if(isJsonResponse(originResponse) && isParsableJson(originResponse)) originResponse.body = paginate(JSON.parse(originResponse.body), req.query)
            return originResponse
        } catch (err) {
            return err
        }
    }
    static clientWithId(clientsResponse, id) {
        console.log(clientsResponse.body)
        return (!isJsonResponse(clientsResponse)
        || !isParsableJson(clientsResponse)
        || !(JSON.parse(clientsResponse.body).some(client => client.id === id)))
            ? false
            : JSON.parse(clientsResponse.body).filter(client => client.id === id)[0]
    }
    static async getByID(req) {
        try {
            const id = req.params.id
            const originResponse = await this.getAll(req)
            const client = this.clientWithId(originResponse, id)
            if (!client) return ({statusCode: 404, body: l10n.client.with_id_not_found(id), headers:{}})
            originResponse.body = client
            const originPolicyResponse = await ClientPolicyService.getById(req)
            console.log(originPolicyResponse)
            originResponse.body.policies = originPolicyResponse.body
            return originResponse
        } catch (err) {
            console.log(err)
            return err
        }
    }
    static async getAll(req) {
        try {
            const headers = { authorization: req.headers.authorization }
            if(req.headers['if-none-match']) headers['if-none-match'] = req.headers['if-none-match']
            const originResponse = await OriginClientService.get(headers)
            return originResponse
        } catch (err) {
            console.log(err)
            return err
        }
    }
}


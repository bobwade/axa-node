import { OriginPolicyService } from '../../origin/policy/origin.policy.service.js'
import { isJsonResponse } from '../utils.js'
export class ClientPolicyService {
    static paginate(policies, query) {
        if (!policies.length || typeof policies !== 'object') return policies
        let limit = (query.limit && typeof parseInt(query.limit) === 'number') ? parseInt(query.limit) : 10;
        let startIndex = (typeof parseInt(query.start) === 'number' && parseInt(query.start) < policies.length) ? parseInt(query.start) : 0;
        return policies.slice(startIndex, startIndex + limit)
    }

    static filterById(policies, id) {
        if (!policies.length || typeof policies !== 'object') return policies
        return policies.filter(policy => policy.id === id)
    }

    static async get(req) {
        try {
            const originResponse = await this.getAll(req)
            console.log(originResponse.body)
            if(isJsonResponse(originResponse)) originResponse.body = this.paginate(JSON.parse(originResponse.body), req.query)
            return originResponse
        } catch (err) {
            return err;
        }
    }
    static async getById(req) {
        try {
            const id = req.params.id;
            const originResponse = await this.getAll(req)
            if(isJsonResponse(originResponse)) originResponse.body = this.filterById(JSON.parse(originResponse.body), req.params.id)
            return originResponse
        } catch (err) {
            console.log(err)
            return err;
        }
    }
    static async getAll(req) {
        try {
            const headers = { authorization: req.headers.authorization }
            if(req.headers['if-none-match']) headers['if-none-match'] = req.headers['if-none-match']
            const originResponse = await OriginPolicyService.get(headers)
            return originResponse
        } catch (err) {
            console.log(err)
            return err;
        }
    }
}

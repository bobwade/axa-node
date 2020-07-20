import { OriginPolicyService } from '../../origin/policy/origin.policy.service.js'
import { isJsonResponse, isParsableJson, paginate } from '../utils.js'

export class ClientPolicyService {
    /**
     * 
     * @param {Policy[]} policies 
     * @param {string} id
     * @returns {Policy[]}
     */
    static filterById(policies, id) {
        console.log(policies, id)
        if (!policies.length || typeof policies !== 'object') return policies
        return policies.filter(policy => policy.id === id)
    }

    /**
     * 
     * @param {import('express').Request} req
     * @returns {Promise<OriginResponse>}
     */
    static async get(req) {
        try {
            const originResponse = await this.getAll(req)
            if(isJsonResponse(originResponse) && isParsableJson(originResponse)) originResponse.body = paginate(JSON.parse(originResponse.body), req.query)
            return originResponse
        } catch (err) {
            return err
        }
    }

    /**
     * 
     * @param {import('express').Request} req
     * @returns {Promise<OriginResponse>}
     */
    static async getById(req) {
        try {
            const originResponse = await this.getAll(req)
            if(isJsonResponse(originResponse) && isParsableJson(originResponse)) originResponse.body = this.filterById(JSON.parse(originResponse.body), req.params.id)
            return originResponse
        } catch (err) {
            console.log(err)
            return err
        }
    }
    
    /**
     * 
     * @param {import('express').Request} req
     * @returns {Promise<OriginResponse>}
     */
    static async getAll(req) {
        try {
            const headers = { authorization: req.headers.authorization }
            if(req.headers['if-none-match']) headers['if-none-match'] = req.headers['if-none-match']
            const originResponse = await OriginPolicyService.get(headers)
            return originResponse
        } catch (err) {
            console.log(err)
            return err
        }
    }
}

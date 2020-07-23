import { OriginPolicyService } from '../../origin/policy/origin.policy.service.js'
import { isArray, paginate } from '../utils.js'

/**
 * @param {Policy[]} policies 
 * @param {string} clientId
 * @returns {Policy[]}
 */
const filterByClientId= (policies, clientId) => {
    if (!policies.length || typeof policies !== 'object') return policies
    return policies.filter(policy => policy.clientId === clientId)
}

/**
 * @param {Policy[]} policies 
 * @param {string} id
 * @returns {Policy[]}
 */
const filterByPolicyId= (policies, id) => {
    if (!policies.length || typeof policies !== 'object') return policies
    return policies.filter(policy => policy.id === id)
}

export class ClientPolicyService {
    /**
         * @param {import('express').Request} req
     * @returns {Promise<OriginPoliciesResponse|OriginResponse>}
     */
    static async get(req) {
        try {
            const originResponse = await this.getAll(req)
            if(isArray(originResponse.body)) originResponse.body = paginate(originResponse.body, req.query)
            return originResponse
        } catch (err) {
            return err
        }
    }

    /**
         * @param {import('express').Request} req
     * @returns {Promise<OriginPoliciesResponse|OriginResponse>}
     */
    static async getByClientId(req) {
        try {
            const originResponse = await this.getAll(req)
            if(isArray(originResponse.body)) originResponse.body = filterByClientId(originResponse.body, req.params.id)
            return originResponse
        } catch (err) {
            return err
        }
    }
    /**
         * @param {import('express').Request} req
     * @returns {Promise<OriginPoliciesResponse|OriginResponse>}
     */
    static async getById(req) {
        try {
            const originResponse = await this.getAll(req)
            if(isArray(originResponse.body)) originResponse.body = filterByPolicyId(originResponse.body, req.params.id)
            return originResponse
        } catch (err) {
            return err
        }
    }
    
    /**
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
            return err
        }
    }
}

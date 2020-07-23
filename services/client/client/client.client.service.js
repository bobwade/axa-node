import { OriginClientService } from '../../origin/client/origin.client.service.js'
import { ClientPolicyService } from '../../client/policy/client.policy.service.js'

import { isArray, paginate } from '../utils.js'

/**
 * @param {Client} client
 * @param {Policy[]} policies
 * @returns {Client}
 */
const assignPoliciesToClient = (client, policies) => Object.assign(client, {policies: policies.filter(policy => policy.clientId = client.id)})

/**
 * @param {Client[]} clients
 * @param {Policy[]} policies
 */
const assignPoliciesToClients = (clients, policies) => clients.map(client => assignPoliciesToClient(client, policies))

/**
 * @param {Client[]} clients
 * @param {string} name
 */
const filterClientsByName = (clients, name) => {
    const match = new RegExp(name, 'g')
    return clients.filter(client => match.test(client.name))
}

/**
 * @param {Client[]} clients
 * @param {string} id
 */
const filterClientsById = (clients, id) => clients.filter(client => client.id === id)

export class ClientClientService {
    /**
     * @param {import('express').Request} req
     * @returns {Promise<OriginClientsResponse|OriginResponse>}
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
     * @returns {Promise<OriginClientsResponse|OriginResponse>}
     */
    static async getAllWithPolicies(req) {
        try {
            const headers = { authorization: req.headers.authorization }
            if(req.headers['if-none-match']) headers['if-none-match'] = req.headers['if-none-match']
            const clientResponse = await OriginClientService.get(headers)
            if(clientResponse.statusCode !== 200) return clientResponse
            /**@type {OriginPoliciesResponse} */
            const policyResponse = await ClientPolicyService.getByClientId(req)
            if(policyResponse.statusCode !== 200) return clientResponse
            Object.assign(clientResponse, {body: assignPoliciesToClients(clientResponse.body, policyResponse.body)})
            return Object.assign(clientResponse, {body: assignPoliciesToClients(clientResponse.body, policyResponse.body)})
        } catch (err) {
            return err
        }
    }
    
    /**
         * @param {import('express').Request} req
     * @returns {Promise<OriginClientsResponse|OriginResponse>}
     */
    static async getAll(req) {
        try {
            /** @type {OriginClientsResponse} */
            const originResponse = await this.getAllWithPolicies(req)
            if(req.query.name && typeof req.query.name === 'string') originResponse.body = filterClientsByName(originResponse.body, req.query.name)
            return Object.assign(originResponse, {body: paginate(originResponse.body, req.query)})
        } catch (err) {
            return err
        }
    }
    /**
         * @param {import('express').Request} req
     * @returns {Promise<OriginClientsResponse|OriginResponse>}
     */
    static async getByID(req) {
        try {
            /** @type {OriginClientsResponse} */
            const originResponse = await this.getAllWithPolicies(req)      
            return Object.assign(originResponse,{body: filterClientsById(originResponse.body, req.params.id)})
        } catch (err) {
            return err
        }
    }
}


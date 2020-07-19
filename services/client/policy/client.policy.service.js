import { OriginPolicyService } from '../../origin/policy/origin.policy.service.js'
export class ClientPolicyService {
    paginate(policies, query) {
        let limit = query.limit || 10,
            startIndex = query.start || 0;
        return policies.slice(startIndex, startIndex + limit)    
    }
    static async get(req) {
        
        try {
            const originResponse = await OriginPolicyService.get({authorization: req.headers.authorization})
            console.log(req.query.limit)
            
            originResponse.body = JSON.parse(originResponse.body)
            return originResponse
        } catch (err) {
            console.log(err)
            return err;
        }
    }
}

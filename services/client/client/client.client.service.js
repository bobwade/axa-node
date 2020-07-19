import { OriginClientService } from '../../origin/client/origin.client.service.js';

export class ClientClientService {
    static async get(req) {
        try {
            const originResponse = await this.getAll(req)
            if(originResponse.headers['content-length'] !== '0') originResponse.body = this.paginate(JSON.parse(originResponse.body), req.query)
            return originResponse
        } catch (err) {
            return err;
        }
    }
    static async getById(req) {
        try {
            //const id = req.params.id;
            const originResponse = await this.getAll(req)
            //if(originResponse.headers['content-length'] !== '0') originResponse.body = this.filterById(JSON.parse(originResponse.body), req.params.id)
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
            const originResponse = await OriginClientService.get(headers)
            return originResponse
        } catch (err) {
            console.log(err)
            return err;
        }
    }
}


import { OriginClientService } from './origin.client.service.js';
import assert from 'assert';

describe("Client Origin Request Service: GET tests", () => {
    it("should respond with: 401 code when sent without auth header", () => {
            return OriginClientService.get()
                .then(response => assert.strictEqual(response.statusCode, 401))
    })
})
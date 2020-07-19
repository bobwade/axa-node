import { PolicyRequestService } from './policy.service.js';
import assert from 'assert';

describe("Policy Request Service: GET tests", () => {
    it("should respond with: 401 code when sent without auth header", () => {
            return PolicyRequestService.get()
                .then(response => assert.strictEqual(response.statusCode, 401))
            
    })
})


import { OriginLoginService } from './origin.login.service.js';
import assert from 'assert';

describe("Login Origin Request Service: POST tests", () => {
    it("should respond with: 200 code when sent with test credentials", () => {
        return OriginLoginService.post('axa', 's3cr3t')
            .then(response => assert.strictEqual(response.statusCode, 200))
    })
})

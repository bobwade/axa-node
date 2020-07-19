import { ErrorResponse } from './error-response.js';

import assert from 'assert';

describe('Error Response class tests',() => {
    it('should have a response body with correct fields', () => {
        const testErr = new ErrorResponse(418, "I'm a teapot")
        assert.strictEqual(JSON.stringify({
            code: 418,
            message: "I'm a teapot"
        }), testErr.resBody)
    })
    it('should provide a fallback 500 object when missing arugments', () => {
        const testErr = new ErrorResponse();
        assert.strictEqual(500, testErr.code)
        assert.strictEqual(typeof testErr.message, 'string')
    })
})

import { isJsonResponse } from './utils.js'
import assert from 'assert';

describe('Client Service utilities tests', () => {
    it('JSON check should validate when required JSON headers present', () => {
        const headers = {
            'content-type': 'application/json'
        }
        assert.strictEqual(isJsonResponse({ headers }), true)
    })
})
import { hasNoAuthorisationHeader, hasMalformedAuthorisationHeader } from './auth.guard.js'
import assert from 'assert'

describe('Authorisation guard tests', () => {
    it('should detect if no Authorisation header is present', () => {
        const headers = {
            'content-type' : 'application/json',
            host : 'www.google.com'
        }
        assert.strictEqual(hasNoAuthorisationHeader(headers), true)
    })
    it('should detect if Authorisation header is malformed', () => {
        const headers = {
            'content-type' : 'application/json',
            host : 'www.google.com',
            authorization: 'Potato'
        }
        assert.strictEqual(hasMalformedAuthorisationHeader(headers), true)
    })
    it('should allow request to origin if auth header is present and well formed', () => {
        const headers = {
            'content-type' : 'application/json',
            host : 'www.google.com',
            authorization: 'Bearer n0tar3alt0k3nbutatl3astisw3llf0rmatt3dandpres3nt'
        }
        assert.strictEqual(hasMalformedAuthorisationHeader(headers), false)
        assert.strictEqual(hasNoAuthorisationHeader(headers), false)
    })
})

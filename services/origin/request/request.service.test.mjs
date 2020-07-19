import { Request } from './request.service.js';
import assert from 'assert';

describe("Request util: GET tests", () => {
    it("should respond with: numeric status, string body & headers", () => {
            const request = new Request({
                method: 'GET',
                path: '/',
                host: 'www.google.com'
            })
            return request.send()
                .then(response => {
                    assert.ok(typeof response.statusCode === 'number')
                    assert.ok(typeof response.body === 'string')
                    assert.ok(response.headers)
                })
    })
})


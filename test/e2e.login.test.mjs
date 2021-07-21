import { Server } from '../server.js'
import assert from 'assert'
import { request } from './es6_supertest.js'

const server = new Server(3003)
server.start('e2e: AXA test server started')

describe('E2E: POST /api/v1/login', () => {
    it('should return 401 response with fake data', () => {
        return request(server.getServer())
            .post('/api/v1/login')
            .send({"username": "bogey", "password": "password"})
            .then(response => {
                assert.strictEqual(response.statusCode, 401)
                assert.strictEqual(typeof response.body.message, 'string')
                assert.strictEqual(typeof response.body.code, 'number')
            })
    })
    it('should return 400 response with bad data', () => {
        return request(server.getServer())
            .post('/api/v1/login')
            .send({"user_name": "bogey", "pass_word": "password"})
            .then(response => {
                assert.strictEqual(response.statusCode, 400)
                assert.strictEqual(typeof response.body.message, 'string')
                assert.strictEqual(typeof response.body.code, 'number')
            })
    })
    it('should return 200 response with autorised request', () => {
        return request(server.getServer())
            .post('/api/v1/login')
            .send({"username": process.env.TEST_USER, "password": process.env.TEST_PASS})
            .set('Accept', /application\/json/)
            .then(response => {
                assert.strictEqual(response.statusCode, 200)
                assert.strictEqual(typeof response.body.token, 'string')
                assert.strictEqual(typeof response.body.type, 'string')
                assert.strictEqual(typeof response.body.expires, 'number')
            })
    })
    it('should return correct fields with types on success', () => {
        return request(server.getServer())
            .post('/api/v1/login')
            .send({"username": process.env.TEST_USER, "password": process.env.TEST_PASS})
            .set('Accept', /application\/json/)
            .then(response => {
                assert.strictEqual(typeof response.body.token, 'string')
                assert.strictEqual(typeof response.body.type, 'string')
                assert.strictEqual(typeof response.body.expires, 'number')
            })
    })
})

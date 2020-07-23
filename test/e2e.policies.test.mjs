import { Server } from '../server.js'
import assert from 'assert'
import { request } from './es6_supertest.js'

const app = new Server(3002)
app.start('')
const server = request(app.getServer())
const login = server.post('/login')
                .send({"username": process.env.TEST_USER, "password": process.env.TEST_PASS})
                .set('Accept', /application\/json/)

describe('E2E: GET /policies', () => {
    it('should return 401 error without auth header', () => {
        return server.get('/policies')
            .then(response => {
                assert.strictEqual(response.statusCode, 401)
            })
    })
    it('401 response should include code and message of correct type', () => {
        return server.get('/policies')
            .then(response => {
                assert.strictEqual(typeof response.body.code, 'number')
                assert.strictEqual(typeof response.body.message, 'string')
            })
    })
    it('should return 200 response with autorised request', () => {
        return login.then(loginResponse => {
                server.get('/policies')
                .set('Authorization', `Bearer ${loginResponse.body.token}`)
                .then(response => {
                assert.strictEqual(response.statusCode, 200)
            })
        })
    })
    it('should have Etag header on success', () => {
        return login.then(loginResponse => {
                server.get('/policies')
                .set('Authorization', `Bearer ${loginResponse.body.token}`)
                .then(response => {
                assert.strictEqual(typeof response.headers.etag, 'string')
            })
        })
    })
    it('should return correct fields and types for successful request', () => {
        return login.then(loginResponse => {
                server.get('/policies')
                .set('Authorization', `Bearer ${loginResponse.body.token}`)
                .then(response => {
                    const policy = response.body[0]
                    assert.strictEqual(typeof policy.id, 'string')
                    assert.strictEqual(typeof policy.amountInsured, 'string')
                    assert.strictEqual(typeof policy.email, 'string')
                    assert.strictEqual(typeof policy.inceptionDate, 'string')
                    assert.strictEqual(typeof policy.installmentPayment, 'boolean')
                    assert.strictEqual(typeof policy.clientId, 'string')
            })
        })
    })
    it('should return 10 policies without limit query', () => {
        return login.then(loginResponse => {
                server.get('/policies')
                .set('Authorization', `Bearer ${loginResponse.body.token}`)
                .then(response => {
                assert.strictEqual(response.body.length, 10)
            })
        })
    })
    it('should return correct number of policies with limit query', () => {
        return login.then(loginResponse => {
                server.get('/policies?limit=5')
                .set('Authorization', `Bearer ${loginResponse.body.token}`)
                .then(response => {
                assert.strictEqual(response.body.length, 5)
            })
        })
    })
    it('should return a 304 with valid If-None-Match header', () => {
        return login.then(loginResponse => {
            server.get('/policies')
            .set('Authorization', `Bearer ${loginResponse.body.token}`)
            .then(outerResponse => {
                server.get('/policies')
                    .set('Authorization', `Bearer ${loginResponse.body.token}`)
                    .set('If-None-Match', outerResponse.headers.etag)
                    .then(response => {
                        assert.strictEqual(response.statusCode, 304)
                    })
            })
        })
    })
})

describe('E2E: GET /policies/:id', () => {
    it('should return 401 error without auth header', () => {
        return server.get('/policies/dummy')
            .then(response => {
                assert.strictEqual(response.statusCode, 401)
            })
    })
    it('401 response should include code and message of correct type', () => {
        return server.get('/policies/dummy')
            .then(response => {
                assert.strictEqual(typeof response.body.code, 'number')
                assert.strictEqual(typeof response.body.message, 'string')
            })
    })
    it('should return 200 reponse with auth header', () => {
        return login.then(loginResponse => {
                server.get('/policies')
                .set('Authorization', `Bearer ${loginResponse.body.token}`)
                .then(originalResponse => {
                    server.get(`/policies/${originalResponse.body[0].id}`)
                    .set('Authorization', `Bearer ${loginResponse.body.token}`)
                    .then(response => {
                        assert.strictEqual(response.statusCode, 200)
                    })
                })
        })
    })
    it('should have correct fields with success', () => {
        return login.then(loginResponse => {
            server.get('/policies')
            .set('Authorization', `Bearer ${loginResponse.body.token}`)
            .then(originalResponse => {
                server.get(`/policies/${originalResponse.body[0].id}`)
                .set('Authorization', `Bearer ${loginResponse.body.token}`)
                .then(response => {
                    const policy = response.body[0]
                    assert.strictEqual(typeof policy.id, 'string')
                    assert.strictEqual(typeof policy.amountInsured, 'string')
                    assert.strictEqual(typeof policy.email, 'string')
                    assert.strictEqual(typeof policy.inceptionDate, 'string')
                    assert.strictEqual(typeof policy.installmentPayment, 'boolean')
                    assert.strictEqual(typeof policy.clientId, 'string')
                })
            })
        })
    })
    it('should have Etag header on success', () => {
        return login.then(loginResponse => {
            server.get('/policies')
            .set('Authorization', `Bearer ${loginResponse.body.token}`)
            .then(originalResponse => {
                server.get(`/policies/${originalResponse.body[0].id}`)
                .set('Authorization', `Bearer ${loginResponse.body.token}`)
                .then(response => {
                    assert.strictEqual(typeof response.headers.etag, 'string')
                })
            })
        })
    })
    it('should return 404 response if id not found', () => {
        return login.then(loginResponse => {
            server.get('/policies')
            .set('Authorization', `Bearer ${loginResponse.body.token}`)
            .then(originalResponse => {
                server.get(`/policies/dummy`)
                .set('Authorization', `Bearer ${loginResponse.body.token}`)
                .then(response => {
                    assert.strictEqual(response.statusCode, 404)
                })
            })
        })
    })
    it('should return correct error fields if not found', () => {
        return login.then(loginResponse => {
            server.get('/policies')
            .set('Authorization', `Bearer ${loginResponse.body.token}`)
            .then(originalResponse => {
                server.get(`/policies/dummy`)
                .set('Authorization', `Bearer ${loginResponse.body.token}`)
                .then(response => {
                    assert.strictEqual(typeof response.body.code, 'number')
                    assert.strictEqual(typeof response.body.message, 'string')
                })
            })
        })
    })
    it('should have Etag header on not found', () => {
        return login.then(loginResponse => {
            server.get('/policies')
            .set('Authorization', `Bearer ${loginResponse.body.token}`)
            .then(originalResponse => {
                server.get(`/policies/dummy`)
                .set('Authorization', `Bearer ${loginResponse.body.token}`)
                .then(response => {
                    assert.strictEqual(typeof response.headers.etag, 'string')
                })
            })
        })
    })
})
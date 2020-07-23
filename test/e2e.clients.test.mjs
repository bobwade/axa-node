import { Server } from '../server.js'
import assert from 'assert'
import { request } from './es6_supertest.js'

const app = new Server(3001)
app.start('')
const server = request(app.getServer())
const login = server.post('/login')
                .send({"username": process.env.TEST_USER, "password": process.env.TEST_PASS})
                .set('Accept', /application\/json/)

describe('E2E: GET /clients', () => {
    it('should return 401 error without auth header', () => {
        return server.get('/clients')
            .then(response => {
                assert.strictEqual(response.statusCode, 401)
            })
    })
    it('401 response should include code and message of correct type', () => {
        return server.get('/clients')
            .then(response => {
                assert.strictEqual(typeof response.body.code, 'number')
                assert.strictEqual(typeof response.body.message, 'string')
            })
    })
    it('should return 200 response with autorised request', () => {
        return login.then(loginResponse => {
                server.get('/clients')
                .set('Authorization', `Bearer ${loginResponse.body.token}`)
                .then(response => {
                assert.strictEqual(response.statusCode, 200)
            })
        })
    })
    it('should return correct fields on success', () => {
        return login.then(loginResponse => {
                server.get('/clients')
                .set('Authorization', `Bearer ${loginResponse.body.token}`)
                .then(response => {
                    const client = response.body[0]
                    assert.strictEqual(typeof client.id, 'string')
                    assert.strictEqual(typeof client.name, 'string')
                    assert.strictEqual(typeof client.email, 'string')
                    assert.strictEqual(typeof client.role, 'string')
                    assert.strictEqual(typeof client.policies, 'object')
            })
        })
    })
    it('should return policies as field, with correct subfields', () => {
        return login.then(loginResponse => {
                server.get('/clients')
                .set('Authorization', `Bearer ${loginResponse.body.token}`)
                .then(response => {
                    const policies = response.body.filter(c => c.role === 'admin')[0].policies
                    assert.strictEqual(typeof policies, 'object')
                    assert.strictEqual(typeof policies[0].id, 'string')
                    assert.strictEqual(typeof policies[0].amountInsured, 'string')
                    assert.strictEqual(typeof policies[0].inceptionDate, 'string')
                    assert.strictEqual(Object.keys(policies[0]).length, 3)

            })
        })
    })
    it('should return a 304 with valid If-None-Match header', () => {
        return login.then(loginResponse => {
            server.get('/clients')
            .set('Authorization', `Bearer ${loginResponse.body.token}`)
            .then(outerResponse => {
                server.get('/clients')
                    .set('Authorization', `Bearer ${loginResponse.body.token}`)
                    .set('If-None-Match', outerResponse.headers.etag)
                    .then(response => {
                        assert.strictEqual(response.statusCode, 304)
                    })
            })
        })
    })
    it('should return 10 clients without limit query', () => {
        return login.then(loginResponse => {
                server.get('/clients')
                .set('Authorization', `Bearer ${loginResponse.body.token}`)
                .then(response => {
                assert.strictEqual(response.body.length, 10)
            })
        })
    })
    it('should return correct number of clients with limit query', () => {
        return login.then(loginResponse => {
                server.get('/clients?limit=5')
                .set('Authorization', `Bearer ${loginResponse.body.token}`)
                .then(response => {
                assert.strictEqual(response.body.length, 5)
            })
        })
    })
    it('should return 404 response with bogus name query', () => {
        return login.then(loginResponse => {
                server.get('/clients?name=ERGAERGAERG')
                .set('Authorization', `Bearer ${loginResponse.body.token}`)
                .then(response => {
                    assert.strictEqual(response.statusCode, 404)
            })
        })
    })
    it('should return 200 response with real name query', () => {
        return login.then(loginResponse => {
                server.get('/clients')
                .set('Authorization', `Bearer ${loginResponse.body.token}`)
                .then(firstResponse => {
                    server.get(`/clients?name=${firstResponse.body[0].name}`)
                    .set('Authorization', `Bearer ${loginResponse.body.token}`)
                    .then(response => {
                        assert.strictEqual(response.statusCode, 200)
                    })
            })
        })
    })
})

describe('E2E: GET /clients/:id', () => {
    it('should return 401 error without auth header', () => {
        return server.get('/clients/dummy')
            .then(response => {
                assert.strictEqual(response.statusCode, 401)
            })
    })
    it('should return correct error object without auth header', () => {
        return login.then(loginResponse => {
            server.get('/clients/dummy')
            .then(response => {
                assert.strictEqual(typeof response.body.code, 'number')
                assert.strictEqual(typeof response.body.message, 'string')
            })
        })
    })
    it('should return 200 reponse with auth header', () => {
        return login.then(loginResponse => {
                server.get('/clients')
                .set('Authorization', `Bearer ${loginResponse.body.token}`)
                .then(originalResponse => {
                    server.get(`/clients/${originalResponse.body[0].id}`)
                    .set('Authorization', `Bearer ${loginResponse.body.token}`)
                    .then(response => {
                        assert.strictEqual(response.statusCode, 200)
                    })
                })
        })
    })
    it('should return 404 reponse with dummy client id', () => {
        return login.then(loginResponse => {
            server.get('/clients/dummy')
            .set('Authorization', `Bearer ${loginResponse.body.token}`)
            .then(response => {
                assert.strictEqual(response.statusCode, 404)
            })
        })
    })
    it('should return correct error object with dummy client id', () => {
        return login.then(loginResponse => {
            server.get('/clients/dummy')
            .set('Authorization', `Bearer ${loginResponse.body.token}`)
            .then(response => {
                assert.strictEqual(typeof response.body.code, 'number')
                assert.strictEqual(typeof response.body.message, 'string')
            })
        })
    })
    it('should return clients with correct fields on success', () => {
        return login.then(loginResponse => {
                server.get('/clients')
                .set('Authorization', `Bearer ${loginResponse.body.token}`)
                .then(originalResponse => {
                    server.get(`/clients/${originalResponse.body[0].id}`)
                    .set('Authorization', `Bearer ${loginResponse.body.token}`)
                    .then(response => {
                        const client = response.body[0]
                        assert.strictEqual(typeof client.id, 'string')
                        assert.strictEqual(typeof client.name, 'string')
                        assert.strictEqual(typeof client.email, 'string')
                        assert.strictEqual(typeof client.role, 'string')
                        assert.strictEqual(typeof client.policies, 'object')
                    })
                })
        })
    })
})

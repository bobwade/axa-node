import { ClientClientService } from './client.client.service.js'
import assert from 'assert'

describe('Client Client Service testing', () => {
    it('Should return false if no client with ID found', () => {
        assert.strictEqual(ClientClientService.clientWithId(mockResponse, 'fakeID'), false)
    })
})

import { isABadPostRequest } from './login.data.guard.js';
import assert from 'assert';


describe('Login data guard tests',() => {
    it('post body fields should be strings', () => {
        assert.strictEqual(isABadPostRequest({username: 123, password: false}), true)
    })
    it('post body should only include correct fields', () => {
        assert.strictEqual(isABadPostRequest({username: 'terry', password: 'password', bogusfield: 'extraneous'}), true)
    })
    it('correctly formatted post body should pass checking function', () => {
        assert.strictEqual(isABadPostRequest({username: 'terry', password: 'password'}), false)
    })
})
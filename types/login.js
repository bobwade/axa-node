/**
 * @typedef ClientLogin
 * @property {string} username
 * @property {string} password
 */

/**
 * @typedef OriginLogin
 * @property {string} client_id
 * @property {string} client_secret
 */

/**
 * @typedef LoginSuccess
 * @property {string} token
 * @property {string} type
 * @property {number} [expires]
 */

/**
 * @typedef {Object} OriginLoginSuccessResponse
 * @property {number} statusCode
 * @property {LoginSuccess} body
 * @property {import('http').IncomingHttpHeaders} headers
*/

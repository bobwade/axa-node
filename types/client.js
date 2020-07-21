/**
 * @typedef Client
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {string} role
 * @property {Policy[]} [policies]
 */

/**
 * @typedef {Object} OriginClientsResponse
 * @property {number} statusCode
 * @property {Client[]} body
 * @property {import('http').IncomingHttpHeaders} headers
*/

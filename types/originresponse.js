/**
 * @typedef {Object} OriginResponse
 * @property {number} statusCode
 * @property {*} body
 * @property {import('http').IncomingHttpHeaders} headers
*/

/**
 * @typedef OriginHttpError
 * @property {string} message
*/

/**
 * @typedef OriginError
 * @property {string} message
 * @property {string} error
 * @property {number} statusCode
*/

/**
 * @typedef {Object} OriginErrorResponse
 * @property {number} statusCode
 * @property {OriginError} body
 * @property {import('http').IncomingHttpHeaders} headers
*/

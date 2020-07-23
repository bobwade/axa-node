/**
 * @typedef Policy
 * @property {string} id
 * @property {string} amountInsured
 * @property {string} email
 * @property {string} inceptionDate
 * @property {boolean} installmentPayment
 * @property {string} clientId
 */

/**
 * @typedef ClientPolicy
 * @property {string} id
 * @property {string} amountInsured
 * @property {string} inceptionDate
 */

/**
 * @typedef {Object} OriginPoliciesResponse
 * @property {number} statusCode
 * @property {Policy[]} body
 * @property {import('http').IncomingHttpHeaders} headers
*/

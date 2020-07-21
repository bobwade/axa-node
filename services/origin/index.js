/**
 * 
 * @param {'GET'|'POST'|'PUT'|'DELETE'} method 
 * @param {string} path 
 * @param {import('http').IncomingHttpHeaders} headers
 * @returns {import('http').RequestOptions}
 */
export const makeRequestOptions = (method, path, headers) => {
    const options = {
        method,
        host : 'dare-nodejs-assessment.herokuapp.com',
        path: `/api/${path}`
    }
    if (headers) options.headers = headers
    return options
}
/**
 * 
 * @param {string} body
 * @returns {Object|string} 
 */
export const parseBody = (body) => {
    try {
        const parseAttempt = JSON.parse(body)
        const type = Object.prototype.toString.call(parseAttempt)
        return type === '[object Object]' || type === '[object Array]'
            ? parseAttempt
            : body
    } catch (err) {
        return body
    }
}

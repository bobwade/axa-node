/**
 * 
 * @param {'GET'|'POST'|'PUT'|'DELETE'} method 
 * @param {string} path 
 * @param {import('http').IncomingHttpHeaders} headers
 * @returns {import('http').RequestOptions}
 */
const makeRequestOptions = (method, path, headers) => {
    const options = {
        method,
        host : 'dare-nodejs-assessment.herokuapp.com',
        path: `/api/${path}`
    }
    if (headers) options.headers = headers
    return options
}



export { makeRequestOptions }
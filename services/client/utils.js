export const paginate = (responseArray, query) => {
    let limit = (query.limit && typeof parseInt(query.limit) === 'number') ? parseInt(query.limit) : 10
    let startIndex = (typeof parseInt(query.start) === 'number' && parseInt(query.start) < responseArray.length) ? parseInt(query.start) : 0
    return responseArray.slice(startIndex, startIndex + limit)
}
/**
 * @param {*} testObject
 * @returns {boolean}
 */
export const isArray = (testObject) => {
    return Object.prototype.toString.call(testObject) === '[object Array]'
}

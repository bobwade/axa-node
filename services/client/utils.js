export const sliceArrayByLimitAndStart = (responseArray, query) => {
    if (!responseArray.length || typeof responseArray !== 'object') return responseArray
    let limit = (query.limit && typeof parseInt(query.limit) === 'number') ? parseInt(query.limit) : 10;
    let startIndex = (typeof parseInt(query.start) === 'number' && parseInt(query.start) < responseArray.length) ? parseInt(query.start) : 0;
    return responseArray.slice(startIndex, startIndex + limit)
}

export const isJsonResponse = (response) => {
    return response.headers['content-length'] !== '0' && /^application\/json/.test(response.headers['content-type'])
}

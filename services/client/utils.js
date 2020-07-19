export const paginate = (responseArray, query) => {
    if (!responseArray.length || typeof responseArray !== 'object') return responseArray
    let limit = (query.limit && typeof parseInt(query.limit) === 'number') ? parseInt(query.limit) : 10
    let startIndex = (typeof parseInt(query.start) === 'number' && parseInt(query.start) < responseArray.length) ? parseInt(query.start) : 0
    return responseArray.slice(startIndex, startIndex + limit)
}

export const isJsonResponse = (response) => {
    return /^application\/json/.test(response.headers['content-type'])
}
export const isParsableJson = (response) => {
    try {
        JSON.parse(response.body)
        return true
    } catch (err) {
        return false
    }
}

const makeRequestOptions = (method, path, headers) => {
    const options = {
        method,
        host : 'dare-nodejs-assessment.herokuapp.com',
        path: `/api/${path}`
    }
    if (headers) options.headers = headers;
    return options;
}



export { makeRequestOptions }
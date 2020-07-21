export const error = {
    upstreamError: 'Error connecting with upstream server',
    invalidAuthHeader: 'Missing or malformed Authorization header.',
    not_found : (method, path) => `'${method}' request to ${path} not supported on this server`,
    fallbackErrorMessage : 'Internal server error',
    authExpired: 'Authorization token expired'
}
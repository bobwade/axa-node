export const error = {
    upstreamError: `Error connecting with upstream server`,
    noAuthorisationHeader: `Request to this resource is protected and must have an Authorization header.`,
    not_found : (method, path) => `'${method}' request to ${path} not supported on this server`,
    fallbackErrorMessage : `Internal server error`
}
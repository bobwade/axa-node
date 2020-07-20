import { request } from 'https'

export class Request {
    /**
     * @param {import("http").RequestOptions} options
     */
    constructor(options) {
        this.options = options
        this.responseBody = ''
    }
    cacheResponseBody(chunk) {
        this.responseBody += chunk.toString()
    }
    
    /**
     * 
     * @param {*} [requestBody]
     * @returns {Promise<OriginResponse>}
     */
    send(requestBody) {
        return new Promise((resolve, reject) => {
            this.request = request(this.options, (incomingMessage) => {
                incomingMessage.on('data', chunk => this.cacheResponseBody(chunk))
                incomingMessage.on('close', () => resolve({
                    statusCode: incomingMessage.statusCode,
                    body: this.responseBody,
                    headers: incomingMessage.headers
                }))
            })
            this.request.on('error', err => reject({message: err}))
            this.options.method === 'POST' ? this.request.end(JSON.stringify(requestBody)) : this.request.end()
        })
    }
}

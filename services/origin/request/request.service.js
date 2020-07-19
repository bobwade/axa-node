import { request } from 'https';

export class Request {
    requestOptions = {};
    validCodes;
    constructor(options) {
        this.requestOptions.method = options.method;
        this.requestOptions.path = options.path;
        this.requestOptions.host = options.host;
        if (options.headers) this.requestOptions.headers = options.headers;
        this.options = options;
        this.responseBody = '';
    }
    cacheResponseBody(chunk) {
        this.responseBody += chunk.toString();
    }
    send(requestBody) {
        return new Promise((resolve, reject) => {
            this.request = request(this.requestOptions, (incomingMessage) => {
                incomingMessage.on('data', chunk => this.cacheResponseBody(chunk))
                incomingMessage.on('close', () => resolve({
                    statusCode: incomingMessage.statusCode,
                    body: this.responseBody,
                    headers: incomingMessage.headers
                }))
            })
            this.request.on('error', err => reject({message: err}))
            if (requestBody) console.log(requestBody)
            this.requestOptions.method === 'POST' ? this.request.end(JSON.stringify(requestBody)) : this.request.end()
        })
    }
}

import express from 'express'
import { AppRouter } from './routes/router.js'

export class Server {
    /**
     * @param {number} port 
     */
    constructor(port) {
        this.app = express()
        this.port = port
        this.addRoutes()
    }
    addRoutes() {
        this.app.use('/', AppRouter)
    }
    /**
     * @param {string} message
     */
    start(message) {
        this.server = this.app.listen(this.port, () => console.log(message))
    }
    getServer() {
        return this.server
    }
}

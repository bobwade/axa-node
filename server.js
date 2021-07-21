import express from 'express'
import { AppRouter } from './routes/router.js'

export class Server {
    /**
     * @param {number} port 
     */
    constructor(port) {
        this.app = express()
        this.port = port
        this.addCORS()
        this.addRoutes()
    }
    addCORS() {
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', 'https://dare-nodejs-assessment.herokuapp.com')
            res.header('Access-Control-Allow-Headers', 'Origin, Access-Control-Request-Method, Content-Type, Accept, Authorization')
            next()
        })
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

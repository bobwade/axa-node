import dotenv from 'dotenv'
import { Server } from './server.js'

const { config } = dotenv
config()

const port = parseInt((process.env.SERVER_PORT))
const server = new Server(port)
server.start(`AXA test app starting on port ${port}`)

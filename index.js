import express from 'express'
import { AppRouter } from './routes/router.js'

const port = 3000
const app = express()

app.use('/', AppRouter)
app.listen(port, () => console.log(`listening on ${port}`))
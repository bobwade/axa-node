import express from 'express'
import bodyParser from 'body-parser'
import { post } from '../controllers/login/login.controller.js'
import { loginDataGuard } from '../guards/login.data.guard.js'

const { Router } = express
const jsonParser = bodyParser.json()
const LoginRoutes = Router()

LoginRoutes.post('/', jsonParser, loginDataGuard, post)

export { LoginRoutes }
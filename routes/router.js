import express from 'express'

import { ClientRoutes } from './client.router.js'
import { LoginRoutes } from './login.router.js'
import { PolicyRoutes } from './policy.router.js'
import { notFound } from '../controllers/404/404.controller.js'

const { Router } = express
const AppRouter = Router()

AppRouter.use('/api/v1/login', LoginRoutes)
AppRouter.use('/api/v1/policies', PolicyRoutes)
AppRouter.use('/api/v1/clients', ClientRoutes)
AppRouter.use('*', notFound)

export { AppRouter }

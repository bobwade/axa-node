import express from 'express'
const { Router } = express

import { ClientRoutes } from './client.router.js'
import { LoginRoutes } from './login.router.js'
import { PolicyRoutes } from './policy.router.js'

import { notFound } from '../controllers/404/404.controller.js'
const AppRouter = Router()

AppRouter.use('/login', LoginRoutes)
AppRouter.use('/policies', PolicyRoutes)
AppRouter.use('/clients', ClientRoutes)
AppRouter.use('*', notFound)

export { AppRouter }

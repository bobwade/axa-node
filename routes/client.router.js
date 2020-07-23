import express from 'express'
import { authorise } from '../guards/auth.guard.js'
import { get, getByID, getPoliciesByID } from '../controllers/client/client.controller.js'

const { Router } = express

const ClientRoutes = Router()

ClientRoutes.get('/', authorise, get)
ClientRoutes.get('/:id', authorise, getByID)
ClientRoutes.get('/:id/policies', authorise, getPoliciesByID)

export { ClientRoutes }

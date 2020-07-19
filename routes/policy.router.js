import express from 'express'
import { authorise } from '../guards/auth.guard.js'
import { get, getByID } from '../controllers/policy/policy.controller.js'
const { Router } = express

const PolicyRoutes = Router()

PolicyRoutes.get('/', authorise, get )
PolicyRoutes.get('/:id', authorise, getByID)

export { PolicyRoutes }

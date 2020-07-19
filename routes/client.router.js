import express from 'express'
//import { get } from '../controllers/client/client.controller.js'

const { Router } = express;

const ClientRoutes = Router();

ClientRoutes.get('/', /*clients*/)
ClientRoutes.get('/:id', /*client with id details*/)
ClientRoutes.get('/:id/policies', /*policies of client with id*/)

export { ClientRoutes }

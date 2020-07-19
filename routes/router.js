import express from 'express'
const { Router } = express;

import { ClientRoutes } from './client.router.js';
import { LoginRoutes } from './login.router.js';
import { PolicyRoutes } from './policy.router.js';

const AppRouter = Router();

AppRouter.use('/login', LoginRoutes)
AppRouter.use('/policies', PolicyRoutes)
AppRouter.use('/clients', ClientRoutes)

export { AppRouter }

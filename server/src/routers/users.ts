import express from 'express'
import * as usersController from '../controllers/users_controller'
import * as middlewares from '../middlewares'

const router = express.Router()

router.post('/register', middlewares.isNotLogged, usersController.Register)

router.post('/login', middlewares.isNotLogged, usersController.Login)

router.get(
  '/refresh',
  middlewares.isLoggedRefreshToken,
  usersController.Refresh
)

router.get('/test', middlewares.isLoggedAccessToken, usersController.Test)

// router.post('/logout', middlewares.isLogged, usersController.Logout)

export default router

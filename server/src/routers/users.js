import express from "express"
import * as usersController from "../controllers/users_controller.js"
import * as middlewares from "../middlewares.js"


const router = express.Router()

router.post('/register', middlewares.isNotLogged, await usersController.Register)

router.post('/login', middlewares.isNotLogged, await usersController.Login)

router.post('/logout', middlewares.isLogged, usersController.Logout)




export default router
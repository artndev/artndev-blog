import express from "express"
import * as usersController from "../controllers/users_controller.js"
import * as middlewares from "../middlewares.js"


const router = express.Router()

router.post('/register', middlewares.isNotLogged, await usersController.Register)

router.post('/login', middlewares.isNotLogged, await usersController.Login)

router.post('/logout', middlewares.isLogged, usersController.Logout)

router.get("/is_logged/state", middlewares.isLogged, (req, res) => {
    const user_data = JSON.parse(req.cookies.user_data)

    res.status(200).json({
        message: "You are authrorized",
        answer: {
            user_id: user_data.user_id,
            username: user_data.username
        }
    })
})

router.get("/is_admin/state", middlewares.isLogged, middlewares.isAdmin, (req, res) => {
    res.status(200).json({
        message: "You are admin",
        answer: true
    })
})




export default router
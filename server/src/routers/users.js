import express from "express"
import * as users from "../controllers/users.js"


const router = express.Router()

router.post('/register', await users.Register)

router.post('/login', await users.Login)

router.post('/logout', users.Logout)

export default router
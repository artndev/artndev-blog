import express from "express"
import * as likesController from "../controllers/likes_controller.js"
import * as middlewares from "../middlewares.js"


const router = express.Router()

router.post('/l/:article_id', middlewares.isLogged, await likesController.Like)

router.put('/l/:article_id', middlewares.isLogged, await likesController.Dislike) 

router.get('/l/:article_id', await likesController.CountLikes)

router.get('/state', middlewares.isLogged, await likesController.GetState) // ?article_id=


export default router
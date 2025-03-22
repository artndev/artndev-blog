import express from "express"
import * as likesController from "../controllers/likes_controller.js"
import * as middlewares from "../middlewares.js"


const router = express.Router()

router.post('/:article_id/like', middlewares.isLogged, await likesController.Like)

router.post('/:article_id/dislike', middlewares.isLogged, await likesController.Dislike) 

router.get('/:article_id', await likesController.CountLikes)

router.get('/:article_id/state', middlewares.isLogged, await likesController.GetState)


export default router
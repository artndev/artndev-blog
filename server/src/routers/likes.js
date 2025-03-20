import express from "express"
import * as likesController from "../controllers/likes_controller.js"
import * as middlewares from "../middlewares.js"


const router = express.Router()

router.post('/:id', middlewares.isLogged, await likesController.Like)

router.delete('/:id', middlewares.isLogged, await likesController.Dislike) 

router.get('/:id', await likesController.GetLikes)


export default router
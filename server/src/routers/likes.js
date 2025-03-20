import express from "express"
import * as likesController from "../controllers/likes_controller.js"


const router = express.Router()

router.post('/:id', await likesController.Like)

router.delete('/:id', await likesController.Dislike) 

router.get('/:id', await likesController.GetLikes)


export default router
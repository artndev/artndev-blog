import express from "express"
import * as likes from "../controllers/likes.js"


const router = express.Router()

router.post('/like', await likes.LikeArticle) // ?article_id="id of article"

router.post('/dislike', await likes.DislikeArticle) // ?article_id="id of article"

router.get('/likes', await likes.GetLikes)  // ?article_id="id of article"

export default router
import express from 'express'
import * as likesController from '../controllers/likes_controller'
import * as middlewares from '../middlewares'

const router = express.Router()

router.post(
  '/:article_id/like',
  middlewares.isLoggedAccessToken,
  likesController.Like
)

router.post(
  '/:article_id/dislike',
  middlewares.isLoggedAccessToken,
  likesController.Dislike
)

router.get('/:article_id', likesController.CountLikes)

router.get(
  '/:article_id/state',
  middlewares.isLoggedAccessToken,
  likesController.GetState
)

export default router

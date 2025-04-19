import express from 'express'
import * as articlesController from '../controllers/articles_controller'
import * as middlewares from '../middlewares'

const router = express.Router()

router.get('/', articlesController.GetAll)

router.get('/:article_id', articlesController.Get)

router.post(
  '/create',
  middlewares.isLoggedAccessToken,
  middlewares.isAdmin,
  articlesController.Create
)

router.put(
  '/:article_id/update',
  middlewares.isLoggedAccessToken,
  middlewares.isAdmin,
  articlesController.Update
)

router.delete(
  '/:article_id/delete',
  middlewares.isLoggedAccessToken,
  middlewares.isAdmin,
  articlesController.Delete
)

export default router

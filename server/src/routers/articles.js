import express from 'express'
import * as articlesController from '../controllers/articles_controller.js'
import * as middlewares from '../middlewares.js'

const router = express.Router()

router.get('/', articlesController.GetAll)

router.get('/:article_id', articlesController.Get)

router.post(
  '/create',
  middlewares.isLogged,
  middlewares.isAdmin,
  articlesController.Create
)

router.put(
  '/:article_id/update',
  middlewares.isLogged,
  middlewares.isAdmin,
  articlesController.Update
)

router.delete(
  '/:article_id/delete',
  middlewares.isLogged,
  middlewares.isAdmin,
  articlesController.Delete
)

export default router

import express from 'express'
import * as savesController from '../controllers/saves_controller.js'
import * as middlewares from '../middlewares.js'

const router = express.Router()

router.post(
  '/:article_id/save',
  middlewares.isLogged,
  await savesController.Save
)

router.post(
  '/:article_id/unsave',
  middlewares.isLogged,
  await savesController.Unsave
)

router.get('/', middlewares.isLogged, await savesController.GetSaves)

router.get(
  '/:article_id/state',
  middlewares.isLogged,
  await savesController.GetState
)

export default router

import express from 'express'
import * as savesController from '../controllers/saves_controller.js'
import * as middlewares from '../middlewares.js'

const router = express.Router()

router.post(
  '/:article_id/save',
  middlewares.isLoggedAccessToken,
  savesController.Save
)

router.post(
  '/:article_id/unsave',
  middlewares.isLoggedAccessToken,
  savesController.Unsave
)

router.get('/', middlewares.isLoggedAccessToken, savesController.GetSaves)

router.get(
  '/:article_id/state',
  middlewares.isLoggedAccessToken,
  savesController.GetState
)

export default router

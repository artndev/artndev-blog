import express from 'express'
import * as savesController from '../controllers/saves_controller.js'
import * as middlewares from '../middlewares.js'

const router = express.Router()

router.post('/:article_id/save', middlewares.isLogged, savesController.Save)

router.post('/:article_id/unsave', middlewares.isLogged, savesController.Unsave)

router.get('/', middlewares.isLogged, savesController.GetSaves)

router.get('/:article_id/state', middlewares.isLogged, savesController.GetState)

export default router

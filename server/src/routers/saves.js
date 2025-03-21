import express from "express"
import * as savesController from "../controllers/saves_controller.js"
import * as middlewares from "../middlewares.js"


const router = express.Router()

router.post('/s/:article_id', middlewares.isLogged, await savesController.Save)

router.put('/s/:article_id', middlewares.isLogged, await savesController.Unsave) 

router.get("/s", middlewares.isLogged, await savesController.GetSaves)

router.get("/state",  middlewares.isLogged, await savesController.GetState) // ?article_id


export default router
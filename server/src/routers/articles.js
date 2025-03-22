import express from "express"
import * as articlesController from "../controllers/articles_controller.js"
import * as middlewares from "../middlewares.js"


const router = express.Router()

router.get("/", await articlesController.GetAll)

router.get("/:article_id", await articlesController.Get)

router.post("/create", middlewares.isLogged, middlewares.isAdmin, await articlesController.Create)

router.put("/:article_id/update", middlewares.isLogged, middlewares.isAdmin, await articlesController.Update)

router.delete("/:article_id/delete", middlewares.isLogged, middlewares.isAdmin, await articlesController.Delete)


export default router
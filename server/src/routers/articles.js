import express from "express"
import * as articlesController from "../controllers/articles_controller.js"
import * as middlewares from "../middlewares.js"


const router = express.Router()

router.get("/", await articlesController.GetAll)

router.get("/:id", await articlesController.Get)

router.post("/", middlewares.isLogged, middlewares.isAdmin, await articlesController.Create)

router.put("/:id", middlewares.isLogged, middlewares.isAdmin, await articlesController.Update)

router.delete("/", middlewares.isLogged, middlewares.isAdmin, await articlesController.DeleteAll)

router.delete("/:id", middlewares.isLogged, middlewares.isAdmin, await articlesController.Delete)


export default router
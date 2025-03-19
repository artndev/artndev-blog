import express from "express"
import * as DBController from "../controllers/articles.js"


const router = express.Router()

router.get('/', async (_, res) => {
    const data = await DBController.GetAllArticles()

    if (data.ans)
    {
        res.status(200).json(data.msg)
        return
    }

    res.status(500).json(data.msg)
})

router.get('/:id', async (req, res) => {
    const data = await DBController.GetArticle(req.params.id)

    if (data.ans)
    {
        res.status(200).json(...data.msg)
        return
    }

    res.status(500).json(data.msg)
})

export default router
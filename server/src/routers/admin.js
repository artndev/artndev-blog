import express from "express"
import * as DBController from "../controllers/articles.js"


const router = express.Router()

router.post('/', async (req, res) => {
    const data = await DBController.CreateArticle(req.body.Title, req.body.Text)

    if (data.ans)
    {
        res.status(200).json(data.msg)
        return
    }

    res.status(500).json(data.msg)
})

router.patch('/:id', async (req, res) => {
    const data = await DBController.EditArticle(req.body.Title, req.body.Text, req.params.id)

    if (data.ans)
    {
        res.status(200).json(data.msg)
        return
    }

    res.status(500).json(data.msg)
})

router.delete('/', async (_, res) => {
    const data = await DBController.DeleteAllArticles()

    if (data.ans)
    {
        res.status(200).json(data.msg)
        return
    }

    res.status(500).json(data.msg)
})

router.delete('/:id', async (req, res) => {
    const data = await DBController.DeleteArticle(req.params.id)

    if (data.ans)
    {
        res.status(200).json(data.msg)
        return
    }

    res.status(500).json(data.msg)
})

export default router
import type { Request, Response } from 'express'
import type { ResultSetHeader } from 'mysql2'
import pool from '../pool.js'
import type { IArticle, ILike, ILikes, IRequestWithUser } from '../types.js'

export async function Like(req: IRequestWithUser, res: Response) {
  try {
    const { user_id } = req.user!

    const [rows] = await pool.query<ILike[]>(
      'SELECT * FROM Likes WHERE ArticleId = ? AND UserId = ?;',
      [req.params.article_id, user_id]
    )

    if (rows.length) {
      res.status(400).json({
        message: 'You have already liked article',
        answer: null,
      })
      return
    }

    await pool.query('INSERT INTO Likes (ArticleId, UserId) VALUES (?, ?);', [
      req.params.article_id,
      user_id,
    ])

    res.status(200).json({
      message: 'You have successfully liked article',
      answer: true,
    })
  } catch (err) {
    console.log(err)

    res.status(500).json({
      message: 'Server is not responding',
      answer: err,
    })
  }
}

export async function Dislike(req: IRequestWithUser, res: Response) {
  try {
    const { user_id } = req.user!

    const [rows] = await pool.query<ResultSetHeader>(
      'DELETE FROM Likes WHERE ArticleId = ? AND UserId = ?;',
      [req.params.article_id, user_id]
    )

    if (!rows.affectedRows) {
      res.status(400).json({
        message: 'You have already disliked article',
        answer: null,
      })
      return
    }

    res.status(200).json({
      message: 'You have successfully disliked article',
      answer: true,
    })
  } catch (err) {
    console.log(err)

    res.status(500).json({
      message: 'Server is not responding',
      answer: err,
    })
  }
}

export async function CountLikes(req: Request, res: Response) {
  try {
    const [rows] = await pool.query<IArticle[]>(
      'SELECT * FROM Articles WHERE Id = ?;',
      req.params.article_id
    )

    if (!rows.length) {
      res.status(404).json({
        message: 'Article with such id can not be found',
        answer: null,
      })
      return
    }

    const [rows2] = await pool.query<ILikes[]>(
      'SELECT COUNT(*) as likes FROM Likes WHERE ArticleId = ?',
      req.params.article_id
    )

    res.status(200).json({
      message: 'You have successfully got likes of article',
      answer: (() => {
        return rows2[0]!.likes
      })(),
    })
  } catch (err) {
    console.log(err)

    res.status(500).json({
      message: 'Server is not responding',
      answer: err,
    })
  }
}

export async function GetState(req: IRequestWithUser, res: Response) {
  try {
    const [rows] = await pool.query<IArticle[]>(
      'SELECT * FROM Articles WHERE Id = ?',
      req.params.article_id
    )

    if (!rows.length) {
      res.status(404).json({
        message: 'The article with such id can not be found',
        answer: null,
      })
      return
    }

    const { user_id } = req.user!

    const [rows2] = await pool.query<ILikes[]>(
      'SELECT COUNT(*) as likes FROM Likes WHERE ArticleId = ? AND UserId = ?',
      [req.params.article_id, user_id]
    )

    res.status(200).json({
      message: 'You have successfully got likes-state of article',
      answer: (() => {
        return rows2[0]!.likes > 0 ? true : false
      })(),
    })
  } catch (err) {
    console.log(err)

    res.status(500).json({
      message: 'Server is not responding',
      answer: err,
    })
  }
}

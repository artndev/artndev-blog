import type { Response } from 'express'
import type { ResultSetHeader } from 'mysql2'
import pool from '../pool.js'

export async function Save(req: IRequestAccessToken, res: Response) {
  try {
    const { user_id } = req.user!

    const [rows] = await pool.query<IArticle[]>(
      'SELECT * FROM Saves WHERE ArticleId = ? AND UserId = ?;',
      [req.params.article_id, user_id]
    )

    if (rows.length) {
      res.status(400).json({
        message: 'You have already saved article',
        answer: null,
      })
      return
    }

    await pool.query<ResultSetHeader>(
      'INSERT INTO Saves (ArticleId, UserId) VALUES (?, ?);',
      [req.params.article_id, user_id]
    )

    res.status(200).json({
      message: 'You have successfully saved article',
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

export async function Unsave(req: IRequestAccessToken, res: Response) {
  try {
    const { user_id } = req.user!

    const [rows] = await pool.query<ResultSetHeader>(
      'DELETE FROM Saves WHERE ArticleId = ? AND UserId = ?;',
      [req.params.article_id, user_id]
    )

    if (!rows.affectedRows) {
      res.status(400).json({
        message: 'You have already unsaved article',
        answer: null,
      })
      return
    }

    res.status(200).json({
      message: 'You have successfully unsaved article',
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

export async function GetSaves(req: IRequestAccessToken, res: Response) {
  try {
    const { user_id } = req.user!

    const [rows] = await pool.query<IArticle[]>(
      `
        SELECT 
          Articles.Id,
          Articles.Title,
          Articles.Subtitle,
          Articles.Content,
          Articles.Updated 
        FROM Articles
        LEFT JOIN Saves ON Articles.Id = Saves.ArticleId
        WHERE Saves.UserId = ?;
      `,
      user_id
    )

    res.status(200).json({
      message: 'You have successfully got saves of user',
      answer: rows,
    })
  } catch (err) {
    console.log(err)

    res.status(500).json({
      message: 'Server is not responding',
      answer: err,
    })
  }
}

export async function GetState(req: IRequestAccessToken, res: Response) {
  try {
    const { user_id } = req.user!

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

    const [rows2] = await pool.query<ISave[]>(
      'SELECT * FROM Saves WHERE ArticleId = ? AND UserId = ?;',
      [req.params.article_id, user_id]
    )

    res.status(200).json({
      message: 'You have successfully got saves-state of article',
      answer: rows2.length > 0 ? 1 : 0,
    })
  } catch (err) {
    console.log(err)

    res.status(500).json({
      message: 'Server is not responding',
      answer: err,
    })
  }
}

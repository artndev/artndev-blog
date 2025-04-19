import type { Request, Response } from 'express'
import type { ResultSetHeader } from 'mysql2'
import pool from '../pool.js'

export async function Create(req: Request, res: Response) {
  try {
    await pool.query<ResultSetHeader>(
      'INSERT INTO Articles (Title, Subtitle, Content) VALUES (?, ?, ?);',
      [req.body.title, req.body.subtitle, req.body.content]
    )

    res.status(200).json({
      message: 'You have successfully created article',
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

export async function Update(req: Request, res: Response) {
  try {
    const [rows] = await pool.query<ResultSetHeader>(
      `
        UPDATE Articles SET 
          Title = ?, 
          Subtitle = ?,
          Content = ?, 
          Updated = CURRENT_TIMESTAMP() 
        WHERE Id = ?;
      `,
      [
        req.body.title,
        req.body.subtitle,
        req.body.content,
        req.params.article_id,
      ]
    )

    if (!rows.affectedRows) {
      res.status(404).json({
        message: 'Article with such id can not be found',
        answer: null,
      })
      return
    }

    res.status(200).json({
      message: 'You have successfully updated article',
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

export async function Delete(req: Request, res: Response) {
  try {
    await pool.query<ResultSetHeader>(
      `
        DELETE FROM Likes, Saves
        USING Likes, Saves
        WHERE 
          Likes.UserId = Likes.UserId AND 
          Likes.ArticleId = Saves.ArticleId AND
          Likes.ArticleId = ?;
      `,
      req.params.article_id
    )

    const [rows] = await pool.query<ResultSetHeader>(
      'DELETE FROM Articles WHERE Id = ?;',
      req.params.article_id
    )

    if (!rows.affectedRows) {
      res.status(404).json({
        message: 'Article with such id can not be found',
        answer: null,
      })
      return
    }

    res.status(200).json({
      message: 'You have successfully deleted article',
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

export async function GetAll(_: Request | undefined, res: Response) {
  try {
    const [rows] = await pool.query<IArticle[]>('SELECT * FROM Articles;')

    res.status(200).json({
      message: 'You have successfully got all articles',
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

export async function Get(req: Request, res: Response) {
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

    const [rows2] = await pool.query<ILike[]>(
      'SELECT * FROM Likes WHERE ArticleId = ?;',
      req.params.article_id
    )

    res.status(200).json({
      message: 'You have successfully got article',
      answer: { ...rows[0], Likes: rows2.length },
    })
  } catch (err) {
    console.log(err)

    res.status(500).json({
      message: 'Server is not responding',
      answer: err,
    })
  }
}

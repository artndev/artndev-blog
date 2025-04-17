import type { Request, Response } from 'express'
import type { ResultSetHeader } from 'mysql2'
import pool from '../pool.js'
import type { IArticle, ILike } from '../types.js'

// CREATE TABLE Articles (
//     Id INT AUTO_INCREMENT,
//     Title VARCHAR(100) NOT NULL,
//     Subtitle VARCHAR(100) NOT NULL,
//     Text VARCHAR(5000) NOT NULL,
//     Updated DATETIME DEFAULT CURRENT_TIMESTAMP(),
//     PRIMARY KEY(Id)
// );

// ====== SEND REQUESTS ======

export async function Create(req: Request, res: Response) {
  try {
    // run query
    await pool.query(
      'INSERT INTO Articles (Title, Subtitle, Text) VALUES (?, ?, ?);',
      [req.body.title, req.body.subtitle, req.body.text]
    )

    // send answer
    res.status(200).json({
      message: 'You have successfully created article',
      answer: true,
    })
  } catch (err) {
    console.log(err)

    // send answer
    res.status(500).json({
      message: 'Server is not responding',
      answer: err,
    })
  }
}

export async function Update(req: Request, res: Response) {
  try {
    // run query
    const [rows] = await pool.query<ResultSetHeader>(
      `
                UPDATE Articles SET 
                    Title = ?, 
                    Subtitle = ?,
                    Text = ?, 
                    Updated = CURRENT_TIMESTAMP() 
                WHERE Id = ?;
            `,
      [req.body.title, req.body.subtitle, req.body.text, req.params.article_id]
    )

    // check for condition
    if (!rows.affectedRows) {
      res.status(404).json({
        message: 'Article with such id can not be found',
        answer: null,
      })
      return
    }

    // send answer
    res.status(200).json({
      message: 'You have successfully updated article',
      answer: true,
    })
  } catch (err) {
    console.log(err)

    // send answer
    res.status(500).json({
      message: 'Server is not responding',
      answer: err,
    })
  }
}

export async function Delete(req: Request, res: Response) {
  try {
    // run query
    await pool.query(
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

    // run query
    const [rows] = await pool.query<ResultSetHeader>(
      'DELETE FROM Articles WHERE Id = ?;',
      req.params.article_id
    )

    // check for condition
    if (!rows.affectedRows) {
      res.status(404).json({
        message: 'Article with such id can not be found',
        answer: null,
      })
      return
    }

    // send answer
    res.status(200).json({
      message: 'You have successfully deleted article',
      answer: true,
    })
  } catch (err) {
    console.log(err)

    // send answer
    res.status(500).json({
      message: 'Server is not responding',
      answer: err,
    })
  }
}

export async function GetAll(_: Request | undefined, res: Response) {
  try {
    // run query
    const [rows] = await pool.query<IArticle[]>('SELECT * FROM Articles;')

    // send answer
    res.status(200).json({
      message: 'You have successfully got all articles',
      answer: rows,
    })
  } catch (err) {
    console.log(err)

    // send answer
    res.status(500).json({
      message: 'Server is not responding',
      answer: err,
    })
  }
}

export async function Get(req: Request, res: Response) {
  try {
    // run query
    const [rows] = await pool.query<IArticle[]>(
      'SELECT * FROM Articles WHERE Id = ?;',
      req.params.article_id
    )

    // check for condition
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

    // send answer
    res.status(200).json({
      message: 'You have successfully got the article',
      answer: { ...rows[0], Likes: rows2.length },
    })
  } catch (err) {
    console.log(err)

    // send answer
    res.status(500).json({
      message: 'Server is not responding',
      answer: err,
    })
  }
}

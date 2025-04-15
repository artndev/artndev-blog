import type { ResultSetHeader } from 'mysql2'
import pool from '../pool.js'
import type { IArticle, ILike, IRequestWithUser, ISave } from '../types.ts'
import type { Request, Response } from 'express'

// CREATE TABLE Saves (
//     ArticleId INT NOT NULL,
//     UserId INT NOT NULL,
//     PRIMARY KEY(ArticleId, UserId),
//     CONSTRAINT ArticleIdFK_2 FOREIGN KEY(ArticleId) REFERENCES Articles(Id),
// 	   CONSTRAINT UserIdFK_2 FOREIGN KEY(UserId) REFERENCES Users(Id)
// );

// ====== SEND REQUESTS ======

export async function Save(req: IRequestWithUser, res: Response) {
  try {
    // get id of current user from cookies
    const { user_id } = req.user!

    // run query
    const [rows] = await pool.query<IArticle[]>(
      'SELECT * FROM Saves WHERE ArticleId = ? AND UserId = ?;',
      [req.params.article_id, user_id]
    )

    // check for condition
    if (rows.length) {
      res.status(400).json({
        message: 'You have already saved article',
        answer: null,
      })
      return
    }

    // run query
    await pool.query<ResultSetHeader>(
      'INSERT INTO Saves (ArticleId, UserId) VALUES (?, ?);',
      [req.params.article_id, user_id]
    )

    // send answer
    res.status(200).json({
      message: 'You have successfully saved article',
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

export async function Unsave(req: IRequestWithUser, res: Response) {
  try {
    // get id of current user from cookies
    const { user_id } = req.user!

    // run query
    const [rows] = await pool.query<ResultSetHeader>(
      'DELETE FROM Saves WHERE ArticleId = ? AND UserId = ?;',
      [req.params.article_id, user_id]
    )

    // check for condition
    if (!rows.affectedRows) {
      res.status(400).json({
        message: 'You have already unsaved article',
        answer: null,
      })
      return
    }

    // send answer
    res.status(200).json({
      message: 'You have successfully unsaved article',
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

// ====== GET REQUESTS ======

export async function GetSaves(req: IRequestWithUser, res: Response) {
  try {
    // get id of current user from cookies
    const { user_id } = req.user!

    // run query
    const [rows] = await pool.query<IArticle[]>(
      `
                SELECT 
                    Articles.Id,
                    Articles.Title,
                    Articles.Subtitle,
                    Articles.Text,
                    Articles.Updated 
                FROM Articles
                LEFT JOIN Saves ON Articles.Id = Saves.ArticleId
                WHERE Saves.UserId = ?;
            `,
      user_id
    )

    // send answer
    res.status(200).json({
      message: 'You have successfully got saves of user',
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

// ====== STATE REQUEST ======

export async function GetState(req: IRequestWithUser, res: Response) {
  try {
    // run query
    const [rows] = await pool.query<IArticle[]>(
      'SELECT * FROM Articles WHERE Id = ?',
      req.params.article_id
    )

    // check for condition
    if (!rows.length) {
      res.status(404).json({
        message: 'The article with such id can not be found',
        answer: null,
      })
      return
    }

    // get id of current user from cookies
    const { user_id } = req.user!

    // run query
    const [rows2] = await pool.query<ISave[]>(
      'SELECT * FROM Saves WHERE ArticleId = ? AND UserId = ?;',
      [req.params.article_id, user_id]
    )

    // send answer
    res.status(200).json({
      message: 'You have successfully got saves-state of article',
      answer: rows2.length > 0 ? 1 : 0,
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

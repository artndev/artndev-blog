import type { ResultSetHeader, RowDataPacket } from 'mysql2'
import pool from '../pool.js'
import type { IArticle, ILike, ILikes, IRequestWithUser } from '../types.js'
import type { Request, Response } from 'express'

// CREATE TABLE Likes (
//     ArticleId INT NOT NULL,
//     UserId INT NOT NULL,
//     PRIMARY KEY(ArticleId, UserId),
//     CONSTRAINT ArticleIdFK FOREIGN KEY(ArticleId) REFERENCES Articles(Id),
// 	   CONSTRAINT UserIdFK FOREIGN KEY(UserId) REFERENCES Users(Id)
// );

// ====== SEND REQUESTS ======

export async function Like(req: IRequestWithUser, res: Response) {
  try {
    // get id of current user from cookies
    const { user_id } = req.user!

    // run query
    const [rows] = await pool.query<ILike[]>(
      'SELECT * FROM Likes WHERE ArticleId = ? AND UserId = ?;',
      [req.params.article_id, user_id]
    )

    // check for condition
    if (rows.length) {
      res.status(400).json({
        message: 'You have already liked article',
        answer: null,
      })
      return
    }

    // run query
    await pool.query('INSERT INTO Likes (ArticleId, UserId) VALUES (?, ?);', [
      req.params.article_id,
      user_id,
    ])

    // send answer
    res.status(200).json({
      message: 'You have successfully liked article',
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

export async function Dislike(req: IRequestWithUser, res: Response) {
  try {
    // get id of current user from cookies
    const { user_id } = req.user!

    // run query
    const [rows] = await pool.query<ResultSetHeader>(
      'DELETE FROM Likes WHERE ArticleId = ? AND UserId = ?;',
      [req.params.article_id, user_id]
    )

    // check for condition
    if (!rows.affectedRows) {
      res.status(400).json({
        message: 'You have already disliked article',
        answer: null,
      })
      return
    }

    // send answer
    res.status(200).json({
      message: 'You have successfully disliked article',
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

export async function CountLikes(req: Request, res: Response) {
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

    // run query
    const [rows2] = await pool.query<ILikes[]>(
      'SELECT COUNT(*) as likes FROM Likes WHERE ArticleId = ?',
      req.params.article_id
    )

    // send answer
    res.status(200).json({
      message: 'You have successfully got likes of article',
      answer: (() => {
        return rows2[0]!.likes
      })(),
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
    const [rows2] = await pool.query<ILikes[]>(
      'SELECT COUNT(*) as likes FROM Likes WHERE ArticleId = ? AND UserId = ?',
      [req.params.article_id, user_id]
    )

    // send answer
    res.status(200).json({
      message: 'You have successfully got likes-state of article',
      answer: (() => {
        return rows2[0]!.likes > 0 ? true : false
      })(),
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

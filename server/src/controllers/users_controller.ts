import type { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import type { ResultSetHeader } from 'mysql2'
import pool from '../pool.js'
import type { IJwtPayload, IUser } from '../types.ts'
import config from '../config.json' with { type: 'json' }
import { v4 as uuidv4 } from 'uuid'

// CREATE TABLE Users (
//     Id INT AUTO_INCREMENT,
//     Username VARCHAR(20) NOT NULL UNIQUE,
//      NULL is important
//      VARCHAR(255) bc there is hashed password
//     Password VARCHAR(255),
//     Updated DATETIME DEFAULT CURRENT_TIMESTAMP(),
//     PRIMARY KEY(Id)
// );

// ====== SEND REQUESTS ======

export async function Register(req: Request, res: Response) {
  try {
    // run db query
    await pool.query<ResultSetHeader>(
      'INSERT INTO Users (Username) VALUES (?);',
      req.body.username
    )

    // run db query
    const [rows] = await pool.query<IUser[]>(
      'SELECT * FROM Users WHERE Username = ?;',
      req.body.username
    )

    // generate jwt
    const data = {
      user_id: rows[0]!.Id,
      username: req.body.username,
    }
    const token = jwt.sign(
      {
        ...data,
        password: req.body.password,
      },
      process.env.SECRET_KEY!,
      {
        algorithm: 'HS256',
        expiresIn: config.ACCESS_TOKEN_OPTIONS.expiresIn,
      }
    )

    // insert jwt
    await pool.query('UPDATE Users SET Password = ? WHERE Id = ?;', [
      token,
      data.user_id,
    ])

    // send answer
    res.status(200).json({
      message: 'You have successfully registered',
      answer: {
        user: {
          ...data,
          is_admin: process.env.ADMIN_TOKEN === token,
        },
        refresh_token: {
          value: uuidv4(),
          options: config.REFRESH_TOKEN_OPTIONS,
        },
        access_token: {
          value: token,
        },
      },
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

export async function Login(req: Request, res: Response) {
  try {
    // run db query
    const [rows] = await pool.query<IUser[]>(
      'SELECT * FROM Users WHERE Username = ?;',
      [req.body.username]
    )

    // check for condition
    if (!rows.length) {
      res.status(404).json({
        message: 'Username is incorrect',
        answer: null,
      })
      return
    }

    // check for condition
    const token = rows[0]!.Password
    const { password } = jwt.decode(token) as IJwtPayload
    if (password !== req.body.password) {
      res.status(400).json({
        message: 'Password is incorrect',
        answer: null,
      })
      return
    }

    // send answer
    res.status(200).json({
      message: 'You have successfully logged in',
      answer: {
        user_id: rows[0]!.Id,
        username: req.body.username,
        token: token,
        is_admin: process.env.ADMIN_TOKEN === token,
      },
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

export function Logout(_: Request | undefined, res: Response) {
  try {
    // send answer
    res.clearCookie('user_data').clearCookie('token').status(200).json({
      message: 'You have successfully logged out',
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

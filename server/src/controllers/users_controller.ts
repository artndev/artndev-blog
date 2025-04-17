import type { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import type { ResultSetHeader } from 'mysql2'
import { v4 as uuidv4 } from 'uuid'
import config from '../config.json' with { type: 'json' }
import pool from '../pool.js'
import type { IPasswordTokenJwtPayload, IUser } from '../types.ts'

export async function Register(req: Request, res: Response) {
  try {
    const passwordToken = jwt.sign(
      {
        sub: req.body.username,
        jti: uuidv4(),
        password: req.body.password,
      },
      process.env.JWT_SECRET_KEY!,
      {
        algorithm: 'HS256',
      }
    )

    await pool.query<ResultSetHeader>(
      'INSERT INTO Users (Username, Password) VALUES (?, ?);',
      [req.body.username, passwordToken]
    )

    const [rows] = await pool.query<IUser[]>(
      'SELECT * FROM Users WHERE Username = ?;',
      req.body.username
    )

    const role = rows[0]!.Role
    const userData = {
      user_id: rows[0]!.Id,
      username: rows[0]!.Username,
      is_admin: role === 'Admin',
    }

    const accessToken = jwt.sign(
      {
        sub: userData.username,
        jti: uuidv4(),
        user: userData,
      },
      process.env.JWT_SECRET_KEY!,
      {
        algorithm: 'HS256',
        expiresIn: config.ACCESS_TOKEN_OPTIONS.expiresIn,
      }
    )

    const refreshToken = jwt.sign(
      {
        sub: userData.username,
        jti: uuidv4(),
      },
      process.env.JWT_SECRET_KEY!,
      {
        algorithm: 'HS256',
      }
    )

    res.status(200).json({
      message: 'You have successfully registered',
      answer: {
        user: userData,
        refresh_token: {
          value: refreshToken,
          cookie_options: config.REFRESH_TOKEN_COOKIE_OPTIONS,
        },
        access_token: {
          value: accessToken,
        },
      },
    })
  } catch (err) {
    console.log(err)

    res.status(500).json({
      message: 'Server is not responding',
      answer: err,
    })
  }
}

export async function Login(req: Request, res: Response) {
  try {
    const [rows] = await pool.query<IUser[]>(
      'SELECT * FROM Users WHERE Username = ?;',
      [req.body.username]
    )

    if (!rows.length) {
      res.status(404).json({
        message: 'Your authorization credentials are incorrect',
        answer: null,
      })
      return
    }

    const passwordToken = rows[0]!.Password
    const { password } = jwt.decode(passwordToken) as IPasswordTokenJwtPayload
    if (password !== req.body.password) {
      res.status(400).json({
        message: 'Your authorization credentials are incorrect',
        answer: null,
      })
      return
    }

    const role = rows[0]!.Role
    const userData = {
      user_id: rows[0]!.Id,
      username: rows[0]!.Username,
      is_admin: role === 'Admin',
    }

    const accessToken = jwt.sign(
      {
        sub: userData.username,
        jti: uuidv4(),
      },
      process.env.JWT_SECRET_KEY!,
      {
        algorithm: 'HS256',
        expiresIn: config.ACCESS_TOKEN_OPTIONS.expiresIn,
      }
    )

    const refreshToken = jwt.sign(
      {
        sub: userData.username,
        jti: uuidv4(),
      },
      process.env.JWT_SECRET_KEY!,
      {
        algorithm: 'HS256',
      }
    )

    res.status(200).json({
      message: 'You have successfully registered',
      answer: {
        user: userData,
        refresh_token: {
          value: refreshToken,
          cookie_options: config.REFRESH_TOKEN_COOKIE_OPTIONS,
        },
        access_token: {
          value: accessToken,
        },
      },
    })
  } catch (err) {
    console.log(err)

    res.status(500).json({
      message: 'Server is not responding',
      answer: err,
    })
  }
}

export function Logout(_: Request | undefined, res: Response) {
  try {
    res.clearCookie('user_data').clearCookie('token').status(200).json({
      message: 'You have successfully logged out',
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

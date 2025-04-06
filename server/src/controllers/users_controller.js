import jwt from 'jsonwebtoken'
import pool from '../pool.js'
import { v4 as uuidv4 } from 'uuid'
import * as utils from '../utils.js'
import config from '../config.json' with { type: 'json' }

// CREATE TABLE Users (
//     Id INT AUTO_INCREMENT,
//     Username VARCHAR(20) NOT NULL UNIQUE,
//     Password VARCHAR(255) NOT NULL, // VARCHAR(255) bc there is hashed password
//     Updated DATETIME DEFAULT CURRENT_TIMESTAMP(),
//     PRIMARY KEY(Id)
// );

// ====== SEND REQUESTS ======

export async function Register(req, res) {
  try {
    // generate jwt
    const token = jwt.sign(
      {
        api_key: uuidv4(), // for double security
        password: req.body.password,
      },
      process.env.SECRET_KEY,
      {
        algorithm: 'HS256',
      }
    )

    // run db query
    await pool.query('INSERT INTO Users (Username, Password) VALUES (?, ?);', [
      req.body.username,
      token,
    ])

    // run db query
    const [rows] = await pool.query(
      'SELECT * FROM Users WHERE Username = ?;',
      req.body.username
    )

    // send answer
    res.status(200).json({
      message: 'You have successfully registered',
      answer: {
        user_id: rows[0].Id,
        username: req.body.username,
        token: token,
        is_admin: process.env.ADMIN_TOKEN === token,
      },
    })
  } catch (err) {
    console.log(err)

    // send answer
    res.status(500).json(utils.errHandler(err))
  }
}

export async function Login(req, res) {
  try {
    // run db query
    const [rows] = await pool.query('SELECT * FROM Users WHERE Username = ?;', [
      req.body.username,
    ])
    console.log(rows)
    // check for condition
    if (!rows.length) {
      res.status(404).json({
        message: 'Username is incorrect',
        answer: null,
      })
      return
    }

    // check for condition
    const token = rows[0].Password
    const { password } = jwt.decode(token)
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
        user_id: rows[0].Id,
        username: req.body.username,
        token: token,
        is_admin: process.env.ADMIN_TOKEN === token,
      },
    })
  } catch (err) {
    console.log(err)

    // send answer
    res.status(500).json(utils.errHandler(err))
  }
}

export function Logout(_, res) {
  try {
    // send answer
    res.clearCookie('user_data').clearCookie('token').status(200).json({
      message: 'You have successfully logged out',
      answer: true,
    })
  } catch (err) {
    console.log(err)

    // send answer
    res.status(500).json(utils.errHandler(err))
  }
}

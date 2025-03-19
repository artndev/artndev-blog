import mysql from 'mysql2/promise';
import jwt from "jsonwebtoken";
import pool from './pool.js';


// CREATE TABLE Users (
//     Id INT AUTO_INCREMENT,
//     Username VARCHAR(255) NOT NULL UNIQUE,
//     Password VARCHAR(255) NOT NULL,
//     Date DATETIME DEFAULT CURRENT_TIMESTAMP(),
//     PRIMARY KEY(Id)
// );
// TODO: 
// 1. create middleware for checking if user logged in or not
// 2. refactor code in article.js due to turning connection into pool and else
// 3 integrate likes system

export async function Register(req, res) {
    // check if user logged in
    if (req.cookies.token)
    {
        res.status(500).json({
            message: "You have already logged in"
        })
        return
    }

    // generate token with password
    const token = jwt.sign(
        { 
            password: req.body.password 
        }, 
        process.env.SECRET_KEY, 
        { 
            algorithm: "HS256",
        }
    )

    try {
        // run db query
        await pool.query(
            'INSERT INTO `Users` (Username, Password) VALUES (?, ?);',
            [req.body.username, token]
        )

        // get created user 
        const [rows] = await pool.query(
            'SELECT * FROM `Users` WHERE Username = ?',
            req.body.username
        )

        // set cookies with user_data and token
        res
            .cookie(
                "user_data",
                JSON.stringify({
                    id: rows[0].Id,
                    username: req.body.username,
                }),
                {
                    maxAge: process.env.AUTH_COOKIES_MAXAGE
                }
            )
            .cookie(
                "token", 
                token, 
                { 
                    httpOnly: true,
                    maxAge: process.env.AUTH_COOKIES_MAXAGE
                }
            )
            .status(200)
            .json({
                message: "You have successfully registered"
            })
    } catch(err) {
        console.log(err)

        res.status(500).json({ ...err })
    }
}

export async function Login(req, res) {
    // check if user logged in
    if (req.cookies.token)
    {
        res.status(500).json({
            message: "You have already logged in"
        })
        return
    }

    try {
        // run db query 
        const [rows] = await pool.query(
            'SELECT * FROM `Users` WHERE Username = ?',
            req.body.username
        )

        if (!rows.length)
        {
            res.status(404).json({
                message: "There is no user with such username"
            })
            return
        }

        const dbPassword = rows[0].Password
        const { password } = jwt.decode(dbPassword)
        if (password !== req.body.password)
        {
            res.status(400).json({
                message: "The password is incorrect"
            })
            return
        }

        // set cookies with user_data and token
        res
            .cookie(
                "user_data",
                JSON.stringify({
                    id: rows[0].Id,
                    username: req.body.username,
                }),
                {
                    maxAge: process.env.AUTH_COOKIES_MAXAGE
                }
            )
            .cookie(
                "token", 
                dbPassword, 
                { 
                    httpOnly: true,
                    maxAge: process.env.AUTH_COOKIES_MAXAGE
                }
            )
            .status(200)
            .json({
                message: "You have successfully logged in"
            })
    } catch(err) {
        console.log(err)

        res.status(500).json({ ...err })
    }
}

export function Logout(req, res) {
    // check if user logged in
    if (!req.cookies.token)
    {
        res.status(500).json({
            message: "You have not logged in yet"
        })
        return
    }

    // clear cookies
    res
        .clearCookie("user_data")
        .clearCookie("token")
        .status(200)
        .json({
            message: "You have successfully logged out"
        })
}
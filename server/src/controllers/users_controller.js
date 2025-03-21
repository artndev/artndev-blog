import jwt from "jsonwebtoken";
import pool from './pool.js';
import { v4 as uuidv4 } from "uuid";

// CREATE TABLE Users (
//     Id INT AUTO_INCREMENT,
//     Username VARCHAR(255) NOT NULL UNIQUE,
//     Password VARCHAR(255) NOT NULL,
//     Date DATETIME DEFAULT CURRENT_TIMESTAMP(),
//     PRIMARY KEY(Id)
// );


// ====== SEND REQUESTS ======

export async function Register(req, res) {
    // generate jwt
    const token = jwt.sign(
        { 
            api_key: uuidv4(), // for double security
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
            "INSERT INTO`Users (Username, Password) VALUES (?, ?);",
            [req.body.username, token]
        )

        // run db query
        const [rows] = await pool.query(
            "SELECT * FROM Users WHERE Username = ?;",
            req.body.username
        )

        // send answer
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
                message: "You have successfully registered",
                answer: true
            })
    } catch(err) {
        console.log(err)

        // send answer
        const { message, ...answer } = err
        res.status(500).json({
            message: (message || err),
            answer: (!(typeof err === "object" && !Array.isArray(err)) ? null : answer)
        })
    }
}

export async function Login(req, res) {
    try {
        // run db query 
        const [rows] = await pool.query(
            "SELECT * FROM Users WHERE Username = ?;",
            req.body.username
        )

        console.log(rows)

        // check for condition
        if (!rows.length)
        {
            res.status(404).json({
                message: "Username is incorrect",
                answer: null
            })
            return
        }

        // check for condition
        const [row] = [...rows]
        const token = row.Password
        const { password } = jwt.decode(token)
        if (password !== req.body.password)
        {
            res.status(400).json({
                message: "Password is incorrect",
                answer: null
            })
            return
        }

        // send answer
        res
            .cookie(
                "user_data",
                JSON.stringify({
                    id: row.Id,
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
                message: "You have successfully logged in",
                answer: true
            })
    } catch(err) {
        console.log(err)

        // send answer
        const { message, ...answer } = err
        res.status(500).json({
            message: (message || err),
            answer: (!(typeof err === "object" && !Array.isArray(err)) ? null : answer)
        })
    }
}

export function Logout(_, res) {
    // send answer
    res
        .clearCookie("user_data")
        .clearCookie("token")
        .status(200)
        .json({
            message: "You have successfully logged out",
            answer: true
        })
}
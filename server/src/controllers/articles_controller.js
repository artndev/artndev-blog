import pool from '../pool.js';
import * as utils from "../utils.js"

// CREATE TABLE Articles (
//     Id INT AUTO_INCREMENT,
//     Title VARCHAR(255) NOT NULL,
//     Text TEXT NOT NULL,
//     Updated DATETIME DEFAULT CURRENT_TIMESTAMP(),
//     PRIMARY KEY(Id)
// );


// ====== SEND REQUESTS ======

export async function Create(req, res) {
    try {
        // run query
        await pool.query(
            "INSERT INTO Articles (Title, Text) VALUES (?, ?);",
            [req.body.title, req.body.text]
        )

        // send answer
        res.status(200).json({
            message: "You have successfully created article",
            answer: true
        })
    } catch (err) {
        console.log(err)

        // send answer
        res.status(500).json(utils.errHandler(err))
    }
}

export async function Update(req, res) {
    try {
        // run query
        const [rows] = await pool.query(
            `
                UPDATE Articles SET 
                    Title = ?, 
                    Text = ?, 
                    Updated = CURRENT_TIMESTAMP() 
                WHERE Id = ?;
            `,
            [req.body.title, req.body.text, req.params.article_id]
        )

        // check for condition
        if (!rows.affectedRows)
        {
            res.status(404).json({
                message: "Article with such id can not be found",
                answer: null
            })
            return
        }

        // send answer
        res.status(200).json({
            message: "You have successfully updated article",
            answer: true
        })
    } catch (err) {
        console.log(err)

        // send answer
        res.status(500).json(utils.errHandler(err))
    }
}

// export async function DeleteAll(_, res) {
//     try {
//         // run query
//         const [rows] = await pool.query(
//             `
//                 DELETE FROM Likes; 
//                 DELETE FROM Saves;
//                 DELETE FROM Articles; 
//                 ALTER TABLE Articles AUTO_INCREMENT = 1;          
//             `
//         )

//         // check for condition
//         if (!rows.affectedRows)
//         {
//             res.status(400).json({
//                 message: "There are no articles to delete",
//                 answer: null
//             })
//             return
//         }

//         // send answer
//         res.status(200).json({
//             message: "You have successfully deleted all articles",
//             answer: true
//         })
//     } catch (err) {
//         console.log(err)

//         // send answer
//         res.status(500).json(utils.errHandler(err))
//     }
// }

export async function Delete(req, res) {
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
        const [rows] = await pool.query(
            "DELETE FROM Articles WHERE Id = ?;",
            req.params.article_id
        )

        // check for condition
        if (!rows.affectedRows)
        {
            res.status(404).json({
                message: "Article with such id can not be found",
                answer: null
            })
            return
        }

        // send answer
        res.status(200).json({
            message: "You have successfully deleted article",
            answer: true
        })
    } catch (err) {
        console.log(err)

        // send answer
        res.status(500).json(utils.errHandler(err))
    }
}

export async function GetAll(_, res) {
    try {
        // run query
        const [rows] = await pool.query("SELECT * FROM Articles;")

        // send answer
        res.status(200).json({
            message: "You have successfully got all articles",
            answer: rows
        })
    } catch (err) {
        console.log(err)

        // send answer
        res.status(500).json(utils.errHandler(err))
    }
}

export async function Get(req, res) {
    try {
        // run query
        const [rows] = await pool.query(
            "SELECT * FROM Articles WHERE Id = ?;",
            req.params.article_id
        )

        // check for condition
        if (!rows.length)
        {
            res.status(404).json({
                message: "Article with such id can not be found",
                answer: null
            })
            return
        }

        // send answer
        res.status(200).json({
            message: "You have successfully got the article",
            answer: rows[0]
        })
    } catch (err) {
        console.log(err)

        // send answer
        res.status(500).json(utils.errHandler(err))
    }
}
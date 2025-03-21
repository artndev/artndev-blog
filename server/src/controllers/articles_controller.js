import pool from './pool.js';

// CREATE TABLE Articles (
//     Id INT AUTO_INCREMENT,
//     Title VARCHAR(255) NOT NULL,
//     Text TEXT NOT NULL,
//     Date DATETIME DEFAULT CURRENT_TIMESTAMP(),
//     PRIMARY KEY(Id)
// );


// ====== SEND REQUESTS ======

export async function Create(req, res) {
    try {
        // run query
        await pool.query(
            "INSERT INTO Articles (Title, Text) VALUES (?, ?);",
            [req.body.Title, req.body.Text]
        )

        // send answer
        res.status(200).json({
            message: "You have successfully created article",
            answer: true
        })
    } catch (err) {
        console.log(err)

        // send answer
        const { message, ...answer } = err
        res.status(500).json({
            message: (message || err),
            answer: (!(typeof err === "object" && !Array.isArray(err)) ? null : answer)
        })
    }
}

export async function Update(req, res) {
    try {
        // run query
        const [rows] = await pool.query(
            "UPDATE Articles (Title, Text) VALUES (?, ?) WHERE Id = ?;",
            [req.body.Title, req.body.Text, req.params.Id]
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
        const { message, ...answer } = err
        res.status(500).json({
            message: (message || err),
            answer: (!(typeof err === "object" && !Array.isArray(err)) ? null : answer)
        })
    }
}

export async function DeleteAll(_, res) {
    try {
        // run query
        const [rows] = await pool.query(
            `
                DELETE FROM Likes; 
                DELETE FROM Saves;
                DELETE FROM Articles; 
                ALTER TABLE Articles AUTO_INCREMENT = 1;          
            `
        )

        // check for condition
        if (!rows.affectedRows)
        {
            res.status(400).json({
                message: "There are no articles to delete",
                answer: null
            })
            return
        }

        // send answer
        res.status(200).json({
            message: "You have successfully deleted all articles",
            answer: true
        })
    } catch (err) {
        console.log(err)

        // send answer
        const { message, ...answer } = err
        res.status(500).json({
            message: (message || err),
            answer: (!(typeof err === "object" && !Array.isArray(err)) ? null : answer)
        })
    }
}

export async function Delete(req, res) {
    try {
        // run query
        await pool.query(
            `
                DELETE FROM Likes WHERE ArticleId = ?;
                DELETE FROM Saves WHERE ArticleId = ?;
            `,
            [req.params.id, req.params.id]
        )

        // run query
        const [rows] = await pool.query(
            "DELETE FROM Articles WHERE Id = ?;",
            req.params.id
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
        const { message, ...answer } = err
        res.status(500).json({
            message: (message || err),
            answer: (!(typeof err === "object" && !Array.isArray(err)) ? null : answer)
        }) 
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
        const { message, ...answer } = err
        res.status(500).json({
            message: (message || err),
            answer: (!(typeof err === "object" && !Array.isArray(err)) ? null : answer)
        })  
    }
}

export async function Get(req, res) {
    try {
        // run query
        const [rows] = await pool.query(
            "SELECT * FROM Articles WHERE Id = ?;",
            req.params.id
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
        const { message, ...answer } = err
        res.status(500).json({
            message: (message || err),
            answer: (!(typeof err === "object" && !Array.isArray(err)) ? null : answer)
        })
    }
}
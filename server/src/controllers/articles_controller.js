import pool from './pool.js';


// CREATE TABLE Articles (
//     Id INT AUTO_INCREMENT,
//     Title VARCHAR(255) NOT NULL,
//     Text TEXT NOT NULL,
//     Date DATETIME DEFAULT CURRENT_TIMESTAMP(),
//     PRIMARY KEY(Id)
// );

export async function GetAll(_, res) {
    try {
        const [rows] = await pool.query("SELECT * FROM Articles;")

        res.status(200).json({
            message: "You have successfully got all articles",
            answer: rows,
        })
    } catch (err) {
        console.log(err)

        res.status(500).json({ ...err })  
    }
}

export async function Get(req, res) {
    try {
        const [rows] = await pool.query(
            "SELECT * FROM Articles WHERE Id = ?;",
            req.params.id
        )

        if (!rows.length)
        {
            res.status(404).json({
                message: "The article with such id can not be found",
            })
            return
        }

        res.status(200).json({
            message: "You have successfully got the article",
            answer: rows[0],
        })
    } catch (err) {
        console.log(err)

        res.status(500).json({ ...err })  
    }
}

export async function Create(req, res) {
    try {
        await pool.query(
            "INSERT INTO Articles (Title, Text) VALUES (?, ?);",
            [req.body.Title, req.body.Text]
        )

        res.status(200).json({
            message: "You have successfully created an article"
        })
    } catch (err) {
        console.log(err)

        res.status(500).json({ ...err })  
    }
}

export async function Update(req, res) {
    try {
        const [rows] = await pool.query(
            "UPDATE Articles (Title, Text) VALUES (?, ?) WHERE Id = ?;",
            [req.body.Title, req.body.Text, req.params.Id]
        )

        if (!rows.affectedRows)
        {
            res.status(404).json({
                message: "The article with such id can not be found",
            })
            return
        }

        res.status(200).json({
            message: "You have successfully updated the article"
        })
    } catch (err) {
        console.log(err)

        res.status(500).json({ ...err })  
    }
}

export async function DeleteAll(_, res) {
    try {
        const [rows] = await pool.query(`
            DELETE FROM Likes; 
            DELETE FROM Saves;
            DELETE FROM Articles; 
            ALTER TABLE Articles AUTO_INCREMENT = 1;          
        `)

        if (!rows.affectedRows)
        {
            res.status(400).json({
                message: "There are no articles to delete",
            })
            return
        }

        res.status(200).json({
            message: "You have successfully deleted all articles"
        })
    } catch (err) {
        console.log(err)

        res.status(500).json({ ...err })  
    }
}

export async function Delete(req, res) {
    try {
        await pool.query(
            `
                DELETE FROM Likes WHERE ArticleId = ?;
                DELETE FROM Saves WHERE ArticleId = ?;
            `,
            [req.params.id, req.params.id]
        )

        const [rows] = await pool.query(
            "DELETE FROM Articles WHERE Id = ?;",
            req.params.id
        )

        if (!rows.affectedRows)
        {
            res.status(404).json({
                message: "The article with such id can not be found",
            })
            return
        }

        res.status(200).json({
            message: "You have successfully deleted the article"
        })
    } catch (err) {
        console.log(err)

        res.status(500).json({ ...err })  
    }
}
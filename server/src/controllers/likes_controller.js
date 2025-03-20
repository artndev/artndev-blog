import pool from './pool.js';


// CREATE TABLE Likes (
//     ArticleId INT NOT NULL,
//     UserId INT NOT NULL,
//     PRIMARY KEY(ArticleId, UserId),
//     CONSTRAINT ArticleIdFK FOREIGN KEY(ArticleId) REFERENCES Articles(Id),
// 	   CONSTRAINT UserIdFK FOREIGN KEY(UserId) REFERENCES Users(Id)
// );

export async function Like(req, res) {
    try {
        const { id } = JSON.parse(req.cookies.user_data)

        await pool.query(
            "INSERT INTO Likes (ArticleId, UserId) VALUES (?, ?);",
            [req.params.id, id]
        )

        res.status(200).json({
            message: "You have successfully liked the article"
        })
    } catch(err) {
        console.log(err)

        res.status(500).json({ ...err })
    }
}

export async function Dislike(req, res) {
    try {
        const { id } = JSON.parse(req.cookies.user_data)

        const [rows] = await pool.query(
            "DELETE FROM Likes WHERE ArticleId = ? AND UserId = ?;",
            [req.params.id, id]
        )
        
        if (!rows.affectedRows)
        {
            res.status(400).json({
                message: "You have already disliked the article"
            })
        }

        res.status(200).json({
            message: "You have successfully disliked the article"
        })
    } catch(err) {
        console.log(err)

        res.status(500).json({ ...err })
    }
}

export async function GetLikes(req, res) {
    try {
        const [rows] = await pool.query(
            "SELECT * FROM Articles WHERE Id = ?",
            req.params.id
        )

        if (!rows.length)
        {
            res.status(404).json({
                message: "The article with such id can not be found"
            })
            return
        }

        const [rows2] = await pool.query(
            "SELECT * FROM Likes WHERE ArticleId = ?",
            req.params.id
        )

        res.status(200).json({
            message: "You have successfully got likes of this article",
            answer: rows2.length
        })
    } catch(err) {
        console.log(err)

        res.status(500).json({ ...err })
    }
}
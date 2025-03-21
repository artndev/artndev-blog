import pool from './pool.js';

// CREATE TABLE Likes (
//     ArticleId INT NOT NULL,
//     UserId INT NOT NULL,
//     PRIMARY KEY(ArticleId, UserId),
//     CONSTRAINT ArticleIdFK FOREIGN KEY(ArticleId) REFERENCES Articles(Id),
// 	   CONSTRAINT UserIdFK FOREIGN KEY(UserId) REFERENCES Users(Id)
// );


// ====== SEND REQUESTS ======

export async function Like(req, res) {
    try {
        // get id of current user from cookies
        const { id } = JSON.parse(req.cookies.user_data)

        // run query
        const [rows] = await pool.query(
            "SELECT * FROM Likes WHERE ArticleId = ? AND UserId = ?;",
            [req.params.article_id, id]
        )

        // check for condition
        if (rows.length) {
            res.status(400).json({
                message: "You have already liked article",
                answer: null
            })
            return
        }

        // run query
        await pool.query(
            "INSERT INTO Likes (ArticleId, UserId) VALUES (?, ?);",
            [req.params.article_id, id]
        )

        // send answer
        res.status(200).json({
            message: "You have successfully liked article",
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

export async function Dislike(req, res) {
    try {
        // get id of current user from cookies
        const { id } = JSON.parse(req.cookies.user_data)

        // run query
        const [rows] = await pool.query(
            "DELETE FROM Likes WHERE ArticleId = ? AND UserId = ?;",
            [req.params.article_id, id]
        )
        
        // check for condition
        if (!rows.affectedRows)
        {
            res.status(400).json({
                message: "You have already disliked article",
                answer: null
            })
            return
        }

        // send answer
        res.status(200).json({
            message: "You have successfully disliked article",
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


// ====== GET REQUESTS ======

export async function CountLikes(req, res) {
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

        // run query
        const [rows2] = await pool.query(
            "SELECT COUNT(*) as likes FROM Likes WHERE ArticleId = ?",
            req.params.article_id
        )

        // send answer
        res.status(200).json({
            message: "You have successfully got likes of article",
            answer: (() => {
                const [{ likes }] = rows2

                return likes
            })()
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


// ====== STATE REQUEST ======

export async function GetState(req, res) {
    try {
        // run query
        const [rows] = await pool.query(
            "SELECT * FROM Articles WHERE Id = ?",
            req.query.article_id
        )

        // check for condition
        if (!rows.length)
        {
            res.status(404).json({
                message: "The article with such id can not be found"
            })
            return
        }

        // get id of current user from cookies
        const { id } = JSON.parse(req.cookies.user_data)

        // run query
        const [rows2] = await pool.query(
            "SELECT COUNT(*) as likes FROM Likes WHERE ArticleId = ? AND UserId = ?",
            [req.query.article_id, id]
        )

        // send answer
        res.status(200).json({
            message: "You have successfully got likes-state of article",
            answer: (() => {
                const [{ likes }] = rows2

                return likes > 0 ? 1 : 0
            })()
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